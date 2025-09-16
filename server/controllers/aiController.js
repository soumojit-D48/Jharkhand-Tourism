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




// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// export const chatWithAi = async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     if (!prompt) {
//       return res.status(400).json({ success: false, message: "Prompt is required" });
//     }

//     const model = genAI.getGenerativeModel(
//       // {model: "gemini-1.5-pro"}
//       { 
//       model: "gemini-1.5-flash-8k",
//       generationConfig: {
//         temperature: 0.7,
//         maxOutputTokens: 100,
//       }
//     }
//     );
//     // const result = await model.generateContent(prompt);
//     const result = await model.generateContent(
//         `You are a tourism guide for Jharkhand. Answer clearly. and not too long answers. \nUser: ${prompt}`
//     );
      

//     let text = result.response.text();

//     // text = text
//     // .replace(/\*(.*?)\*/g, '$1')     // Remove *italic*


//     res.json({ success: true, message: text });
//   } catch (error) {
//     console.error("Gemini Error:", error);
//     res.status(500).json({ error: "Failed to generate response" });
//   }
// };





import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

export const chatWithAi = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    // Enhanced prompt for better, cleaner responses
    const enhancedPrompt = `You are a helpful tourism guide for Jharkhand, India. 

Important instructions:
- Write clear sentences
- Don't use markdown formatting (* ** # etc)
- use numbered lists if needed 
- Write in a conversational, friendly tone
- Focus on practical travel information about Jharkhand
- If asked about non-tourism topics, politely redirect to Jharkhand tourism

User question: ${prompt}

Provide a helpful response about Jharkhand tourism:`;

    const result = await model.generateContent(enhancedPrompt);

    let text = result.response.text();

    // Clean up the response - remove markdown formatting
    text = text
      // .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove **bold**
      .replace(/\*(.*?)\*/g, '$1')     // Remove *italic*
      // .replace(/#{1,6}\s/g, '')        // Remove # headers
      // .replace(/^\s*[-*+]\s/gm, '')    // Remove bullet points
      // .replace(/^\s*\d+\.\s/gm, '')    // Remove numbered lists
      // .replace(/`(.*?)`/g, '$1')       // Remove code backticks
      // .trim();

      // let text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Clean up formatting
    text = text.replace(/\*(.*?)\*/g, '$1');

    res.json({ success: true, message: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Sorry, I'm having trouble right now. Please try again." 
    });
  }
};

