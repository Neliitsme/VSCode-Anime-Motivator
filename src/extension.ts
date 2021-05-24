import * as vscode from 'vscode';
import { SidebarProvider } from './sidebarProvider';


export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-anime-motivator" is now active!');

	const sidebarProvider = new SidebarProvider(context.extensionUri);
  	context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("amotivator-sidebar", sidebarProvider)
  	);

	let disposable = vscode.commands.registerCommand('vscode-anime-motivator.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from VSCode-Anime-Motivator!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
