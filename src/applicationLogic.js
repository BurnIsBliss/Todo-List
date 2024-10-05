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

function valueFromTaskFormEdited () {
    const taskTitle = document.querySelector('#taskName1').value;
    const taskDescription = document.querySelector('#taskDesc1').value;
    const taskDueDate = document.querySelector('#dueDate1').value;
    const taskPriority = document.querySelector('#taskPriority1').value;
    const taskNotes = document.querySelector('#taskNote1').value;

    return [taskTitle, taskDescription, taskDueDate, taskPriority, taskNotes];
}

function createNewTodo (projectObjectIndex) {
    const taskDetails = valueFromTaskForm();
    projectListObject.projectListArray[projectObjectIndex].addTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);

}

function editToDo (projectObjectIndex, taskIndex) {
    const taskDetails = valueFromTaskFormEdited();
    projectListObject.projectListArray[projectObjectIndex].getToDoList[taskIndex].editTask(taskDetails[0], taskDetails[1], taskDetails[2], taskDetails[3], taskDetails[4]);
}

// To-Do
// function markAsComplete () {
    
// }

// function changePriority () {

// }

export {createNewTodo, editToDo}