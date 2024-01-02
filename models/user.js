import mongoose from 'mongoose';
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
            enum:  ['client', 'admin'],
            required: true,
        },
        image : {
            
            type: String,
             default :'null'
         },
        latitudeDeUser: Number,
        longitudeDeUser: Number,
        numeroTel: String,
        status: {
            type: String,
            enum: ['active', 'banned'],
            default: 'active',
          },
        datasystem: {
            type: Date,
            default: Date.now // Use the current date as the default value
          },
    }, 
    {
    timestamps : true
    });

    export default model("User", userSchema);
