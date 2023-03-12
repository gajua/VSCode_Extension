// chat gpt가 알려준 OpenAI API 호출하는 코드 예시
import axios from 'axios';
const apiKey = process.env.OPENAI_API_KEY;

async function callOpenAI(endpoint: string, data: any) {
  const response = await axios.post(
    `https://api.openai.com/v1/${endpoint}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data;
}

async function exampleUsage() {
  const prompt = 'The meaning of life is';
  const model = 'text-davinci-002';
  const maxTokens = 5;

  const response = await callOpenAI('completions', {
    prompt,
    model,
    max_tokens: maxTokens,
  });

  console.log(response.choices[0].text);
}

exampleUsage();
