import * as vscode from 'vscode';
import { generateCode } from './lib/openAI';
require('dotenv').config();



export function activate(context: vscode.ExtensionContext) {
   // 1. 규칙을 정의한 객체를 만들기
  // generateCode
  const ruleCompletion = {
    provideCompletionItems( //메서드
      document: vscode.TextDocument,
      position: vscode.Position
    ) {
      return [
        new vscode.CompletionItem('GridView', vscode.CompletionItemKind.Class),
        new vscode.CompletionItem('TreeView', vscode.CompletionItemKind.Class),
      ];
    },
  };

  // 2. 규칙을 프로바이더에 등록하기 (적용될 소스의 타입을 결정)
  const providerCompletion = vscode.languages.registerCompletionItemProvider(
    ['plaintext', 'html', 'javascript'],
    ruleCompletion,
    '.'
  );

  //3.  컨텍스트의 subscriptions 객체에 프로바이더를 push
  context.subscriptions.push(providerCompletion);
}

