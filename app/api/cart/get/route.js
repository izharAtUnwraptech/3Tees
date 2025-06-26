import UserProducts from "@models/products"
import { connectToDB } from "@utils/db"
import User from "@models/user";


export const POST = async (req) => {

    const { userid} = await req.json();

    // console.log(`INTO id: ${userid}`);
    // console.log(`Params: ${params}`);

    try{

        await connectToDB();

        // Find user details
        const user = await User.findById(userid);
        if (!user) {
            throw new Error("User not found");
        }

        // Find products associated with the user
        const products = await UserProducts.find({ userid });
        if (!products) {
            throw new Error("Products not found");
        }

        // Create response object containing both user and products
        const responseData = {
            user,
            products
        };

        // console.log(`Response Data: ${JSON.stringify(responseData.user)}`);

        return new Response(JSON.stringify(responseData), {
            status:200
        })

    }catch(error){

        return new Response("Failed To Load PRoducts", {
            status: 500
        })


    }

}