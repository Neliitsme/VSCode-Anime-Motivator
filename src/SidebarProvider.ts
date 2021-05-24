import * as vscode from "vscode";
import { getNonce } from "./getNonce";
import { Motivator } from "./motivator";

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this.getEmptyHtml(webviewView.webview);
    new Motivator(this, webviewView);
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  public getGifHtml(webview: vscode.Webview){
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/afk.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/afk.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content=" img-src https: data:; style-src 'unsafe-inline' ${
      webview.cspSource
    }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
			</head>
      <body>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }

  public getEmptyHtml(webview: vscode.Webview) {
    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    );
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/working.js")
    );
    const styleMainUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/working.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content=" img-src https: data:; style-src 'unsafe-inline' ${
      webview.cspSource
    }; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
			</head>
      <body>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}