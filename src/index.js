import  {Project, ProjectList} from "./classModule"
import "./styles.css"
import {formButtonFunctionality, displayProjectList, projectListObject, deleteButtonFunctionality, displayTasksFromProjectList} from "./domManipulationModule";
import { initializeProjectsFromSessionStorage, populateStorage, fetchStorage } from "./webStorageAPI";

initializeProjectsFromSessionStorage();

// implement 'Default Project' to session storage and projectListObject
if (!fetchStorage().length) {
    projectListObject.addProjectToList='Default Project';
    populateStorage(projectListObject.projectListArray);
}

formButtonFunctionality();
displayProjectList();
deleteButtonFunctionality();
displayTasksFromProjectList();