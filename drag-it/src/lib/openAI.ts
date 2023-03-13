import axios from 'axios';
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface CompletionParams {
  model: string;
  prompt: string;
  temperature?: number;
  max_tokens?: number;
  n?: number;
  stop?: string | string[];
}

export const generateCode = async (
  prompt: string,
  language: string
): Promise<string> => {
  const model = `davinci-${language}`;
  const params: CompletionParams = {
    model,
    prompt,
    max_tokens: 1024,
    n: 1,
    stop: '\n',
  };

  const response = await axios.post(
    'https://api.openai.com/v1/engines/davinci-codex/completions',
    params,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const { choices } = response.data?.choices?.[0];
  if (!choices || choices.length === 0) {
    throw new Error('Failed to generate code.');
  }

  return choices[0].text.trim();
};

// Example usage
// generateCode('Create a function that doubles a given number', 'python')
//   .then((code) => {
//     console.log(code);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
