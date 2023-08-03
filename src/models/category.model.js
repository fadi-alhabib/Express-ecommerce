import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category is Required'],
      unique: [true, 'Category must be Unique'],
      minlength: [3, 'Category Name is Too short'],
      maxlength: [32, 'Category Name is Too long'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const categoryModel = model('Category', categorySchema);

export default categoryModel;
