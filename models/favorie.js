import mongoose from 'mongoose';
const { Schema, model , Types} = mongoose;

const favorieSchema = new Schema(
    {
    
        idCoursProgramme: {
            type: Types.ObjectId,
            ref: 'CoursProgramme'
        }
       
    }, 
    {
        timestamps : true
    }
);

export default model("Favorie", favorieSchema);