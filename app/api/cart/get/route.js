import UserProducts from "@models/products"
import { connectToDB } from "@utils/db"


export const GET = async (req) => {

    try{

        await connectToDB();

        const products = await UserProducts.find();

        return new Response(JSON.stringify(products), {
            status:200
        })

    }catch(error){

        return new Response("Failed To Load PRoducts", {
            status: 500
        })


    }

}