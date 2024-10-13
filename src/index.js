import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// File to store tasks
const filePath = path.join(__dirname, 'tasks.json');

// Ensure the JSON file exists
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
}

// Helper functions
const readTasks = () => {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

const writeTasks = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const generateId = (tasks) => {
    if (tasks.length === 0) {
        return '0'; // Start with '0' if there are no tasks
    }
    
    // Find the highest number in the list
    const maxId = Math.max(...tasks.map(task => parseInt(task.id, 10)));
    
    // Return the next number as a string
    return (maxId + 1).toString();
};

// Command line arguments
const [,, command, ...args] = process.argv;

const addTask = (description) => {
    const tasks = readTasks();
    const newTask = {
        id: generateId(),
        description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log('Task added:', newTask);
};

const updateTask = (id, newDescription) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.description = newDescription;
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log('Task updated:', task);
    } else {
        console.log('Task not found.');
    }
};

const deleteTask = (id) => {
    const tasks = readTasks();
    const updatedTasks = tasks.filter(t => t.id !== id);
    writeTasks(updatedTasks);
    console.log('Task deleted.');
};

const changeStatus = (id, status) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log('Task status updated:', task);
    } else {
        console.log('Task not found.');
    }
};

const listTasks = (filter) => {
    const tasks = readTasks();
    const filteredTasks = filter ? tasks.filter(t => t.status === filter) : tasks;
    console.log(filteredTasks);
};

// Command handling
switch (command) {
    case 'add':
        addTask(args.join(' '));
        break;
    case 'update':
        updateTask(args[0], args.slice(1).join(' '));
        break;
    case 'delete':
        deleteTask(args[0]);
        break;
    case 'status':
        changeStatus(args[0], args[1]);
        break;
    case 'list':
        listTasks(args[0]);
        break;
    default:
        console.log('Unknown command');
        console.log('Commands: add <description>, update <id> <description>, delete <id>, status <id> <todo|in-progress|done>, list <todo|in-progress|done>');
}


