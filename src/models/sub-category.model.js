import { model, mongoose, Schema } from 'mongoose';

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, 'Sub-Category Must be Unique'],
      minlength: [2, 'Sub-Category Name is Too Short'],
      maxlength: [32, 'Sub-Category Name is Too Long'],
    },

    slug: {
      type: String,
      lowercase: true,
    },

    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: [true, 'Sub-Category Must Have Parent Category'],
    },
  },
  { timestamps: true }
);

const subCategoryModel = model('SubCategory', subCategorySchema);

export default subCategoryModel;
