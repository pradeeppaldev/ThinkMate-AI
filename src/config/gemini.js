import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCMcp3tz-1rfXFaQl7OWYoIhsMwNz32Cls");

async function checkAPI(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    // const response = result.candidates[0].content.parts[0].text;
    console.log("✅ Response received:", response);
    return response;
  } catch (err) {
    console.log("❌ Error:", err.message);
    return "";
  }
}

export default checkAPI;