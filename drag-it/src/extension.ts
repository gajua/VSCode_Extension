import * as vscode from "vscode";
import axios from "axios";
import openAI from "./lib/openAI";
const dotenv = require("dotenv");
dotenv.config();

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// interface CompletionParams {
//   model: string;
//   prompt: string;
//   temperature?: number;
//   max_tokens?: number;
//   n?: number;
//   stop?: string | string[];
// }

// export const generateCode = async (
//   prompt: string,
//   language: string
// ): Promise<string> => {
//   const model = `davinci-${language}`;
//   const params: CompletionParams = {
//     model,
//     prompt,
//     max_tokens: 1024,
//     n: 1,
//     stop: '\n',
//   };

//   const response = await axios.post(
//     'https://api.openai.com/v1/engines/davinci-codex/completions',
//     params,
//     {
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${OPENAI_API_KEY}`,
//       },
//     }
//   );

//   const { choices } = response.data?.choices?.[0];
//   if (!choices || choices.length === 0) {
//     throw new Error('Failed to generate code.');
//   }

//   return choices[0].text.trim();
// };

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
