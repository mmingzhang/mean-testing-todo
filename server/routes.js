const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
var path = require('path');

function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    app.post('/todos', (req, res) => {
        var todo = new Todo({
            text: req.body.text
        });
        // call the built-in save method to save to the database
        todo.save().then((doc) => {
            console.log('---doc');
            res.send(doc);
            console.log(doc);
            }, (e) => {
                res.status(400).send(e);
            });
        });

    app.get('/todos', (req, res) => {
        Todo.find().then((todos) => {
        res.send({todos});
      }, (e) => {
        res.status(400).send(e);
      });
    });

    app.get('/todos/json', (req, res) => {
        Todo.find().then((todos) => {
            // return all todos in JSON format
            res.json(todos);
        }, (e) => {
            res.status(400).send(e);
        });
    });

    app.get('/todos/:id', (req, res) => {
        var id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
        return res.status(404).send();
    }

    res.send({todo});
      }).catch((e) => {
              res.status(400).send();
      });
    });

    app.delete('/todos/:id', (req, res) => {
        var id = req.params.id;
        console.log(id);
        if (!ObjectID.isValid(id)) {
            console.log("delete failed");
            return res.status(404).send();
        }

        Todo.findByIdAndRemove(id).then((todo) => {
            console.log("findByIdAndRemove");
            if (!todo) {
                return res.status(404).send();
        }
        res.send({todo});
          }).catch((e) => {
                  res.status(400).send();
          });
    });

    app.patch('/todos/:id', (req, res) => {
        var id = req.params.id;
    var body = _.pick(req.body, ['text', 'done']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.done) && body.done) {
        body.completedAt = new Date().getTime();
    } else {
        body.done = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
        return res.status(404).send();
    }

    res.send({todo});
      }).catch((e) => {
              res.status(400).send();
      })
     });

    // application
    app.get('*', function (req, res) {
        //res.sendFile(__dirname + './../public/index.html');
        res.sendFile(path.resolve(__dirname + './../public/index.html'));
    });

    };