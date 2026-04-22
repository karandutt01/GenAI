import OpenAI from "openai";
import dotenv from 'dotenv'

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET
});


const ai_response = await openai.chat.completions.create({
  model: "gpt-5.4",
  messages:[
    {
      role:'user',
      content:"Hi Karan!!! Good Morning"
    }
  ]
})

console.log(ai_response)