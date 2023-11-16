import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const commentairesProgrammeSchema = new Schema(
    {
        textCommentaire: {
            type: String,
            required: true
        },
        idProgramme: {
            type: Types.ObjectId,
            ref: 'Programme'
        },
        idUser: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
    }, 
    {
        timestamps : true
    }
);

export default model("CommentairesProgramme", commentairesProgrammeSchema);