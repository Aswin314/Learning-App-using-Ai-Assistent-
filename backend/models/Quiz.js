import mongoose from "mongoose";
const QuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        options: {
          type: String,
          required: true,
          validate: [
            (array) => array.length === 4,
            "must have exactly 4 option",
          ],
        },
        correctAnswerIndex: { type: Number, required: true },
        explanation: { type: String, default: "" },
        defficultyLevel: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "easy",
        },
      },
    ],
    UserActivation: [
      {
        questionIndex: { type: Number, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    totalQuestions: {
      type: Number,
      required: true,
    },
    correctAnswers: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
QuizSchema.index({ userId: 1, documentId: 1 }, { unique: true });
const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;

