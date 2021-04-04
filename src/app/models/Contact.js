import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "The name is required"]
        },
        contact: {
            type: String,
            required: [true, "The Author's contact is required"],
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);
const ContactModel = mongoose.model('contact', ContactSchema);
export default ContactModel;
