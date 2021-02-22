module.exports = function (app) {
  //load the controller(s)
  var student = require("../controllers/students.server.controller");
  //handle the routing of get request to the route
  //by showing the login screen
  app.get("/", student.renderIndex);

  app.get("/signup", student.renderSignup);
  app.post("/signup", student.create);

  app.get("/signin", student.renderSignIn);
  app.post("/signin", student.redirectToForm);

  app.get("/logout", student.logout);
  app.get("/students", student.listStudents);

  app.get("/successReg", student.renderSuccessReg);
};
