import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

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
    }
);

export default model("Choix", choixSchema);