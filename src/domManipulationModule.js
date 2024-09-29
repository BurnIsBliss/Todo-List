import {populateStorage, fetchStorage} from "./webStorageAPI";

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

    submitButton.addEventListener("click", () => {
        let projectNameValue = document.querySelector('#name_of_project').value;
        if (projectNameValue) {
            document.querySelector('.projectModal').close();
            populateStorage(projectNameValue);
        }
        document.querySelector('.projectModal > form').reset();
    })
}

function displayProjectList () {
    const projectListContainer = document.querySelector('.projectListContainer');
    if (fetchStorage()) {
        for (let i in fetchStorage()) {
            let divElement = document.createElement('div');
            divElement.textContent = i;
            projectListContainer.appendChild(divElement);
        }
    }
}

export {formButtonFunctionality, displayProjectList}