import { Configuration, OpenAIApi } from 'openai';
import * as vscode from 'vscode';
export default async function generateCode(prompt: string) {
  const apiKey = await getAPIKey();

  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0,
    max_tokens: 1027,
  });

  const { choices } = response.data;
  const { text } = choices[0];
  return text?.trim();
}

async function getAPIKey() {
  const config = vscode.workspace.getConfiguration('openai');
  const apiKey = config.get<string>('apiKey');

  if (apiKey) {
    return apiKey;
  }

  const input = await vscode.window.showInputBox({
    placeHolder: 'Enter OpenAI API key',
  });

  if (input) {
    await config.update('apiKey', input, vscode.ConfigurationTarget.Global);
    return input;
  }

  throw new Error('OpenAI API key is required.');
}
