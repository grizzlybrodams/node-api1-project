const db = require("./data/db.js");
const express = require("express");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.use(express.json());

//
//      CRUD Operation      HTTP Method
//      --------------      -----------
//      Create..............POST
//      Read................GET
//      Update..............PUT
//      Delete..............DELETE
//

server.get("/", (request, response) => {
  response.send("hello world...");
});

server.get("/api/users", (req, res) => {
  db.find()
    .then(api => {
      res.status(200).json(api);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user with the specified ID does not exist.", err
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  db.findById(req.params.id)
    .then(api => {
      if (api) {
        res.status(200).json({ success: true, api });
      } else {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist.",err
        });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(remove => {
      if (remove) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The user could not be removed", err });
    });
});

// 

server.put('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const info = req.body;
    db.update(id, info)
       .then(edit => {
          if (edit) {
             res.status(200).json(info);
          } else if (edit) {
             res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
          } else {
             res.status(404).json({ message: "The user with the specified ID does not exist." });
          }
       })
       .catch(err => {
          res.status(500).json({ errorMessage: "The user information could not be modified."},err);
       });
 });




 server.post('/api/users/:id', (req, res) => {
    const edit = req.body;
    

    db.insert(edit)
        .then((edit) => {
            res.status(201).json({ edit });
        })
        .catch((err) => {
            res.status(404).json({ errorMessage: "Please provide name and bio for the user.",err});
        });
});