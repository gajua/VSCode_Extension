import * as vscode from 'vscode';
import axios from 'axios';
import { chatGPT } from './chatGPT';
require('dotenv').config(); // .env 파일 로드하기

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    'drag-it.generateCode',
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // ----------------------
      // const message: string = "제발 돼라";
      // vscode.window.showInformationMessage(message);
      // ----------------------
      //     const editor = vscode.window.activeTextEditor;
      //     if (!editor) {
      //       return; // no active editor
      //     }

      //     const selections = editor.selections;
      //     if (selections.length === 0) {
      //       return; // no selection
      //     }

      //     for (const selection of selections) {
      //       const selectedText = editor.document.getText(selection);
      //       vscode.window.showInformationMessage(selectedText);
      //     }
      //   }
      // );
      // ------------------------------------
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage(' no active editor');
        return; // no active editor
      }

      const selections = editor.selections;
      if (selections.length === 0) {
        vscode.window.showInformationMessage(' no selection');
        return; // no selection
      }

      for (const selection of selections) {
        const selectedText = editor.document.getText(selection);
        vscode.window.showInformationMessage(selectedText);
      }

      // Send selected text to OpenAI API
      const selectedTexts = editor.document.getText(editor.selection);
      const message = [['user', selectedTexts]];
      const parameters = { max_tokens: 1024, n: 1, stop: ['\n'] };
      const response = await chatGPT(message, parameters);
      editor.edit((editBuilder) => {
        editBuilder.insert(editor.selection.active, response);
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
