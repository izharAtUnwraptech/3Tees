import { Schema, model, models } from 'mongoose';

const UserProductsSchema = new Schema({
    
    userid: {
        type: String,
    },
    frontimage: {
        type: String,
    },
    backimage: {
        type: String,
    },
    logoimage: {
        type: String,
    },
    pocketlogoimage: {
        type: String,
    },
    backlogoimage: {
        type: String,
    },
    productname: {
        type: String,
    },
    quantity:{
        type: String,
    },
    size: {
        type: String,
    },
    totalPrice: {
        type: String,
    },
    shirtPrice: {
        type: String,
    },
    color: {
        type: String,
    },
    isFrontLogo: {
        type: String,
    },
    isPocketLogo: {
        type: String,
    },
    isBackLogo: {
        type: String,
    },

})

const UserProducts = models.UserProducts || model("UserProducts", UserProductsSchema);

export default UserProducts;                     