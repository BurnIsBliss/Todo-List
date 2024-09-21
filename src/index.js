import {ToDoTask, Project, ProjectList} from "./classModule"
import "./styles.css"

const projectListObject = new ProjectList;
projectListObject.addProjectToList = new Project ('Default Project');


for (let i in projectListObject.projectListArray) {
    console.log(projectListObject.projectListArray[i]);
}