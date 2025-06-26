import OpenAI from "openai";

const openai = new OpenAI({apiKey: process.env.OPENAI_API_SECRET});


export const POST = async (req, res) => {
    // const { promptQuery } = await req.json();
    const { promptDesc} = await req.json();

    // return console.log(promptDesc);

    try{

        const image = await openai.createImage({
            model: "dall-e-3",
            prompt: promptDesc,
            n: 1,
            size: "1024x1024",
            // response_format: 'base64_json'
          });

        //   const image_url = image.data.data[0];
          const image_url = image.data.data[0].url;

        //   console.log('IMAGE URL' + image_url);

        // return new Response(JSON.stringify({ image:image_url }), { status: 201 });

        console.log(promptDesc);

        return new Response(JSON.stringify(promptDesc), { status: 201 });

    } catch (error) {
        console.log("Failed to Generate Image:", error);
        return new Response("Failed to Generate Image", {status: 200})
    }

}