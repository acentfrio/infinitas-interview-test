const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const TEACHERS_FILE = path.join(DATA_DIR, 'teachers.json');

module.exports = (() => {
  let instance;

  const createInstance = () => {
    let teachers = {};

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

    const loadTeachers = async () => {
      try {
        await ensureDataDirectoryExists();
        const data = await fs.readFile(TEACHERS_FILE, 'utf8');
        teachers = JSON.parse(data);
      } catch (error) {
        if (error.code === 'ENOENT') {
          teachers = {};
          await saveTeachers();
        } else {
          console.error('Error reading teachers file:', error);
          throw error;
        }
      }
    };

    const saveTeachers = async () => {
      try {
        await ensureDataDirectoryExists();
        await fs.writeFile(TEACHERS_FILE, JSON.stringify(teachers, null, 2));
      } catch (error) {
        console.error('Error writing teachers file:', error);
        throw error;
      }
    };

    loadTeachers();

    return {
      addTeacher: (teacher) => {
        teachers[teacher.id] = { ...teacher, students: [] };
      },
      getTeachers: () => {
        return Object.values(teachers);
      },
      getTeacherById: (teacherId) => {
        return teachers[teacherId];
      },
      updateTeacher: (teacher) => {
        teachers[teacher.id] = teacher;
      },
      clear: () => {
        teachers = {};
      },
    };
  };

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
