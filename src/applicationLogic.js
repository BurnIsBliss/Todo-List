import {ToDoTask, Project, ProjectList} from "./classModule"
import { projectListObject } from "./domManipulationModule";

function valueFromTaskForm () {
    const taskTitle = document.querySelector('#taskName').value;
    const taskDescription = document.querySelector('#taskDesc').value;
    const taskDueDate = document.querySelector('#dueDate').value;
    const taskPriority = document.querySelector('#taskPriority').value;
    const taskNotes = document.querySelector('#taskNote').value;

    return [taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes];
}

function createNewTodo (projectObjectIndex) {
    const taskDetails = valueFromTaskForm();
    projectListObject.projectListArray[projectObjectIndex].addTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);

}

function editToDo (projectObjectIndex) {
    const taskDetails = valueFromTaskForm();
    projectListObject.projectListArray[projectObjectIndex].editTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);
}

function markAsComplete () {
    
}

function changePriority () {

}

export {createNewTodo, editToDo}