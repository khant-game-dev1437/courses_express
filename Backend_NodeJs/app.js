const PORT = process.env.PORT || 8000;

const DB_CONTROLLER = require('./controllers/database_controller');
const db_controller = new DB_CONTROLLER();

const Joi = require("joi");

const express = require("express");
const app = express();
const router = express.Router();

const cors = require('cors');


app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// use it before all route definitions
app.use(cors({origin: 'http://localhost:8000'}));
app.use(express.json());
app.use(router);

var courses = [
  {
    id: 1,
    name: "Udemy",
  },
  {
    id: 2,
    name: "Software Engineering",
  },
  {
    id: 3,
    name: "Data Science",
  },
];

var credentials = [];

router.get("/api/courses", (req, res) => {
  res.send(courses);
});

router.get("/api/courses/:name", (req, res) => {
  var course = validationCourse(req.params);

  if (!course) {
    //res.status(404).send(`Could not find your course: ${req.params.name}`);
    res.render('404.html');
    return;
  }
  res.send(course);
});

router.get("/api/register", (req, res) => {
  res.header('Content-type', 'application/json');
 db_controller.sendCredentialstoClient(req, res);
});

router.post("/api/courses", (req, res) => {
  var course = coursesDataStructuring(req.body);
  courses.push(course);
  res.send(course);
});

router.post("/api/register/", (req, res) => {
  console.log('request body ', req.body.user_email);
  const { error } = validationCredentials(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  } else {
    var data = credentialsDataStructuring(req.body.user_email, req.body.user_password);
    db_controller.registerationCredentials(data.user_email, data.user_password);
    //credentials.push(data);
    res.send(data);
  }
});

router.put("/api/courses/:name", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

function validationCourse(course) {
  var result = courses.find((c) => c.name === course.name);
  return result;
}

function validationCredentials(credentialsData) {
  const schema = Joi.object({
    user_email: Joi.string().min(5).required(),
    user_email: [Joi.string().min(8).required(), Joi.number().min(8).required()],
  });

  const result = schema.validate({
    user_email: credentialsData.user_email,
    user_email: credentialsData.user_password,
  });
  return result;
}

function credentialsDataStructuring(userName, password) {
  var id = credentials.length + 1;
  const data = {
    id: id,
    user_email: userName,
    user_password: password,
  };
  return data;
}

function coursesDataStructuring(courseName) {
  var id = courses.length + 1;
  var course = {
    id: id,
    name: courseName.name,
  };
  return course;
}


// dbTest();
// function dbTest() {
//     return new Promise(async () => {
//         var sql = "INSERT INTO user SET email=?, password=?";
//         var result = await db.query(sql, ["MinKhantKyaw", "12345"]);
//         console.log('result', result);
//     })
// }
