import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set in environment variables. AI features will be disabled.");
}

// FIX: Initialize with named `apiKey` parameter
const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (keywords: string): Promise<string> => {
  if (!API_KEY) {
    return "ฟีเจอร์ AI ถูกปิดใช้งาน กรุณาตั้งค่า API key บนเซิร์ฟเวอร์";
  }
  try {
    const prompt = `สร้างคำอธิบายบ้านที่น่าสนใจสำหรับขายเป็นภาษาไทย จากคีย์เวิร์ดเหล่านี้: "${keywords}" คำอธิบายควรมีความยาวประมาณ 3-4 ประโยคในย่อหน้าเดียว โดยเน้นจุดเด่นเพื่อดึงดูดผู้ซื้อ ห้ามใช้ bullet point หรือ list`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const resultText = response.text;
    if (resultText) {
      return resultText.trim();
    }
    
    // This can happen if the response is blocked or empty.
    throw new Error("โมเดล AI ไม่ได้ส่งข้อความกลับมา อาจถูกบล็อกเนื่องจากการตั้งค่าความปลอดภัย");

  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : "เกิดข้อผิดพลาดที่ไม่รู้จัก";
    return `ไม่สามารถสร้างคำอธิบายได้ กรุณาลองอีกครั้ง ข้อผิดพลาด: ${errorMessage}`;
  }
};