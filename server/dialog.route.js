// post.model.js

const express = require('express');
const postRoutes = express.Router();

// Require Post model in our routes module
let Dialog = require('./dialog.model');

// Defined store route
postRoutes.route('/add').post(function (req, res) {
  let dialog = new Dialog(req.body);
  dialog.save()
    .then(() => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(() => {
      res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
postRoutes.route('/').get(function (req, res) {
    Dialog.find(function(err, dialogs){
    if(err){
      res.json(err);
    }
    else {
      console.log(dialogs)
      res.json(dialogs);
    }
  });
});

// Defined edit route
postRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Dialog.findById(id, function (err, post){
      if(err) {
        res.json(err);
      }
      res.json(post);
  });
});

//  Defined update route
postRoutes.route('/update/:id').post(function (req, res) {
    Dialog.findById(req.params.id, function(err, post) {
    if (!post)
      res.status(404).send("data is not found");
    else {
        /*post.title = req.body.title;
        post.body = req.body.body;*/
        post.save().then(() => {
          res.json('Update complete');
      })
      .catch(() => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
/*postRoutes.route('/delete/:id').delete(function (req, res) {
    Post.findByIdAndRemove({_id: req.params.id}, function(err){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});*/

module.exports = postRoutes;