import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const amisSchema = new Schema(
    {
        nomAmis: {
            type: String,
            required: true,
            unique: true
        },
        iduser: {
            type: Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps : true
    }
);

export default model("Amis", amisSchema);