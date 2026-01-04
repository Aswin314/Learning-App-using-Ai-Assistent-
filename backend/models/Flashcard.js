import mongoose from "mongoose";

const FlashcardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    cards: [
      {
        questions: { type: String, required: true },
        answer: { type: String, required: true },
        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "easy",
        },
        lastReviewed: {
          type: Date,
          default: null,
        },
        reviewCount: { type: Number, default: 0 },
        isStarted: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);
const Flashcard = mongoose.model("Flashcard", FlashcardSchema);
export default Flashcard;
