import mongoose, { Schema } from "mongoose";
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    createdOn: {
      type: Date,
      default: new Date().getTime(),
    },
  },
  { timestamps: true }
);
export const Notes = mongoose.model("Notes", noteSchema);
