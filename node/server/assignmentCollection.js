const fs = require('fs').promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const ASSIGNMENTS_FILE = path.join(DATA_DIR, 'assignments.json');

const createInstance = () => {
    let assignments = [];

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

    const loadAssignments = async () => {
        try {
            await ensureDataDirectoryExists();
            const data = await fs.readFile(ASSIGNMENTS_FILE, 'utf8');
            assignments = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, start with an empty array
                assignments = [];
                // Create the file with an empty array
                await saveAssignments();
            } else {
                console.error('Error reading assignments file:', error);
                throw error;
            }
        }
    };

    const saveAssignments = async () => {
        try {
            await ensureDataDirectoryExists();
            await fs.writeFile(ASSIGNMENTS_FILE, JSON.stringify(assignments, null, 2));
        } catch (error) {
            console.error('Error writing assignments file:', error);
            throw error;
        }
    };

    // Load assignments when the instance is created
    loadAssignments();

    return {
        addAssignment: async (assignment) => {
            assignments.push(assignment);
            await saveAssignments();
        },

        getAssignments: () => {
            return assignments;
        },

        getAssignmentById: (id) => {
            return assignments.find(assignment => assignment.id === id);
        },

        updateAssignment: async (updatedAssignment) => {
            const index = assignments.findIndex(assignment => assignment.id === updatedAssignment.id);
            if (index !== -1) {
                assignments[index] = updatedAssignment;
                await saveAssignments();
            }
        },

        deleteAssignment: async (id) => {
            const index = assignments.findIndex(assignment => assignment.id === id);
            if (index !== -1) {
                assignments.splice(index, 1);
                await saveAssignments();
            }
        }
    };
};

let instance = null;

module.exports = {
    getInstance: () => {
        if (!instance) {
            instance = createInstance();
        }
        return instance;
    }
};