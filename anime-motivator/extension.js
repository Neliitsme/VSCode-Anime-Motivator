
const vscode = require('vscode');

const {Motivator} = require('./motivator')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Anime motivator is now active.');
	
	var motivator = new Motivator();

	motivator.initialize();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
