const studentCollection = require("./studentCollection");
const teacherCollection = require("./teacherCollection");

module.exports = (app) => {
  const studentList = studentCollection.getInstance();
  const teacherList = teacherCollection.getInstance();

  app.route("/teachers").get((req, res) => {
    const teachers = teacherList.getTeachers();
    console.log({ teachers });
    res.json(teachers);
  });

  app.route("/teachers").post((req, res) => {
    const teacher = req.body;
    teacherList.addTeacher(teacher);
    res.sendStatus(201);
  });

  app.route("/teachers/:teacherId").put((req, res) => {
    const putBody = req.body;
    const teacherId = req.params.teacherId;
    const teacherToUpdate = teacherList.getTeacherById(teacherId);
    const studentToAdd = studentList.getStudentById(putBody.studentId);
    if (!teacherToUpdate.students.find((s) => s.id === studentToAdd.id)) {
      teacherToUpdate.students.push(studentToAdd);
    }
    console.log({ teacherToUpdate });
    teacherList.updateTeacher(teacherToUpdate);
    res.json(teacherToUpdate);
  });
};
