import * as vscode from "vscode";
import openAI from "./lib/openAI";
import { config } from "dotenv";
config();
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "drag-it.generateCode",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active text editor found.");
        return;
      }

      const { selection } = editor;
      if (selection.isEmpty) {
        vscode.window.showErrorMessage("No text selected.");
        return;
      }

      const prompt = editor.document.getText(selection);
      const languages = editor.document.languageId;
      const generatedCode = await openAI(prompt, languages);

      editor.edit((editBuilder) => {
        editBuilder.replace(selection, generatedCode);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
