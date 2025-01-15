import { Types } from "mongoose";
import { BaseSchema } from "../common/dto/base.dto";

export interface ITask extends BaseSchema {
  name: string;
  description: string;
  status: "PENDING" | "COMPLETED";
  assignedTo: Types.ObjectId;
}
