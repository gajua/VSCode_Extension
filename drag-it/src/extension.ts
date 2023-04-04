// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import axios from "axios";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "sewon-test" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "drag-it.generateCode",
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
        vscode.window.showInformationMessage(" no active editor");
        return; // no active editor
      }

      const selections = editor.selections;
      if (selections.length === 0) {
        vscode.window.showInformationMessage(" no selection");
        return; // no selection
      }
      
      const selectedTexts = [];
      for (const selection of selections) {
        const selectedText = editor.document.getText(selection);
        vscode.window.showInformationMessage(selectedText);
        // selectedTexts.push(selectedText);
      }

      // Send selected text to OpenAI API
      // const openAIEndpoint =
      //   "https://api.openai.com/v1/engines/davinci-codex/completions";
      // const openAIKey = "/"; // replace with your own API key
      // const prompt = selectedTexts.join("\n");
      // const data = {
      //   prompt,
      //   max_tokens: 1024,
      //   n: 1,
      //   stop: ["\n"],
      // };
      // const headers = {
      //   "Content-Type": "application/json",
      //   Authorization: `Bearer ${openAIKey}`,
      // };
      // axios
      //   .post(openAIEndpoint, data, { headers })
      //   .then((response) => {
      //     vscode.window.showInformationMessage(response.data.choices[0].text);
      //     // console.log(response.data.choices[0].text);
      //   })
      //   .catch((error) => {
      //     // console.error(error);
      //     vscode.window.showInformationMessage(error);
      //   });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
