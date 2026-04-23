const { OpenAI } = require('openai');
const dotenv = require('dotenv');

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET
});

/* 
  Context Array

  Yeh conversation history store karta hai — OpenAI ko poori history bhejna padta hai kyunki uski memory nahi hoti
  system role → AI ko batata hai ki uski personality kya h
  user role → pehla hardcoded message jo conversation start karta hai
*/

const context = [
  {
    role:'system',
    content:'You are a helpful assistant',
  },
  {
    role:"user",
    content:'Hello, how are you?'
  }
]


async function openAIRun(){

  // prompt-sync → terminal se synchronously user input leta hai (blocking call)
  // sigint:true → Ctrl+C press karne pe program gracefully exit hoga  
  const prompt = require('prompt-sync')({sigint:true})

  // Infinite loop — jab tak user manually exit na kare, conversation chalta rahega.
  // Other wise kuch bhi input krege or jse he response ayega openAi se 
  // terminal exit krjaega automatically.
  while(true){

    /* 
      Flow Summary

      User types → pushed to context → sent to OpenAI → 
      AI responds → response pushed to context → printed → repeat
    */
    const userInput = prompt("Enter something:")
    context.push({
      role:"user",
      content: userInput
    })


    const open_ai = await openai.chat.completions.create({
      model:"gpt-4",
      messages:context
    })

    const responseMessage = open_ai.choices[0].message
    context.push({
      role:"assistant",
      content: responseMessage.content
    })

    console.log(`${open_ai.choices[0].message.role}, ${ open_ai.choices[0].message.content}`)
  }
}

