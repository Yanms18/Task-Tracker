# Task Tracker

A simple Task Tracker for day-to-day tasks.

## Features

- Add a new task
- Update a task's description
- Delete a task
- Mark a task as in-progress
- Mark a task as done
- List tasks by status (to-do, in-progress, done)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
2. Navigate to the project directory: cd task-tracke

##Usage
Add a Task
To add a new task, run:
node index.js add "Task description"

Update a Task
To update a task's description, run:
node index.js update <task-id> "New task description"

Delete a Task
To delete a task, run:
node index.js delete <task-id>

Mark a Task as Done
To mark a task as done, run:
node index.js done <task-id>

List Tasks
To list tasks by status, run:
node index.js list <status>

Where <status> can be to-do, in-progress, or done.

File Structure
index.js: Main script containing all the functions to manage tasks.
tasks.json: JSON file to store tasks.
index2.js: A reference file for future improvements and enhancements.

##Functions in index.js
getNextId(tasks)
Generates the next unique ID for a new task based on the existing tasks.

listTasks(status)
Lists tasks filtered by status.

addTask(description)
Adds a new task with the given description.

updateTask(id, newDescription)
Updates the description of a task with the given ID.

deleteTask(id)
Deletes the task with the given ID.

markInProgress(id)
Marks the task with the given ID as in-progress.

markDone(id)
Marks the task with the given ID as done.

Helper Functions
readTasks()
Reads and returns the tasks from tasks.json.

writeTasks(tasks)
Writes the given tasks to tasks.json.
