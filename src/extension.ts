'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "YukioUsuzumi" is now active!');

    let yu = new YukioUsuzumi();

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    context.subscriptions.push(vscode.commands.registerCommand('extension.sayHello', () => {
        // The code you place here will be executed every time your command is executed

        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World!');
    }));

    // context.subscriptions.push(yu);
    context.subscriptions.push(vscode.commands.registerCommand('yu.emacs.centerToScreen', () => {
        yu.centerToScreen();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('yu.formatAndOrganizeImports', yu.formatAndOrganizeImports));
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider({language: "python"}, new YUCodeAction(), {
        providedCodeActionKinds: [vscode.CodeActionKind.Source.append("format")]
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {
}


class YukioUsuzumi {
    public centerToScreen() {
        const editor = vscode.window.activeTextEditor;
        if (editor !== undefined) {
            const selection = editor.selection;
		    const range = new vscode.Range(selection.start, selection.end);
		    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
        }
    }

    public formatAndOrganizeImports() {
        return vscode.commands.executeCommand("editor.action.formatDocument", () => {
            return vscode.commands.executeCommand("editor.action.organizeImports");
        });
    }

    dispose() {
    }
}

class YUCodeAction implements vscode.CodeActionProvider {
    provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.ProviderResult<(vscode.Command | vscode.CodeAction)[]> {
        console.log(document);
        let action = new vscode.CodeAction("Format and organize imports", vscode.CodeActionKind.Source.append("formatAndOrganizeImports"));
        action.command = {
            tooltip: "WTF?",
            title: "Format and organize imports",
            command: "yu.formatAndOrganizeImports"
        };
        return [action];
    }
}
