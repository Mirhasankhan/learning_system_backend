
import mongoose, { Schema, Document } from "mongoose";

export interface TLecture extends Document {
  courseId: mongoose.Types.ObjectId;
  moduleId: mongoose.Types.ObjectId;
  title: string;
  videoUrl: string;
  pdfUrls: string[];
  lectureNumber: number;
}

const LectureSchema = new Schema<TLecture>({
  courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
  moduleId: { type: Schema.Types.ObjectId, ref: "Module", required: true },
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  pdfUrls: [{ type: String }],
  lectureNumber: { type: Number },
}, { timestamps: true });


LectureSchema.pre<TLecture>("save", async function (next) {
  if (this.isNew) {
    const lastLecture = await mongoose.model<TLecture>("Lecture")
      .findOne({ moduleId: this.moduleId })
      .sort({ lectureNumber: -1 })
      .select("lectureNumber");

    this.lectureNumber = lastLecture ? lastLecture.lectureNumber + 1 : 1;
  }
  next();
});

export const Lecture = mongoose.model<TLecture>("Lecture", LectureSchema);
