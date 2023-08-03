import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Brand Name is Required'],
      unique: [true, 'Brand Name must be Unique'],
      maxlength: [60, 'Brand Name is Too Long'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
const brandModel = mongoose.model('Brand', brandSchema);

export default brandModel;
