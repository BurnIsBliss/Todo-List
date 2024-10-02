import  {Project, ProjectList} from "./classModule"
import "./styles.css"
import {formButtonFunctionality, displayProjectList, projectListObject, deleteButtonFunctionality} from "./domManipulationModule";
import { initializeProjectsFromSessionStorage } from "./webStorageAPI";

// const project_1 = new Project ('Default Project');
// projectListObject.addProjectToList = project_1;
// project_1.addTask('title#1', 'Desc', 'DueDate', 'Priority');
// let projectArr = project_1.getToDoList();
// console.log(projectArr.length)
// console.log(projectArr[0].values);
// projectArr[0].editTask('title#3', 'Asc', '', 'Priority123', 'new note');
// console.log(`After: ${projectArr[0].values}`);

// for (let i in projectListObject.projectListArray) {
//     console.log(projectListObject.projectListArray[i]);
// }

initializeProjectsFromSessionStorage();
formButtonFunctionality();
displayProjectList();
deleteButtonFunctionality();