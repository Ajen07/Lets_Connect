import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      min: 3,
      max: 500,
    },
    parent: {
      type: mongoose.Schema.ObjectId,
      default: null,
      ref: "Comment",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Users",
    },
    postId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Posts",
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
commentSchema.pre("deleteOne", async function () {
  const id = this.getQuery()["_id"];
  await mongoose.model("Comment").deleteMany({ parent: id });
});

export default mongoose.model("Comment", commentSchema);
