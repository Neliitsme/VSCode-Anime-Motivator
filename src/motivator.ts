import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export class Motivator{
    private lastHeartbeat: number = 0;
    private gifShown = false;
    private sidebar: SidebarProvider;
    private gifTimeout = setTimeout(function(){}, 0);

    constructor(sidebarProvider: SidebarProvider){
        this.lastHeartbeat = Date.now();
        this.setupEventListeners();
        this.sidebar = sidebarProvider;
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
        //TODO: there will be logic of gif close
        this.gifShown = false;
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
        //TODO: there will be logic of gif display
        vscode.window.showInformationMessage("There will be some cute gif.");
        
    }
    
    private delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms));
    }

}