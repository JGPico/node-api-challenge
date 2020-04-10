const express = require('express');

const router = express.Router();
const Projects = require('../helpers/projectModel.js');

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(proj => {
      res.status(201).json(proj)
    })
    .catch(err => {
      res.status(500).json({error: "Error adding project"});
    })
  });
  
  
  router.get('/', (req, res) => {
    Projects.get()
    .then(projArray => {
      res.status(200).json(projArray);
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get projects"});
    });
  
  });
  
  router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get project by id"})
    })
  });
  
  router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get user actions"});
    })
  });
  
  router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(proj => {
      res.status(200).json({message: "Successfully deleted project"})
    })
  });
  
  router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(proj => {
      res.status(200).json({message: "Successfully updated project"});
    })
    .catch(err => {
      res.status(500).json({error: "Error editing project"});
    })
  });
  
  //custom middleware
  
  function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
    .then(projBit => {
      if (projBit) {
        next();
      } else {
        res.status(400).json({error: "invalid project id"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error fetching project"});
    })
    
  }
  
  function validateProject(req, res, next) {
    if (!req.body) {
      res.status(400).json({error: "Missing project data"});
    } else if (!req.body.name || !req.body.description) {
      res.status(400).json({error: "Missing required data fields"});
    } else {
      next();
    }
  }
  

module.exports = router;