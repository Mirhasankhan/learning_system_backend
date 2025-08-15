import mongoose, { Schema, Document } from "mongoose";

export interface TModule extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  moduleNumber: number;
}

const ModuleSchema = new Schema<TModule>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: false },
  },
  { timestamps: true }
);

ModuleSchema.pre<TModule>("save", async function (next) {
  if (this.isNew) {
    const lastModule = await mongoose
      .model<TModule>("Module")
      .findOne({ courseId: this.courseId })
      .sort({ moduleNumber: -1 })
      .select("moduleNumber");

    this.moduleNumber = lastModule ? lastModule.moduleNumber + 1 : 1;
  }
  next();
});

export const Module = mongoose.model<TModule>("Module", ModuleSchema);
