import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const informationSchema = new Schema(
{ titre: {
type: String,
},
typeCatastrophe: {
type: String,
},
idUser: {
type: Types.ObjectId,
ref: 'User',
},
pays: {
type: String,
},
region: {
type: String,
},
descriptionInformation: {
type: String,
},
dateDePrevention: {
type: Date,
},
image: {
type: String,
required: false
},
pourcentageFiabilite: {
type: Number,
},
etat: {
type: String,
}
},
{
timestamps : true
}
);

export default model("information", informationSchema);