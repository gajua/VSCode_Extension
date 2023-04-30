import { Configuration, OpenAIApi } from "openai";
const OpenAIApi.api_key = process.env.OPENAI_API_KEY;

async function generateCode(prompt: string) {
const completions = await openai.completions.create({
engine: 'davinci-codex',
prompt: prompt,
max_tokens: 1024,
n: 1,
stop: ['\n'],
temperature: 0.5,
});

const { choices } = completions.data;
const { text } = choices[0];
return text.trim();
}

async function example() {
const prompts = [
generatePrompt('cat'),
generatePrompt('dog'),
generatePrompt('tiger'),
];

for (const prompt of prompts) {
const code = await generateCode(prompt);
console.log(`Code generated:\n${code}`);
}
}

function generatePrompt(query: string) {
return `Given the query "${query}", generate a piece of code that solves the problem:

Code:
`;
}

export { example };





