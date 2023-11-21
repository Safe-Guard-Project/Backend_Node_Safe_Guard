import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const programmeSchema = new Schema(
    {
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
        },
        cours: [{
            type: Schema.Types.ObjectId,
            ref: 'CoursProgramme', 
          }],
       
    }, 
    {
        timestamps : true
    }
);

export default model("Programme", programmeSchema);