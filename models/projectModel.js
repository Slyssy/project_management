const mongoose = require('mongoose');
const slugify = require('slugify');

//! Creating Schemas for database Documents.
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You must provide a project name.'],
    trim: true,
  },
  slug: {
    type: String,
  },
  projectType: {
    type: String,
    trim: true,
  },
  estimateStartDate: [Date],
  actualStartDate: [Date],
  estimatedCloseDate: [Date],
  estimatedCloseDate: [Date],
  actualCloseDate: [Date],
  status: {
    type: String,
    required: [true, 'Project must have a status.'],
    trim: true,
  },
  equipmentOrdered: {
    type: String,
    required: [
      true,
      'You must indicate whether or not equipment has been ordered.',
    ],
    trim: true,
  },
  percentEquipmentReceived: Number,
  percentComplete: Number,
  overheadRate: Number,
  budgetedRevenue: Number,
  budgetedLaborExpense: Number,
  budgetedMaterialExpense: Number,
  budgetedSubcontractorExpense: Number,
  budgetedOtherExpense: Number,
  adjustedRevenue: Number,
  adjustedLaborExpense: Number,
  adjustedMaterialExpense: Number,
  adjustedSubcontractorExpense: Number,
  adjustedOtherExpense: Number,
  actualRevenue: Number,
  actualLaborExpense: Number,
  actualMaterialExpense: Number,
  actualSubcontractorExpense: Number,
  actualOtherExpense: Number,
  estimatedRevenueAtComplete: Number,
  estimatedLaborExpenseAtComplete: Number,
  estimatedMaterialExpenseAtComplete: Number,
  estimatedSubcontractorExpenseAtComplete: Number,
  estimatedOtherExpenseAtComplete: Number,
});

//! Document Middleware: runs before .save() and .create().
//* This will not be fired when we use insertMany()
//% This pre document middleware: Executed before the document is created.
//? This will add a slug to the document. Kind of like a virtual property.
projectSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

projectSchema.pre('save', function (next) {
  console.log('Will save document.');
  next();
});

//% This is post document middleware: Executed after the document is created.
//# We don't need to use the "this" keyword here because we will have access to
//# the document itself since it has already been created.
projectSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});

//! Creating the Mongoose Model for the Tours Document.
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
