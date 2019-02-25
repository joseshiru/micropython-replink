// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var path = require("path");

async function sendIt() {
	await vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { 'text': '\u0005vscode_contents = r"""' });
	await vscode.commands.executeCommand('workbench.action.terminal.runSelectedText');
	return await vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { 'text': '"""\u0004' });
}
async function runIt() {
	return await vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { 'text': 'exec(vscode_contents)\n' });
}
async function saveIt() {
	var activeEditor = vscode.window.activeTextEditor;
	if(activeEditor){
		var fname = path.basename(activeEditor.document.fileName);
		return await vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { 'text': 'with open("'+fname+'", "w") as f: f.write(vscode_contents)\n\n' });
	}
}
async function selectAllAndSend() {
	await vscode.commands.executeCommand('editor.action.selectAll');
	await sendIt();
	return await vscode.commands.executeCommand('cursorLeft');
}
async function runWholeScript() {
	await selectAllAndSend();
	await runIt();
}
async function saveWholeScript() {
	await selectAllAndSend();
	await saveIt();
}
async function runSelectedText() {
	await sendIt();
	await runIt();
}


export function activate(context: vscode.ExtensionContext) {
	vscode.commands.registerCommand('extension.micropython-replink.runScript', async () => {
        try {
            await runWholeScript();
        }
        catch (e) {
            vscode.window.showErrorMessage(`${e.message}`);
        }
	});
	vscode.commands.registerCommand('extension.micropython-replink.runSelected', async () => {
        try {
            await runSelectedText();
        }
        catch (e) {
            vscode.window.showErrorMessage(`${e.message}`);
        }
	});
	vscode.commands.registerCommand('extension.micropython-replink.saveScript', async () => {
        try {
            await saveWholeScript();
        }
        catch (e) {
            vscode.window.showErrorMessage(`${e.message}`);
        }
	});

}

export function deactivate() {}
