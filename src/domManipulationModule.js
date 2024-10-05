import { populateStorage, fetchStorage } from "./webStorageAPI";
import { ProjectList } from "./classModule";
import { createNewTodo, editToDo } from "./applicationLogic";
import { formatRelative } from "date-fns";

const projectListObject = new ProjectList;

// Function to provide the functionality to the '#addProject', and '.projectModal' buttons
function formButtonFunctionality () {
    const addProjectButton = document.querySelector('#addProject');
    const closeButton = document.querySelector('.closeButton');
    const submitButton = document.querySelector('.submitButton');

    addProjectButton.addEventListener("click", () => {
        document.querySelector('.projectModal').showModal();
    })

    closeButton.addEventListener('click', () => {
        document.querySelector('.projectModal').close();
    })

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        let projectNameValue = document.querySelector('#name_of_project').value;
        if (projectNameValue) {
            document.querySelector('.projectModal').close();
            projectListObject.addProjectToList = projectNameValue;
            populateStorage(projectListObject.listOfProject);
            document.querySelector('.projectModal > form').reset();
            displayProjectList();
            displayTasksFromProjectList();
            removeChildElements(document.querySelector('.taskContainer'));
        }
    })
}

function displayProjectList () {
    const projectListContainer = document.querySelector('.projectListContainer');

    removeChildElements(projectListContainer);
    const fetchStorageOutput = fetchStorage();

    if (fetchStorageOutput) {
        for (let i in projectListObject.listOfProject) {
            let divElement = document.createElement('div');
            let radioElement = document.createElement('input');
            let labelElement = document.createElement('label');
            radioElement.setAttribute('type', 'radio');
            radioElement.setAttribute('id', fetchStorageOutput[i].projectName);
            radioElement.setAttribute('name', 'projectNameRadio');
            radioElement.setAttribute('value', fetchStorageOutput[i].projectName);

            labelElement.setAttribute('for', fetchStorageOutput[i].projectName);
            labelElement.textContent = fetchStorageOutput[i].projectName;

            divElement.append(radioElement, labelElement);

            // divElement.textContent = fetchStorageOutput[i];
            projectListContainer.appendChild(divElement);
        }
    }
}

function deleteButtonFunctionality () {
    const deleteButton = document.querySelector('#deleteProject');

    deleteButton.addEventListener("click", () => {
        if (document.querySelector('.projectListContainer > div > input:checked')) {
            let inputElementValue = (document.querySelector('.projectListContainer > div > input:checked').value);
            let elementIndex = -1;
            for (let i in projectListObject.projectListArray) {
                if (inputElementValue==projectListObject.projectListArray[i].returnProjectName) {
                    elementIndex = i;
                    break
                }
            }
            projectListObject.removeProjectFromList(elementIndex);
            populateStorage(projectListObject.projectListArray);
            displayProjectList();
            removeChildElements(document.querySelector('.taskContainer'));
        }
    })
}

function removeChildElements (parent) {
    while (parent.lastChild) parent.removeChild(parent.lastChild);
}

function taskModalButtonFunctionality1 () {
    const closeTaskButton = document.querySelector('.taskClose');
    const submitTaskButton = document.querySelector('.taskSubmit');

    closeTaskButton.addEventListener ('click', () => {
        document.querySelector('.taskModal').close();
    })

    submitTaskButton.addEventListener ('click', (event) => {
            if (document.querySelector('#taskName').value && document.querySelector('#taskDesc').value && document.querySelector('#dueDate').value) {
                let elementIndex = -1;
                let fetchStorageOutput = fetchStorage();
                let inputElementValue = (document.querySelector('.projectListContainer > div > input:checked').value);
                for (let i in fetchStorageOutput) {
                    if (fetchStorageOutput[i].projectName == inputElementValue) {
                        elementIndex = i; 
                        break;
                    }
                }
                createNewTodo(elementIndex);
                populateStorage(projectListObject.projectListArray);
                document.querySelector('.taskModal > form').reset();
                document.querySelector('.taskModal').close();
                displayTasks();
                event.preventDefault();
            }
    })
};

function taskModalButtonFunctionality2 (taskName) {
    const closeTaskButton = document.querySelector('.taskClose1');
    const submitTaskButton = document.querySelector('.taskSubmit1');

    closeTaskButton.addEventListener ('click', () => {
        document.querySelector('.taskModalEdit').close();
    })

    submitTaskButton.addEventListener('click', (event) => {
        if (document.querySelector('#taskName1').value && document.querySelector('#taskDesc1').value && document.querySelector('#dueDate1').value) {
            let selectedProject = document.querySelector('.projectListContainer > div > input:checked').value;
            let availableProjects = projectListObject.projectListArray.map((element) => element.returnProjectName);
            let projectIndex = availableProjects.indexOf(selectedProject);

            let taskNameArray = projectListObject.projectListArray[projectIndex].getToDoList.map((element)=>element.getTaskTitle);
            let taskIndex = taskNameArray.indexOf(taskName);
            
            if (taskIndex!=-1){
                editToDo(projectIndex, taskIndex);
                populateStorage(projectListObject.projectListArray);
                document.querySelector('.taskModalEdit > form').reset();
                document.querySelector('.taskModalEdit').close();
                displayTasks();
                event.preventDefault();
            }
        }
    })
}


// Function to add the 'Add Task' button functionality
function addTaskButtonFunctionality(){
    const addTaskButton = document.querySelector('.addTasks');
    addTaskButton.addEventListener ("click", () => {
        if (document.querySelector('.projectListContainer > div > input:checked')) {
            document.querySelector('.taskModal').showModal();
            taskModalButtonFunctionality1();
        }
        else alert('Select a project or create new one');
    })
};

function displayTasks () {
    if (!document.querySelector('.projectListContainer > div > input:checked')) return
    const taskContainerElement = document.querySelector('.taskContainer');
    removeChildElements(taskContainerElement);

    let elementIndex = -1;
    for (let i in projectListObject.projectListArray) {
        if (document.querySelector('.projectListContainer > div > input:checked').value == projectListObject.projectListArray[i].returnProjectName) {
            elementIndex = i;
            break
        }
    }

    for (let task of projectListObject.projectListArray[elementIndex].getToDoList) {

        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'taskButtonContainer');

        let buttonElement = document.createElement('button');
        buttonElement.setAttribute('class', task.getTaskTitle);
        buttonElement.setAttribute('id', 'deleteTask');
        buttonElement.textContent='Delete Task';

        let buttonEditTask = document.createElement('button');
        buttonEditTask.textContent = 'Edit Task';
        buttonEditTask.setAttribute('class', task.getTaskTitle);
        buttonEditTask.setAttribute('id', 'editTask');

        buttonContainer.append(buttonEditTask, buttonElement);

        let divElement = document.createElement('div');
        divElement.setAttribute('class', task.getTaskTitle);

        let innerDiv1 = document.createElement('div');
        let innerDiv2 = document.createElement('div');

        innerDiv1.textContent = `Task Name: ${task.getTaskTitle}`;
        innerDiv2.textContent = `Due on: ${formatRelative((task.getDueDate), new Date())}`;

        divElement.appendChild(innerDiv1);
        divElement.appendChild(innerDiv2);
        divElement.appendChild(buttonContainer);

        taskContainerElement.appendChild(divElement);
    }
    deleteTaskButtonFunctionality();
    editTaskButtonFunctionality();
}

function displayTasksFromProjectList () {
    const allProjectContainer = document.querySelectorAll('.projectListContainer > div');
    allProjectContainer.forEach((element) => {
        element.addEventListener('click', () => displayTasks());
    })
}

function deleteTaskButtonFunctionality () {
    let deleteButtonNode = document.querySelectorAll('#deleteTask');
    deleteButtonNode.forEach((element) => {
        element.addEventListener('click', (event) => {
            let projectIndex,
                taskIndex = 0;
            const projectNameArray = projectListObject.projectListArray.map((element) => element.returnProjectName);
            projectIndex = projectNameArray.indexOf(document.querySelector('.projectListContainer > div > input:checked').value);
            for (let i of projectListObject.projectListArray[projectIndex].getToDoList) {
                if (i.getTaskTitle==event.target.className) {
                    projectListObject.removeTaskFromProject(projectIndex, taskIndex);
                    populateStorage(projectListObject.projectListArray);
                    displayTasks();
                    break;
                }
                else taskIndex += 1;
            }
        })
    })
}

function editTaskButtonFunctionality () {
     // using id for multiple element (like in this case for multiple edit/delete buttons) is not the right way
     let editButtonNode = document.querySelectorAll('#editTask');
     editButtonNode.forEach ((element) => {
         element.addEventListener('click', (event) => {
             document.querySelector('.taskModalEdit').showModal();
             taskModalButtonFunctionality2(event.target.className);
         })
     })
}


addTaskButtonFunctionality();
export {formButtonFunctionality, displayProjectList, projectListObject, deleteButtonFunctionality, displayTasksFromProjectList}