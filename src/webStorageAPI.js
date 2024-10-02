import { projectListObject } from "./domManipulationModule";

function populateStorage (value) {
    sessionStorage.setItem("projectList", JSON.stringify(value));
}

function fetchStorage () {
    return JSON.parse((sessionStorage.getItem("projectList")));
}

function initializeProjectsFromSessionStorage() {
    if (fetchStorage()) {
        let storageValue = fetchStorage();
        for (let i in storageValue) {
            projectListObject.addProjectToList = storageValue[i].projectName;
            for (let j in storageValue[i].toDoList) {
                projectListObject.projectListArray[i].addTask(storageValue[i].toDoList[j].title, storageValue[i].toDoList[j].description, storageValue[i].toDoList[j].dueDate, storageValue[i].toDoList[j].priority, storageValue[i].toDoList[j].notes);
            }
        }
        console.log(projectListObject, typeof(projectListObject));
    }
}

export {populateStorage, fetchStorage, initializeProjectsFromSessionStorage}