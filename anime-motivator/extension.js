
const vscode = require('vscode');

<<<<<<< HEAD
const {Motivator} = require('./motivator')
=======
>>>>>>> a1ce8a6... Chore: project init

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

<<<<<<< HEAD
	console.log('Anime motivator is now active.');
	
	var motivator = new Motivator();

	motivator.initialize();

=======
	console.log('Congratulations, your extension "anime-motivator" is now active!');

	vscode.window.showInformationMessage("Hello world!.")
>>>>>>> a1ce8a6... Chore: project init
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
