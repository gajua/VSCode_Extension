import * as vscode from 'vscode';
import generateCode from './lib/openAI';
import { config } from 'dotenv';
config();

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'drag-it.generateCode',
    async () => {
      function getActiveEditorExtension(): string | undefined {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          return undefined;
        }

        return editor.document.languageId;
      }

      const extension = getActiveEditorExtension();
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage('No active text editor found.');
        return;
      }

      const { selection } = editor;
      if (selection.isEmpty) {
        vscode.window.showErrorMessage('No text selected.');
        return;
      }

      const prompt = editor.document.getText(selection);
      let generatedCode: any = null;

      try {
        generatedCode = await generateCode(
          `Get me command ${prompt} in ${extension} language`
        );
      } catch (error: any) {
        vscode.window.showErrorMessage(
          `Error generating code: ${error.message}`
        );
        return;
      }

      editor.edit((editBuilder) => {
        console.log(generatedCode);
        vscode.window.showErrorMessage(generatedCode);
        editBuilder.replace(selection, generatedCode);
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
