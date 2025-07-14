// import OpenAI from "openai";

// export const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENROUTER_KEY,
//     baseURL: "https://openrouter.ai/api/v1",
//     dangerouslyAllowBrowser: true,
// });

// export async function getAISuggestionIds(prompt: string): Promise<string[]> {
//     const res = await openai.chat.completions.create({
//         model: "google/gemma-3n-e4b-it:free",        // hoặc "google/gemini-2.5-pro"
//         messages: [
//             {
//                 role: "system",
//                 content: `
// You are a JSON-only product recommendation assistant.
// When I say “User wants: <prompt>”, reply ONLY with a JSON array of exactly 4 product IDs, e.g.:

// ["1","2","3","4"]

// No additional text, no markdown, no explanation.
//         `.trim()
//             },
//             {
//                 role: "user",
//                 content: `User wants: ${prompt}`
//             }
//         ],
//         temperature: 0.0,
//         max_tokens: 60,
//     });

//     const content = res.choices[0]!.message.content || '';
//     console.log("[AI raw content]", content);


//     // tìm substring JSON giữa [ và ]
//     const match = content.match(/\[.*\]/s);
//     if (!match) {
//         throw new Error('AI did not return a valid JSON array');
//     }

//     try {
//         return JSON.parse(match[0]) as string[];
//     } catch (e: any) {
//         throw new Error('Failed to parse JSON from AI response: ' + e.message);
//     }
// }


// src/services/ai.ts
// export async function getAISuggestionIds(prompt: string): Promise<string[]> {
//   const API_URL = "https://openrouter.ai/api/v1/chat/completions";
//   const apiKey = import.meta.env.VITE_OPENROUTER_KEY;
//   if (!apiKey) throw new Error("Missing VITE_OPENROUTER_KEY");

//   // 1. Build payload
//   const body = {
//     model: "google/gemma-3n-e4b-it",
//     messages: [
//       {
//         role: "system",
//         content: `
// You are a JSON-only product recommendation assistant.
// When I say “User wants: <prompt>”, you must reply ONLY with a JSON array
// of exactly 4 product IDs, e.g. ["1","2","3","4"].
// No additional text, no markdown fences, no explanation.
//         `.trim(),
//       },
//       {
//         role: "user",
//         content: `User wants: ${prompt}`,
//       },
//     ],
//     temperature: 0.0,
//     max_tokens: 80,
//   };

//   // 2. Call OpenRouter via fetch
//   const res = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//       // Nếu bạn muốn, thêm HTTP-Referer / X-Title:
//       // "HTTP-Referer": "https://your-site.com",
//       // "X-Title": "YourSiteName",
//     },
//     body: JSON.stringify(body),
//   });

//   if (!res.ok) {
//     const errText = await res.text();
//     throw new Error(`OpenRouter error ${res.status}: ${errText}`);
//   }

//   const json = await res.json() as any;
//   const content: string = json.choices?.[0]?.message?.content || "";

//   console.log("[AI raw content]", content);

//   // 3. Extract JSON array
//   const match = content.match(/\[.*\]/s);
//   if (!match) {
//     throw new Error(`AI did not return a valid JSON array. Got: ${content}`);
//   }

//   try {
//     return JSON.parse(match[0]) as string[];
//   } catch (e: any) {
//     throw new Error("Failed to parse JSON from AI response: " + e.message);
//   }
// }

// src/services/ai.ts
// export async function getAISuggestionIds(prompt: string): Promise<string[]> {
//     const API_URL = "https://openrouter.ai/api/v1/chat/completions";
//     const apiKey = import.meta.env.VITE_OPENROUTER_KEY;
//     if (!apiKey) throw new Error("Missing VITE_OPENROUTER_KEY");

//     // Đọc model từ env, hoặc fallback
//     const DEFAULT_MODEL = "google/gemma-3n-e4b-it";
//     const modelId = import.meta.env.VITE_OPENROUTER_MODEL || DEFAULT_MODEL;

//     // Build payload
//     const body = {
//         model: modelId,
//         messages: [
//             {
//                 role: "system",
//                 content: `
// You are a JSON‑only product recommendation assistant.
// When I say “User wants: <prompt>”, reply ONLY with a JSON array
// of exactly 4 product IDs, e.g. ["1","2","3","4"].
// No additional text, no markdown fences, no explanation.
//         `.trim(),
//             },
//             {
//                 role: "user",
//                 content: `User wants: ${prompt}`,
//             },
//         ],
//         temperature: 0.0,
//         max_tokens: 80,
//     };

//     // Call OpenRouter
//     const res = await fetch(API_URL, {
//         method: "POST",
//         headers: {
//             "Authorization": `Bearer ${apiKey}`,
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(body),
//     });

//     if (!res.ok) {
//         const errText = await res.text();
//         throw new Error(`OpenRouter error ${res.status}: ${errText}`);
//     }

//     const json = await res.json() as any;
//     const content: string = json.choices?.[0]?.message?.content || "";
//     console.log("[AI raw content]", content);

//     // Extract JSON array
//     const match = content.match(/\[.*\]/s);
//     if (!match) {
//         throw new Error(`AI did not return a valid JSON array. Got: ${content}`);
//     }

//     try {
//         return JSON.parse(match[0]) as string[];
//     } catch (e: any) {
//         throw new Error("Failed to parse JSON from AI response: " + e.message);
//     }
// }

// src/services/ai.ts
// src/services/ai.ts
import type { Product } from "../types/Product";

export async function getAISuggestionIds(
    prompt: string,
    catalog: Product[],
    favorites: string[],
    history: string[],
    tags: string[]
): Promise<string[]> {
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    const apiKey = import.meta.env.VITE_OPENROUTER_KEY!;
    const modelId = import.meta.env.VITE_OPENROUTER_MODEL || "google/gemma-3n-e4b-it";

    // build snippet catalog (20 items)
    let candidates = catalog.filter(p => !favorites.includes(p.id) && !history.includes(p.id));
    if (tags.length) candidates = candidates.filter(p => p.tags.some(t => tags.includes(t)));
    const snippet = JSON.stringify(candidates.slice(0, 20), null, 2);

    // full prompt with all context
    const fullPrompt = `
You are a JSON‑only recommendation assistant for an English‑learning marketplace.
Here are up to 20 candidate products(id, title, tags):
${snippet}

    User’s favorites: ${JSON.stringify(favorites)}
    User’s history:   ${JSON.stringify(history)}
    User’s tag filters: ${JSON.stringify(tags)}
    User’s request: "${prompt}"

    IMPORTANT:
    - You may only RECOMMEND from the above candidate list.
    - You may only RECOMMEND products that are *not* in the user’s favorites. 
    - You can also RECOMMEND products that are based on the user’s history and favorites in accordance to their preferences.
    - If the user's request has * ANY * bad words, unitellegable text or something that looks like code, * MUST * respond with an empty JSON array[].
    - If the user's request has * RANDOM * text or random numbers, * MUST * respond with an empty JSON array[].
    - If the user's request has * ANY * emoji, * MUST * respond with an empty JSON array[].
    - If the user's request has * ANY * URLS or links, * MUST * respond with an empty JSON array[].
    - If the user's request has * ANY * random words that has nothing to do with learning,* MUST * respond with an empty JSON array[].
    - If the user's request * CANNOT * be comprehended, * MUST * respond with an empty JSON array[].
    - If the user's request * CANNOT * be compared to any of the candidates, * MUST * respond with an empty JSON array[].
    - If the user’s request is * OUTSIDE * of the learning domain OR if none of the candidates * MATCH * the request(by title or tag),* MUST * respond with an empty JSON array[].
    - Otherwise, respond * ONLY * with a JSON array of exactly 4 product IDs, e.g. ["1", "2", "3", "4"].
    - Prioritize the products that are *MOST* relevant to the user’s request.
    - Prioritize in the order of: unrelated content > related content.
    - No extra text, no markdown fences, no explanation.
  `.trim();
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${apiKey} `,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: modelId,
            messages: [{ role: "system", content: fullPrompt }],
            temperature: 0.0,
            max_tokens: 80,
        }),
    });
    if (!res.ok) throw new Error(`AI error ${res.status} `);
    const { choices } = await res.json() as any;
    const text = choices[0]?.message?.content || "";
    const m = text.match(/\[.*\]/s);
    if (!m) throw new Error(`Invalid JSON from AI: ${text} `);
    return JSON.parse(m[0]);
}
