const express = require('express');

const router = express.Router();
const Actions = require('../helpers/actionModel.js');
const Projects = require('../helpers/projectModel.js');

// router.post('/', (req, res) => {
//     Actions.insert(req.body)
//     .then(act => {
//       res.status(201).json(act)
//     })
//     .catch(err => {
//       res.status(500).json({error: "Error adding action"});
//     })
//   });
  
  
  router.get('/', (req, res) => {
    Actions.get()
    .then(actArray => {
      res.status(200).json(actArray);
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get actions"});
    });
  
  });
  
  router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get project by id"})
    })
  });
  
  
  router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(proj => {
      res.status(200).json({message: "Successfully deleted action"})
    })
  });
  
  router.put('/:id', validateActionId, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(act => {
      res.status(200).json({message: "Successfully updated action"});
    })
    .catch(err => {
      res.status(500).json({error: "Error editing action"});
    })
  });
  
  //custom middleware
  
  function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(actBit => {
      if (actBit) {
        next();
      } else {
        res.status(400).json({error: "invalid action id"});
      }
    })
    .catch(err => {
      res.status(500).json({error: "Error fetching action"});
    })
    
  }
  
  function validateAction(req, res, next) {

    Projects.get()
    .then(projArr => {
        
        let idArray = projArr.map(el =>  el.id);
        
        let idBool = idArray.find(req.body.project_id);
        console.log("projectArray", projArr);

        if (!req.body) {
            res.status(400).json({error: "Missing action data"});
          } else if (!req.body.project_id || !req.body.description || !req.body.notes) {
            res.status(400).json({error: "Missing required data fields"});
          } else if (!idBool) {
              res.status(400).json({error: "project id doesn't match existing project"});
          } else {
            next(); 
          }

    })
    .catch(err => {
        res.status(500).json({error: "Internal server error"});
    });
  }

module.exports = router;