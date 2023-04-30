const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

export default async function generateCode(prompt: string) {
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
