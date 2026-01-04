import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    fileName: {
      type: String,
      required: [true, "File name is required"],
    },
    filePath: {
      type: String,
      required: [true, "File path is required"],
    },
    fileSize: {
      type: Number,
      required: [true, "File size is required"],
    },
    extractedText: {
      type: String,
      default: "",
    },
    chunk: [
      {
        context: {
          required: true,
          type: String,
        },
        paageNumber: {
          type: Number,
          default: 0,
        },
        chunkIndex: {
          type: Number,
          required: true,
        },
      },
    ],
    uploadedDate: {
      type: Date,
      default: Date.now,
    },
    lastAccessed: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["processing", "ready", "error"],
      default: "processing",
    },
  },
  { timestamps: true }
);
documentSchema.index({ title: "text", extractedText: "text" });

const Document = mongoose.model("Document", documentSchema);
export default Document;
