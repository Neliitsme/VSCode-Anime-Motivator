import * as vscode from 'vscode';
import { SidebarProvider } from './sidebarProvider';

export class Motivator{
    private lastHeartbeat: number = 0;
    private gifShown = false;
    private sidebar: SidebarProvider;
    private gifTimeout = setTimeout(function(){}, 0);
    private webViewView: vscode.WebviewView;


    constructor(sidebarProvider: SidebarProvider, webViewView: vscode.WebviewView){
        this.lastHeartbeat = Date.now();
        this.setupEventListeners();
        this.sidebar = sidebarProvider;
        this.webViewView = webViewView;
    }
    
    private onEvent(){
        let editor = vscode.window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc) {
                let file: string = doc.fileName;
                if (file) {
                    console.log("Heartbeat updated.");
                    this.lastHeartbeat = Date.now();

                    if (this.gifShown) {
                        this.closeGif();
                    }

                    console.log("Gif delayed.");
                    clearTimeout(this.gifTimeout);
                    this.gifTimeout = setTimeout(()=>this.delayGif(), 12500);
                    
                }
            }
        }

    }

    private setupEventListeners(){
         //TODO: check if we have to use other events too
         vscode.window.onDidChangeTextEditorSelection(this.onEvent, this);
         vscode.window.onDidChangeActiveTextEditor(this.onEvent, this);
         vscode.workspace.onDidSaveTextDocument(this.onEvent, this);
         vscode.window.onDidChangeTextEditorVisibleRanges(this.onEvent, this);
    }

    private enoughTimePassed(time: number): boolean {
        return this.lastHeartbeat + 11000 < time;
    }

    private closeGif() {
        this.gifShown = false;
        this.webViewView.webview.html = this.sidebar.getEmptyHtml(this.webViewView.webview);

    }

    private delayGif() {
        console.log("Gif delay ended.");
        if (this.enoughTimePassed(Date.now()) && !this.gifShown) {
            this.showGif();
        }

    }

    private showGif() {
        this.gifShown = true;
        console.log("Gif show.");
        this.webViewView.webview.html = this.sidebar.getGifHtml(this.webViewView.webview);
        
    }
    
    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms));
    }

}