import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;



const quizSchema = new Schema(
    {
        titreQ: {
            type: String,
            required: true
        },
        
        idProgramme: {
            type: Types.ObjectId,
            ref: 'Programme',
            required: true
        },
         
        idQuestion: {
            type: Types.ObjectId,
            ref: 'Questions',
            required: true
        },
    }, 
    {
        timestamps : true
    }
);

export default model("Quiz", quizSchema);