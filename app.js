//const db = require('./database_configuration/database_helper');
const Joi = require("joi");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
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

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:name", (req, res) => {
  var course = validationCourse(req.params);

  if (!course) {
    res.status(404).send(`Could not find your course: ${req.params.name}`);
    return;
  }
  res.send(course);
});

app.get("/api/login", (req, res) => {
  res.send(credentials);
});

app.post("/api/courses", (req, res) => {
  var course = coursesDataStructuring(req.body);
  courses.push(course);
  res.send(course);
});

app.post("/api/login/", (req, res) => {
  const { error } = validationCredentials(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  } else {
    var data = credentialsDataStructuring(req.body.userName, req.body.password);
    credentials.push(data);
    res.send(data);
    console.log("credentials: ", credentials.length);
  }
});

app.put("/api/courses/:name", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

function validationCourse(course) {
  var result = courses.find((c) => c.name === course.name);
  return result;
}

function validationCredentials(credentialsData) {
  const schema = Joi.object({
    userName: Joi.string().min(5).required(),
    password: [Joi.string().min(8).required(), Joi.number().min(8).required()],
  });

  const result = schema.validate({
    userName: credentialsData.userName,
    password: credentialsData.password,
  });
  return result;
}

function credentialsDataStructuring(userName, password) {
  var id = credentials.length + 1;
  const data = {
    id: id,
    userName: userName,
    password: password,
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
