export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const message = url.searchParams.get("msg");
      const token = url.searchParams.get("token");

      // Block unauthorized requests
      if (token !== env.ACCESS_TOKEN) {
        return new Response("Unauthorized", { status: 401 });
      }

      if (!message) {
        return new Response("Send a message using ?msg=hello", { status: 400 });
      }

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: message }]
        })
      });

      const data = await response.json();

      if (!data.choices) {
        return new Response("Groq error: " + JSON.stringify(data), {
          headers: { "Content-Type": "text/plain" }
        });
      }

      const reply = data.choices[0].message.content;

      return new Response(reply, {
        headers: { "Content-Type": "text/plain" }
      });

    } catch (err) {
      return new Response("Worker error: " + err.message, {
        headers: { "Content-Type": "text/plain" }
      });
    }
  }
};
