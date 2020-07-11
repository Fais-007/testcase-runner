import * as vscode from "vscode";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("terminalTest.sendText", () => {
            if (ensureTerminalExists()) {
                var currentlyOpenTabfilePath =
                    vscode.window.activeTextEditor?.document.uri.fsPath;
                if (currentlyOpenTabfilePath) {
                    var path = currentlyOpenTabfilePath.substring(
                        0,
                        currentlyOpenTabfilePath.lastIndexOf("\\") + 1
                    );
                    if (fs.existsSync(path + "test.txt")) {
                        vscode.workspace
                            .openTextDocument(path + "test.txt")
                            .then((document) => {
                                let text = document.getText();
                                let terminal = vscode.window.activeTerminal;
                                if (terminal) {
                                    terminal.sendText(text);
                                }
                            });
                    } else {
                        vscode.window.showWarningMessage(
                            "Test case file does not exists"
                        );
                    }
                }
            }
        })
    );

    vscode.window.onDidCloseTerminal((terminal) => {
        vscode.window.showInformationMessage(
            `onDidCloseTerminal, name: ${terminal.name}`
        );
    });
}

function ensureTerminalExists(): boolean {
    if ((<any>vscode.window).terminals.length === 0) {
        vscode.window.showErrorMessage("No active terminals");
        return false;
    }
    return true;
}

export function deactivate() {}
