import openai from "../config/openai.js";
import fs from "fs";
import path from "path";

export const askChatGPT = async (req, res) => {
  try {
    const { message } = req.body;

    const dataPath = path.join(process.cwd(), "data", "agencyData.json");
    const rawData = fs.readFileSync(dataPath, "utf-8");
    const agency = JSON.parse(rawData);

    // Build the dynamic prompt
    const systemPrompt = `
You are a smart, friendly assistant representing a professional web development agency.

AGENCY OFFERINGS:

SHOPIFY SERVICES:
${agency.services.shopify.map((service) => `- ${service}`).join("\n")}

WORDPRESS SERVICES:
${agency.services.wordpress.map((service) => `- ${service}`).join("\n")}

HIRING MODELS:
${agency.services.hiringModels.map((model) => `- ${model}`).join("\n")}

OTHER SERVICES:
${agency.services.other.map((service) => `- ${service}`).join("\n")}

PORTFOLIO CASE STUDIES:
${agency.portfolio
  .map((p) => `- ${p.name} (${p.platform}): ${p.details.join(", ")}`)
  .join("\n")}

PARTNER BRANDS:
${agency.brands.join(", ")}

USEFUL LINKS:
- Our Story: ${agency.extras.story}
- Projects: ${agency.extras.projects}
- Testimonials: ${agency.extras.testimonials}
- Contact Us: ${agency.extras.contact}

BOT GUIDELINES:
- Do NOT use Markdown like ## or ** in any response.
- Always answer cleanly and professionally.
- Use line-by-line bullet points when listing services.
- If the user asks about case studies, give relevant ones only, and avoid repeating.
- Mention hiring models clearly when asked about availability.
- Never fake or exaggerate information.
- Reply only in English unless the user speaks another language.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error?.response?.data || error.message);
    res.status(500).json({ reply: "Something went wrong." });
  }
};
