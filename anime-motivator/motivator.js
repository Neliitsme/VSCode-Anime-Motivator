const vscode = require('vscode');

class Motivator {

    initialize() {
        this.lastHeartbit = Date.now();
        this.gifShown = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        //TODO: check if we have to use other events too
        vscode.window.onDidChangeTextEditorSelection(this.onEvent, this);
        vscode.window.onDidChangeActiveTextEditor(this.onEvent, this);
        vscode.workspace.onDidSaveTextDocument(this.onEvent, this);
        vscode.window.onDidChangeTextEditorVisibleRanges(this.onEvent, this);
    }

    onEvent() {
       let editor = vscode.window.activeTextEditor;
        if (editor) {
            let doc = editor.document;
            if (doc) {
                let file = doc.fileName;
                if (file) {
                    console.log("Heartbeat updated.")
                    this.lastHeartbeat = Date.now();

                    if (this.gifShown) {
                        this.closeGif();
                    }

                    console.log("Gif delayed.")
                    //Todo: invoke function after every event is bad for performance, we have to find some smart way to check if user if afk
                    setTimeout(()=>this.delayGif(),12500);

                }
            }
        }
    }

    enoughTimePassed(time) {
        return this.lastHeartbeat + 12000 < time;
    }

    closeGif() {
        //TODO: there will be logic of gif close
        this.gifShown = false;
    }

    delayGif() {
        console.log("Gif delay ended.")
        if (this.enoughTimePassed(Date.now()) && !this.gifShown) {
            this.showGif();
        }
    }

    showGif() {
        this.gifShown = true;
        console.log("Gif show.")
        //TODO: there will be logic of gif display
        vscode.window.showInformationMessage("There will be some cute gif.")
    }
}

module.exports = {Motivator}