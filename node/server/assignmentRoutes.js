const assignmentCollection = require("./assignmentCollection");
const teacherCollection = require("./teacherCollection");
const studentCollection = require("./studentCollection");

module.exports = (app) => {
  const assignmentList = assignmentCollection.getInstance();
  const teacherList = teacherCollection.getInstance();
  const studentList = studentCollection.getInstance();

  // Get all assignments
  app.route("/assignments").get((req, res) => {
    const assignments = assignmentList.getAssignments();
    res.json(assignments);
  });

  // Create a new assignment
  app.route("/assignments").post((req, res) => {
    const { teacherId, title, description = "", dueDate } = req.body;
    const teacher = teacherList.getTeacherById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    // Get all students associated with the teacher
    const teacherStudents = teacher.students || [];

    const assignment = {
      id: Date.now().toString(),
      teacherId,
      title,
      description,
      students: teacherStudents.map((s) => ({ id: s.id, status: "pending" })),
      createdAt: new Date().toISOString(),
      dueDate: new Date(dueDate).toISOString(),
    };

    assignmentList.addAssignment(assignment);
    res.status(201).json(assignment);
  });

  // Update assignment status for a student
  app
    .route("/assignments/:assignmentId/students/:studentId")
    .put((req, res) => {
      const { assignmentId, studentId } = req.params;
      const { status } = req.body;

      const assignment = assignmentList.getAssignmentById(assignmentId);
      if (!assignment) {
        return res.status(404).json({ error: "Assignment not found" });
      }

      const updatedStudents = assignment.students.map((s) =>
        s.id === studentId ? { ...s, status } : s
      );

      if (updatedStudents.length === assignment.students.length) {
        const updatedAssignment = { ...assignment, students: updatedStudents };
        assignmentList.updateAssignment(updatedAssignment);
        res.json(updatedAssignment);
      } else {
        res.status(404).json({ error: "Student not found in assignment" });
      }
    });
};
