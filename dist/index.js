"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { OpenAI } = require('openai');
const dotenv = require('dotenv');
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET
});
const input = require('prompt-sync')({ signit: true });
const opne_ai = openai.chat.completions.create({
    model: "gpt-5.4",
    messages: [
        {
            role: 'user',
            content: input
        }
    ]
});
//# sourceMappingURL=index.js.map