import { populateStorage, fetchStorage } from "./webStorageAPI";
import { ProjectList } from "./classModule";

const projectListObject = new ProjectList;

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
            populateStorage(projectNameValue);
            document.querySelector('.projectModal > form').reset();
            displayProjectList();
        }
    })
}

function displayProjectList () {
    const projectListContainer = document.querySelector('.projectListContainer');

    removeChildElements(projectListContainer);
    const fetchStorageOutput = fetchStorage();

    if (fetchStorageOutput) {
        for (let i in fetchStorageOutput) {
            let divElement = document.createElement('div');
            let radioElement = document.createElement('input');
            let labelElement = document.createElement('label');
            radioElement.setAttribute('type', 'radio');
            radioElement.setAttribute('id', fetchStorageOutput[i]);
            radioElement.setAttribute('name', 'projectNameRadio');
            radioElement.setAttribute('value', fetchStorageOutput[i]);

            labelElement.setAttribute('for', fetchStorageOutput[i]);
            labelElement.textContent = fetchStorageOutput[i];

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
            let fetchStorageOutput = fetchStorage();
            let inputElementValue = (document.querySelector('.projectListContainer > div > input:checked').value);
            let elementIndex = fetchStorageOutput.indexOf(inputElementValue);
            fetchStorageOutput.splice(elementIndex, 1);
            projectListObject.removeProjectFromList(elementIndex);
            populateStorage(fetchStorageOutput);
            displayProjectList();
        }
    })
}

function removeChildElements (parent) {
    while (parent.lastChild) parent.removeChild(parent.lastChild);
}

export {formButtonFunctionality, displayProjectList, projectListObject, deleteButtonFunctionality}