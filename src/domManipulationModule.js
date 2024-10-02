import { populateStorage, fetchStorage } from "./webStorageAPI";
import { ProjectList } from "./classModule";
import { createNewTodo, editToDo } from "./applicationLogic";

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

(function () {
    const submitTaskButton = document.querySelector('.taskSubmit');
    const closeTaskButton = document.querySelector('.taskClose');

    closeTaskButton.addEventListener ('click', () => {
        document.querySelector('.taskModal').close();
    })

    submitTaskButton.addEventListener ('click', (event) => {

        if (document.querySelector('#taskName').value && document.querySelector('#taskDesc').value && document.querySelector('#dueDate').value) {
            event.preventDefault();
            let elementIndex = -1;
            let fetchStorageOutput = fetchStorage();
            let inputElementValue = (document.querySelector('.projectListContainer > div > input:checked').value);
            for (let i in fetchStorageOutput) {
                if (fetchStorageOutput[i].projectName == inputElementValue) {
                    elementIndex = i; 
                    break;
                }
            }
            console.log(inputElementValue, elementIndex);
            createNewTodo(elementIndex);
            populateStorage(projectListObject.projectListArray);
            console.log(projectListObject.projectListArray);
            document.querySelector('.taskModal > form').reset();
            document.querySelector('.taskModal').close();
            // displayTasks(document.querySelector('.projectListContainer > div > input:checked').value);
            displayTasks();
        }
    })

})();

// Function to add the 'Add Task' button functionality
(function (){
    const addTaskButton = document.querySelector('.addTasks');
    addTaskButton.addEventListener ("click", () => {
        if (document.querySelector('.projectListContainer > div > input:checked')) {
            document.querySelector('.taskModal').showModal();
        }
        else alert('Select a project or create new one');
    })
})();

function displayTasks () {
    if (!document.querySelector('.projectListContainer > div > input:checked')) return
    const taskContainerElement = document.querySelector('.taskContainer');
    console.log();
    removeChildElements(taskContainerElement);

    let elementIndex = -1;
    for (let i in projectListObject.projectListArray) {
        if (document.querySelector('.projectListContainer > div > input:checked').value == projectListObject.projectListArray[i].returnProjectName) {
            elementIndex = i;
            break
        }
    }

    for (let task of projectListObject.projectListArray[elementIndex].getToDoList()) {
        let divElement = document.createElement('div');
        divElement.setAttribute('class', task.getTaskTitle);

        let innerDiv1 = document.createElement('div');
        let innerDiv2 = document.createElement('div');

        innerDiv1.textContent = task.getTaskTitle;
        innerDiv2.textContent = task.getDueDate;

        divElement.appendChild(innerDiv1);
        divElement.appendChild(innerDiv2);

        taskContainerElement.appendChild(divElement);
    }
}

function displayTasksFromProjectList () {
    const allProjectContainer = document.querySelectorAll('.projectListContainer > div');
    console.log(allProjectContainer);
    allProjectContainer.forEach((element) => {
        element.addEventListener('click', () => displayTasks());
    })
}




export {formButtonFunctionality, displayProjectList, projectListObject, deleteButtonFunctionality, displayTasksFromProjectList}