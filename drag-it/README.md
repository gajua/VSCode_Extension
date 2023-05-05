# Drag-It
This is a Visual Studio Code extension that helps you generate code using OpenAI's GPT-3 technology. It automatically generates code based on the file type you're currently editing, allowing you to quickly and easily generate code that fits your needs.
<img height="400px" src="https://user-images.githubusercontent.com/101968934/236407765-7e98e163-128e-4655-ae0e-6e48ec48ba6e.gif">

## Features
- Generates code based on the file type you're currently editing

- Allows you to quickly and easily generate code by selecting the text you want to use as the basis for the code and then executing the extension

- Automatically prompts you to enter your OpenAI API key if you haven't already done so

## Usage

### Get your API key

This will differ depending on the provider you choose:

> Go to the [API Keys page on OpenAI.](https://platform.openai.com/account/api-keys)

> Log in with your OpenAI account (or [create a new account](https://platform.openai.com/signup))

> Click the button labeled `Create a new secret key`

> A new dialog window will appear, containing a text box with your API key.

> Copy this API Key to your clipboard.

To use Drag-It, simply select the text you want to use as the basis for the code you want to generate, and then execute the extension. You can do this by typing the command `drag-it.generateCode` in the Command Palette, or by using the keybindings `ctrl+space ctrl+enter` (Windows/Linux) or `cmd+space cmd+enter` (Mac).

If you haven't already entered your OpenAI API key, the extension will prompt you to do so when you execute it for the first time. Simply enter your API key and the extension will start working immediately.

Happy coding!

