const Student = require("mongoose").model("Student");
const Comment = require("mongoose").model("Comment");

exports.saveComment = (req, res) => {
  var session = req.session;
  //create new instance of 'Comment' mongoose model
  const comment = new Comment(req.body);
  comment.student = session.student;
  comment.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.render("thanks", { email: session.email });

      console.log(
        "A new comment has been submitted by " + session.student.email
      );
    }
  });
};

exports.commentsByStudent = function (req, res, next) {
  var email = req.body.email;
  //find the student then its comments using Promise mechanism of Mongoose
  Student.findOne({ email: email }, (err, student) => {
    if (err) {
      return getErrorMessage(err);
    }
    //
    else {
      req.id = student._id;
      console.log(req.id);
    }
  }).then(function () {
    //find the posts from this author
    Comment.find(
      {
        student: req.id,
      },
      (err, comments) => {
        if (err) {
          return getErrorMessage(err);
        } else {
          //res.json(comments);
          res.render("comments", {
            comments: comments,
            email: email,
          });
        }
      }
    );
  });
};

exports.renderSearchComment = (req, res) => {
  res.render("search_comments");
};

exports.displayForm = function (req, res) {
  var session = req.session;

  if (session.email) {
    res.render("submit_comment");
    console.log(session.student);
  } else {
    res.redirect("/signin");
  }
};

exports.renderDisplaySearchStudent = function (req, res) {
  res.render("search_comments");
};
