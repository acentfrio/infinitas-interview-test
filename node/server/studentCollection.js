const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const STUDENTS_FILE = path.join(DATA_DIR, 'students.json');

module.exports = (() => {
  let instance;

  const createInstance = () => {
    let students = {};

    const ensureDataDirectoryExists = async () => {
      try {
        await fs.access(DATA_DIR);
      } catch (error) {
        if (error.code === 'ENOENT') {
          await fs.mkdir(DATA_DIR, { recursive: true });
        } else {
          throw error;
        }
      }
    };

    const loadStudents = async () => {
      try {
        await ensureDataDirectoryExists();
        const data = await fs.readFile(STUDENTS_FILE, 'utf8');
        students = JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') {
          students = {};
          await saveStudents();
        } else {
          console.error('Error reading students file:', error);
          throw error;
        }
      }
    };

    const saveStudents = async () => {
      try {
        await ensureDataDirectoryExists();
        await fs.writeFile(STUDENTS_FILE, JSON.stringify(students, null, 2));
      } catch (error) {
        console.error('Error writing students file:', error);
        throw error;
      }
    };

    loadStudents();

    return {
      addStudent: async (student) => {
        students[student.id] = student;
        await saveStudents();
      },
      getStudents: () => {
        return Object.values(students);
      },
      getStudentById: (studentId) => {
        return students[studentId];
      },
      clear: async () => {
        students = {};
        await saveStudents();
      },
      update: async (studentToUpdate, updates) => {
        students[studentToUpdate.id].name = updates.name;
        await saveStudents();
      }
    }
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();