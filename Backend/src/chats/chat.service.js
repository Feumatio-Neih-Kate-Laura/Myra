import OpenAI from 'openai';
import { MYRA_SYSTEM_PROMPT } from '../personality/myra.prompt.js';
import { saveMessage, getRecentMessages } from '../models/message.js';

export const getMyraReply = async (userMessage) => {
  const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: 'https://openrouter.ai/api/v1',
  });

  saveMessage('user', userMessage);

  const history = getRecentMessages(20);
  const chatHistory = history.map((m) => ({
    role: m.sender === 'user' ? 'user' : 'assistant',
    content: m.text,
  }));

  const completion = await client.chat.completions.create({
    model: 'nvidia/nemotron-3-ultra-550b-a55b:free',
    messages: [
      { role: 'system', content: MYRA_SYSTEM_PROMPT },
      ...chatHistory,
    ],
  });

  const replyText = completion.choices[0].message.content;

  saveMessage('myra', replyText);

  return replyText;
};