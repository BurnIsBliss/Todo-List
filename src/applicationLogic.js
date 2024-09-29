import {ToDoTask, Project, ProjectList} from "./classModule"


function valueFromTaskForm () {
    const taskTitle = document.querySelector('#title').value;
    const taskDescription = document.querySelector('#description').value;
    const taskDueDate = document.querySelector('#dueDate').value;
    const taskPriority = document.querySelector('#priority').value;
    const taskNotes = document.querySelector('#notes').value;

    return [taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes];
}

function createNewTodo (projectObject) {
    const taskDetails = valueFromTaskForm();
    return (projectObject.addTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]))
}

function editToDo (projectObject) {
    const taskDetails = valueFromTaskForm();
    projectObject.editTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);
}

function markAsComplete () {
    
}

function changePriority () {

}

export {}