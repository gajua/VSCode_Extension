import * as vscode from 'vscode';
import axios from 'axios';
require('dotenv').config(); // .env 파일 로드하기

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "sewon-test" is now active!');

  let disposable = vscode.commands.registerCommand(
    'drag-it.generateCode',
    () => {
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

      const selectedTexts = [];
      for (const selection of selections) {
        const selectedText = editor.document.getText(selection);
        vscode.window.showInformationMessage(selectedText);
        selectedTexts.push(selectedText);
      }

      // Send selected text to OpenAI API
      const openAIEndpoint = 'https://api.openai.com/v1/chat/completions';
      const openAIKey = process.env.OPENAI_API_KEY;
      const prompt = selectedTexts.join('\n');
      const data = {
        prompt,
        max_tokens: 1024,
        n: 1,
        stop: ['\n'],
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openAIKey}`,
      };
      axios
        .post(openAIEndpoint, data, { headers })
        .then((response) => {
          const resultText = response.data.choices[0].text;
          // 에디터에 결과 추가하기
          editor.edit((editBuilder) => {
            // 커서 위치 가져오기
            const position = editor.selection.active;
            // 커서 위치에 결과 추가하기
            editBuilder.insert(position, resultText);
          });
        })
        .catch((error) => {
          vscode.window.showInformationMessage(error);
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
