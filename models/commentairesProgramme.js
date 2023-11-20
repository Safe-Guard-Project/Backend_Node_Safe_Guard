import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const commentairesProgrammeSchema = new Schema(
    {
        textComment: {
            type: String,
            required: true
        },
        idCoursProgramme: {
            type: Types.ObjectId,
            ref: 'CoursProgramme'
        },
       
    }, 
    {
        timestamps: true
    }
);

export default model("CommentairesProgramme", commentairesProgrammeSchema);





    