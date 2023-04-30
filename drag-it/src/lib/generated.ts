import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const code = req.body.code || '';
  if (code.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter valid code',
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: generatePrompt(code),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}
function generatePrompt(propmt: string) {
  return `Given the following code, suggest three improvements:
  Improvements:
  promt: Use a nested loop to create a triangle shape instead of just printing one row of stars.
  code: function printStars(num) {
    for (let i = 0; i < num; i++) {
      let row = '';
      for (let j = 0; j <= i; j++) {
        row += '*';
      }
      console.log(row);
    }
  }
  propmt: 두 인수를 넣으면 더해주는 함수를 작성해줘
  code :function add(a, b) {
    return a + b;
  }
  propmt:  todoList를 만들기 위한 html코드를 보여줘
  code: <!DOCTYPE html>
  <html>
  <head>
      <title>Todo List</title>
  </head>
  <body>
      <h1>My Todo List</h1>
      <ul>
          <li><input type="checkbox">Task 1</li>
          <li><input type="checkbox">Task 2</li>
          <li><input type="checkbox">Task 3</li>
          <li><input type="checkbox">Task 4</li>
          <li><input type="checkbox">Task 5</li>
      </ul>
  </body>
  </html>
  propmt:  ${propmt}
  code:
  `;
}
