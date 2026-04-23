const { OpenAI } = require('openai')
const dotenv = require('dotenv');
const fs = require("fs");
const { playAudio } = require("openai/helpers/audio");



dotenv.config();

const open_ai = new OpenAI({
  apiKey: process.env.OPEN_AI_SECRET
})

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

/* 
  There are two ways to create images using
  1. Response API
  2. Image API

  Choosing the right API
  If you only need to generate or edit a single image from one prompt, the Image API is your best choice.
  If you want to build conversational, editable image experiences with GPT Image, go with the Responses API.

  Both APIs let you customize output by adjusting quality, size, format, and compression. Transparent backgrounds depend on model support.
*/


// Using Image API to geenrate Images

const prompt =
  "Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape";

async function generateImageFromTextUsingImageAPI(){
  const response = await open_ai.images.generate({
    model: "gpt-image-2",
    prompt, 
    n:1,
    quality:'standard'
  });

  const image_base64 = response.data[0].b64_json;
  const image_bytes = Buffer.from(image_base64, "base64");
  fs.writeFileSync("otter.png", image_bytes);
}

generateImageFromTextUsingImageAPI();



//  2, Response API
/* 
  With the Responses API image generation tool, supported tool models can choose whether to 
  generate a new image or edit one already in the conversation. The optional action 
  parameter controls this behavior: keep action: "auto" to let the model decide, 
  set action: "generate" to always create a new image, or 
  set action: "edit" to force editing when an image is in context.
*/
/* async function generateImageFromTextUsingResponseApi(){

  const response = open_ai.response.create({
    model: "gpt-5.4",
    input: "Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools: [
      {
        type: "image_generation",
        action: "generate"
      }
    ],
  })

  // Save the image to a file
  const imageData = response.output
    .filter((output:any) => output.type === "image_generation_call")
    .map((output:any) => output.result);

  if (imageData.length > 0) {
    const imageBase64 = imageData[0];
    fs.writeFileSync("otter.png", Buffer.from(imageBase64, "base64"));
  }
}

generateImageFromTextUsingResponseApi() */



// 3. For Voice

/* 
  The speech endpoint takes three key inputs:

  The model you’re using
  The text to be turned into audio
  The voice that will speak the output

  For best quality, recommended using marin or cedar.

  Voice availability depends on the model. The tts-1 and tts-1-hd models support a 
  smaller set: alloy, ash, coral, echo, fable, onyx, nova, sage, and shimmer.

  Supported output formats

  The default response format is mp3, but other formats like opus and wav are available.

  MP3: The default response format for general use cases.
  Opus: For internet streaming and communication, low latency.
  AAC: For digital audio compression, preferred by YouTube, Android, iOS.
  FLAC: For lossless audio compression, favored by audio enthusiasts for archiving.
  WAV: Uncompressed WAV audio, suitable for low-latency applications to avoid decoding overhead.
  PCM: Similar to WAV but contains the raw samples in 24kHz (16-bit signed, low-endian), without the header.
*/

/* async function textToSpeechGenerate(){

  const response = await open_ai.audio.speech.create({
    model: "gpt-4o-mini-tts",
    voice: "cedar",
    input: "Today is a wonderful day to build something people love!",
    instructions: "Speak in a cheerful and positive tone.",
    response_format: "wav",
  })

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync("output.mp3", buffer);
}
textToSpeechGenerate() */



//  For Speech to text
/* async function speechToText(){
  const response = await open_ai.audio.transcriptions.create({
    file: "output.mp3",
    model: 'whisper-1',
    langauge: 'hi' //Hindi
  })

  console.log(response)
}

speechToText() */