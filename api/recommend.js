
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Leidžiamos tik POST užklausos."
    });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Nerastas OpenRouter API raktas."
    });
  }

  const prompt = req.body?.prompt;

  if (typeof prompt !== "string" ||
      !prompt.trim() ||
      prompt.length > 500) {
    return res.status(400).json({
      error: "Įrašyk klausimą iki 500 simbolių."
    });
  }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          max_tokens: 300,
          messages: [
            {
              role: "system",
              content:
                "Esi filmų rekomendavimo asistentas. " +
                "Atsakyk lietuviškai, trumpai ir aiškiai. " +
                "Rekomenduok vieną filmą ir paaiškink kodėl."
            },
            {
              role: "user",
              content: prompt.trim()
            }
          ]
        })
      }
    );

    if (!response.ok) {
      return res.status(502).json({
        error: "OpenRouter užklausa nepavyko."
      });
    }

    const data = await response.json();

    const recommendation =
      data.choices?.[0]?.message?.content;

    if (typeof recommendation !== "string") {
      return res.status(502).json({
        error: "AI nepateikė rekomendacijos."
      });
    }

    return res.status(200).json({
      recommendation
    });
  } catch (error) {
    console.error("AI užklausos klaida:", error);

    return res.status(500).json({
      error: "Nepavyko susisiekti su AI."
    });
  }
}
