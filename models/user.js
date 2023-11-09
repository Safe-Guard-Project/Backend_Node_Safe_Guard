import mongoose from 'mongoose';
import UserRoles from './userRoles.js';
    const { Schema, model  } = mongoose;

    const userSchema = new Schema(
        {

        UserName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        Role: {

            type:String,
            enum:Object.values(UserRoles),
            default:UserRoles.CLIENT
        },
        latitudeDeUser: Number,
        longitudeDeUser: Number,
        numeroTel: Number,
    }, 
    {
    timestamps : true
    });

    export default model("User", userSchema);