module.exports = function (app) {
  var comments = require("../controllers/comments.server.controller");

  app
    .route("/submit_comment")
    .get(comments.displayForm)
    .post(comments.saveComment);

  app.route("/display_comments").get(comments.renderDisplaySearchStudent);

  app.route("/comments").post(comments.commentsByStudent);
};
