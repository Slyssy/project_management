const Project = require('../models/projectModel');
const APIFeatures = require('../utils/apiFeatures');

// //$ Creating alias route for top 5 cheap projects.
// exports.aliasTopProjects = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };

//! Route Handler Functions
//% Function to get all projects.
exports.getAllProjects = async (req, res) => {
  try {
    //? Execute the query...
    // const features = new APIFeatures(Project.find(), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    // const projects = await features.query;

    const projects = await Project.find();

    //? Send Response...
    res.status(200).json({
      status: 'success',

      numResults: projects.length,
      data: {
        projects,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//% Function to get project by id.
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//% Function to create a new project.
exports.createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: 'success',
      projectCreated: req.requestTime,
      data: {
        newProject,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

//% Function to Update something in a particular project object.
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        project,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

//% Function to Delete something in a particular project object.
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

// //% Function to calculate project (req, res) => {
//   try {
//     const stats = await Project.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.4 } },
//       },
//       {
//         $group: {
//           _id: { $toUpper: '$difficulty' },
//           numProjects: { $sum: 0 + 1 },
//           numRatings: { $sum: '$ratingQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//       {
//         $sort: { avgPrice: 1 },
//       },
//       // {
//       //   $match: { _id: { $ne: 'EASY' } },
//       // },
//     ]);
//     res.status(200).json({
//       status: 'success',
//       data: {
//         stats,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = +req.params.year;

//     const plan = await Project.aggregate([
//       {
//         $unwind: '$startDates',
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' },
//           numProjectStarts: { $sum: 1 },
//           projects: { $push: '$name' },
//         },
//       },
//       {
//         $addFields: { month: '$_id' },
//       },
//       {
//         $project: {
//           _id: 0,
//         },
//       },
//       {
//         $sort: { numProjectStarts: -1 },
//       },
//       {
//         $limit: 12,
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         plan,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
