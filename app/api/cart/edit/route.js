import UserProducts from "@models/products";
import { connectToDB } from "@utils/db";
import User from "@models/user";

export const POST = async(req,{params}) => {
    
    const {pid, size, quantity} = await req.json();

    try{

        await connectToDB();

        const updateProduct = await UserProducts.updateOne(
            {_id:pid},
            { $set: { size: size, quantity: quantity } }
        );

        const responseData = {
            pid
        };

        console.log('Product Updated');

        return new Response(JSON.stringify(responseData), {
            status:200
        })

    }catch(error){

        return new Response("Failed To update Product", {
            status: 500
        })

    }

}


