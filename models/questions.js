import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const questionsSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        
        idChoix: {
            type: Types.ObjectId,
            ref: 'Choix',
            required: true
        },
       
    }
);

export default model("Questions", questionsSchema);