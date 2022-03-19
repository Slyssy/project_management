const express = require('express');
const projectController = require('../controllers/projectController');

//! Setting up Application "Tour" Routers
const router = express.Router();

// router
//   .route('/top-5-cheap')
//   .get(projectController.aliasTopTours, projectController.getAllTours);

// router.route('/tour-stats').get(projectController.getTourStats);
// router.route('/monthly-plan/:year').get(projectController.getMonthlyPlan);

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
