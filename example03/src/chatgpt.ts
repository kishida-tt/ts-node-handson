import { Configuration, OpenAIApi } from 'openai';
import config from './config';

const openaiConfig = new Configuration({
  apiKey: config.openaiKey,
});
const openai = new OpenAIApi(openaiConfig);

async function chatGen(message: string): Promise<string> {
  const messages: any = [];
  messages.push({
    role: 'system',
    content: 'あなたは質問者の家族です。優しい口調で返答してください',
  });
  messages.push({
    role: 'user',
    content: message,
  });
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    top_p: 0.5,
    frequency_penalty: 0.5,
  });
  const retMessage = completion.data.choices[0]?.message
    ? completion.data.choices[0].message.content.toString()
    : '取得できませんでした.';
  return retMessage;
}

export default chatGen;
