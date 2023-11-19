import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const coursProgrammeSchema= new Schema(
    {/*
        video: {
            type: String,
            required: true
        },
        */
        Type: {
            type: String,
            enum: [ 'Introduction' ,'CAUSE', 'CONSEQUENCE', 'SIGNE','Agir'],
            required: true
        },
        image: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        idProgramme: {
            type: Types.ObjectId,
            ref: 'Programme'
        }
    }, 
    {
        timestamps : true
    }
);

export default model("CoursProgramme", coursProgrammeSchema);