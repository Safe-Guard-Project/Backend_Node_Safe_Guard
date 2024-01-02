import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const commentairesInformationSchema = new Schema(
{
idInformation: {
type: mongoose.Schema.Types.ObjectId,
ref: 'Information',
required: true
},
descriptionCommentaire: {
type: String,
required: true
},
},
{
timestamps : true
}
);

export default model("commentairesInformation", commentairesInformationSchema);