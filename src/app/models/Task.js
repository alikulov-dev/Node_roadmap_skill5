import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "The name is required"],
            unique: true,
        },
        contact_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'contact'
          },
        is_approved: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);
const TaskModel = mongoose.model('task', TaskSchema);
export default TaskModel;
