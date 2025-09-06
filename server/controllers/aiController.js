// import {GoogleGenerativeAI} from '@google/generative-ai'

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

// export const chatWithAi = async (req, res) => {
//     try {
//         const { prompt } = req.body

//         if(!prompt) {
//             return res.status(400).json({ success: false, message: 'Prompt is required' })
//         }

//         const model =  genAI.getGenerativeModel({model: "gemini-pro"})
//         const result = await model.generateContent(prompt)

//         res.json({success:true, message: result.response.text()})
//     } catch (error) {
//         console.error("Gemini Error:", error);
//         res.status(500).json({ error: "Failed to generate response" });
//     }
// }




import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const chatWithAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // const result = await model.generateContent(prompt);
    const result = await model.generateContent(
        `You are a tourism guide for Jharkhand. Answer clearly.\nUser: ${prompt}`
      );
      

    const text = result.response.text();
    res.json({ success: true, message: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
