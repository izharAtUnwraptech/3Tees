import UserProducts from "@models/products"
import { connectToDB } from "@utils/db"
import User from "@models/user";


export const POST = async (req,{params}) => {

    const { productid} = await req.json();

    try{

        await connectToDB();

        // Find user details
        const product = await UserProducts.findByIdAndRemove(productid);
        if (!product) {
            throw new Error("User not found");
        }


        // Create response object containing both user and products
        const responseData = {
            productid
        };

        console.log(`Response Data: ${JSON.stringify(responseData.params)}`);

        return new Response(JSON.stringify(responseData), {
            status:200
        })

    }catch(error){

        return new Response("Failed To Load PRoducts", {
            status: 500
        })


    }

}