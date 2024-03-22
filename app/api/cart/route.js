import UserProducts from "@models/products";
import { connectToDB } from "@utils/db";

export const POST = async (req, res) => {

        const { userid,frontimage,backimage,pocketlogoimage, backlogoimage, logoimage, productname, quantity, size, 
                totalPrice, shirtPrice, color,isFrontLogo, isPocketLogo,isBackLogo} = await req.json();

        try{
            await connectToDB();
            
            const newProduct = new UserProducts({
                userid,
                frontimage,
                backimage,
                pocketlogoimage,
                backlogoimage,
                logoimage,
                productname,
                quantity,
                size,
                totalPrice,
                shirtPrice,
                color,
                isFrontLogo,
                isPocketLogo,
                isBackLogo

            })

            await newProduct.save();

            return new Response(JSON.stringify({ req }), { status: 201 });

        } catch (error) {
            console.log("Failed to Generate Image:", error);
            return new Response("Failed to Generate Image", {status: 500})

        }
   
    

}