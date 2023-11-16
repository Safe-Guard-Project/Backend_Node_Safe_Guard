import mongoose from 'mongoose';
const { Schema, model , Types} = mongoose;

const programmeSchema = new Schema(
    {
        idUser: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        Titre: {
            type: String,
            required: true
        },
        descriptionProgramme: {
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
    }, 
    {
        timestamps : true
    }
);

export default model("Programme", programmeSchema);