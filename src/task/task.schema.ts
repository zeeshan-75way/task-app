import { model, Schema } from "mongoose";
import { type ITask } from "./task.dto";

const TaskSchema = new Schema<ITask>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
