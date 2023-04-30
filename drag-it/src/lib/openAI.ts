import axios from "axios";
require("dotenv").config();

interface CompletionParams {
  model: string;
  prompt: string;
  temperature?: number;
  max_tokens?: number;
  n?: number;
  stop?: string | string[];
}

export default async (prompt: string, languages: string): Promise<string> => {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // 수정된 부분
  const model = `davinci-${languages}`;
  const params: CompletionParams = {
    model,
    prompt,
    max_tokens: 1024,
    n: 0.9,
    stop: "\n",
  };

  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    params,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    }
  );

  const { choices } = response.data?.choices?.[0];
  if (!choices || choices.length === 0) {
    throw new Error("Failed to generate text.");
  }

  return choices[0].text.trim();
};
