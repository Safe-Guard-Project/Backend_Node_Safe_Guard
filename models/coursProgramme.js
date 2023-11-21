import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const coursProgrammeSchema= new Schema(
    {
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
        
    }, 
    {
        timestamps : true
    }
);

export default model("CoursProgramme", coursProgrammeSchema);