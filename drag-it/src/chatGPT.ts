require('dotenv').config();

const fetch = require('node-fetch');

export const chatGPT: (
  messages: any,
  parameters?: {}
) => Promise<string> = async (messages, parameters = {}) => {
  const apikey = process.env.OPENAI_API_KEY;
  if (!apikey) {
    console.log('OPENAI_API_KEY is not set in the environment variables');
  }
  if (messages[0].constructor === String) {
    return await chatGPT([['user', messages[0]]]);
  }

  messages = messages.map((line: any) => ({
    role: line[0],
    content: line[1].trim(),
  }));

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apikey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      prompt: '',
      temperature: 0.8,
      max_tokens: 1024,
      ...parameters,
      messages,
    }),
  });

  const data = await response.json();

  if (data?.error?.message) {
    console.log(data.error.message);
  }

  return data.choices[0].text.trim();
};
