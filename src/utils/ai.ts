import axios from 'axios';

const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

export const generateAIResponse = async (
  prompt: string,
  model: string = 'qwen/qwen2.5-vl-72b-instruct:free'
): Promise<string> => {
  try {
    const response = await axios.post(
      OPENROUTER_ENDPOINT,
      {
        model, // Specify the model you want to use
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200, // Adjust token limit as needed
        temperature: 0.7, // Controls randomness (0.0 = deterministic, 1.0 = creative)
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw new Error('Failed to get AI response.');
  }
};