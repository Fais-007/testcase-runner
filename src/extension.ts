import * as vscode from "vscode";
import * as fs from "fs";
import { pathToFileURL } from "url";

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("terminalTest.sendText", () => {
      if (ensureTerminalExists()) {
        var ch = currentlyOpenTabfilePath?.split(".");
        var currentlyOpenTabfilePath =
          vscode.window.activeTextEditor?.document.uri.fsPath;
        if (currentlyOpenTabfilePath) {
          let ch = currentlyOpenTabfilePath.split(".");
          if (fs.existsSync(ch[0] + ".txt")) {
            vscode.workspace
              .openTextDocument(ch[0] + ".txt")
              .then((document) => {
                let text = document.getText();
                let terminal = vscode.window.activeTerminal;
                if (terminal) {
                  terminal.sendText(text);
                }
              });
          } else {
            vscode.window.showWarningMessage("Test case file does not exists");
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
