import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_SECRET});


export const POST = async (req, res) => {
    const { promptQuery } = await req.json();

    try{

        const response = await openai.createImage({
            model: "dall-e-3",
            prompt: "a cat",
            n: 1,
            size: "1024x1024",
            response_format: 'base64_json'
          });

          const image_url = response.data.data[0].b64_json;

        return new Response(JSON.stringify({ image:image_url }), { status: 201 });

    } catch (error) {
        console.log("Failed to Generate Image:", error);
        return new Response("Failed to Generate Image", {status: 200})
    }

}