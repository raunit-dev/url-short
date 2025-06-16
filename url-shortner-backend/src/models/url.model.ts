import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    shortId: { type: String, required: true, unique: true},
    originalUrl: { type: String, required: true},
    createdAt: { type: Date, default: Date.now },
});

export default model('Url', urlSchema);