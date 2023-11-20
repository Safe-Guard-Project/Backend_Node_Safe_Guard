import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const choixSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        }
    }, 
    {
        timestamps : true
    }
);

export default model("Choix", choixSchema);
