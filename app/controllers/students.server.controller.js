// Load the 'Student' Mongoose model
const Student = require("mongoose").model("Student");
exports.renderSuccessReg = (req, res) => {
  res.render("successReg");
};

exports.renderSignIn = function (req, res) {
  res.render("signin", { errorMessage: "" });
};

exports.renderIndex = (req, res) => {
  res.render("index");
};

exports.redirectToForm = function (req, res) {
  //get user input using request object
  var email = req.body.email;
  //make a reference to the session object
  var session = req.session;
  //store the username in session object
  session.email = email;
  session.password = req.body.password;

  Student.findOne({ email: session.email, password: session.password }).then(
    (student) => {
      if (student) {
        session.student = student;
        res.redirect("/submit_comment");
      } else {
        res.render("signin", { errorMessage: "Invalid email / password." });
      }
    }
  );
};

// 'create' controller method to create a new Student
exports.create = function (req, res, next) {
  //generate questions
  var arr = generateQuestions();
  var firstQuestion = arr[0].question;
  var firstTitle = arr[0].title;
  var secondQuestion = arr[1].question;
  var secondTitle = arr[1].title;

  // Create a new instance of the 'Student' Mongoose model
  const student = new Student(req.body);
  var email = student.email;
  // Use the 'Student' instance's 'save' method to save a new student document
  student.save((err) => {
    var errorMessages = [];
    if (err) {
      for (item in err.errors) {
        errorMessages.push(err.errors[item].message);
      }
      console.log(errorMessages);
      res.render("signup", {
        errorMessages: errorMessages,
        firstQuestion: firstQuestion,
        firstTitle: firstTitle,
        secondQuestion: secondQuestion,
        secondTitle: secondTitle,
      });
      // Call the next middleware with an error message
      //res.json(err);
    } else {
      // Use the 'response' object to send a JSON response
      //res.json(student);
      //redirect them to the submit_comment page
      console.log(email + " has successfully registered");
      //res.render("submit_comment", { firstName: firstName, email: email });
      res.redirect("/successReg");
    }
  });
};

// 'list' controller method to display all students in raw json format
exports.listStudents = function (req, res, next) {
  // Use the 'Student' static 'find' method to retrieve the list of students
  Student.find({}, (err, students) => {
    if (err) {
      // Call the next middleware with an error message
      return next(err);
    } else {
      // Use the 'response' object to send a JSON response
      res.render("students", { students: students });
    }
  });
};

exports.renderSignup = function (req, res) {
  var arr = generateQuestions();
  var firstQ = arr[0].question;
  var firstQT = arr[0].title;
  var secondQ = arr[1].question;
  var secondQT = arr[1].title;

  console.log(firstQuestion, secondQuestion);

  res.render("signup", {
    errorMessages: [],
    firstQuestion: firstQ,
    firstTitle: firstQT,
    secondQuestion: secondQ,
    secondTitle: secondQT,
  });
};

var generateQuestions = () => {
  var randomQuestionList = [
    {
      title: "favoriteSubject",
      question: "What is your favorite subject?",
    },
    {
      title: "numOfLanguages",
      question: "How many languages you know?",
    },
    {
      title: "major",
      question: "What major do you study?",
    },
    {
      title: "favoriteSport",
      question: "What is your favorite sport?",
    },
    {
      title: "favoriteTeam",
      question: "What is your favorite sports team?",
    },
    {
      title: "favoriteActor",
      question: "Who is your favorite actor?",
    },
    {
      title: "favoriteFood",
      question: "What is your favorite food?",
    },
    {
      title: "technicalSkill",
      question: "What is your strongest technical skill?",
    },
  ];

  function shuffleArr(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  var shuffledQuestions = shuffleArr(randomQuestionList);
  [firstQuestion, secondQuestion] = shuffledQuestions;

  //res.render("signup", ([firstQuestion, secondQuestion] = shuffledQuestions));

  return ([firstQuestion, secondQuestion] = shuffledQuestions);
};

exports.logout = function (req, res) {
  //destroy the session and redirect user to root path
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
};
