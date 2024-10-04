// To-Do class
class ToDoTask {

    constructor (title, description, dueDate, priority, notes) {
        this.title = title,
        this.description = description,
        this.dueDate = dueDate,
        this.priority = priority,
        this.notes = notes,
        this.completionStatus = false
        // implement 'checklist' later
    }

    editTask (...args) {
        this.title = args[0];
        this.description = args[1];
        this.dueDate = args[2];
        this.priority = args[3];
        this.notes = args[4];
    }

    get getTaskTitle () {
        return this.title
    }

    get getDueDate () {
        return this.dueDate
    }
    
    get values() {
        return [this.title, this.description, this.dueDate, this.priority, this.notes, this.completionStatus];
    }

    toggleCompletionStatus () {
        if (this.completionStatus) this.completionStatus = false;
        else this.completionStatus = true;
    }
}

class Project {

    constructor (projectName) {
        this.projectName = projectName,
        this.toDoList = []
    }

    get returnProjectName () {
        return this.projectName;
    }

    printValues = () => {
        console.log(this.projectName, this.toDoList.length);
        console.table(this.toDoList);
    }

    get getToDoList () {
        return this.toDoList;
    }

    addTask (title, description, dueDate, priority, notes="") {
        let task = new ToDoTask (title, description, dueDate, priority, notes);
        // console.log(`inside addTask ${task.values}`);
        this.toDoList.push(task);
    }

    deleteTask (taskIndex) {
        this.toDoList.splice(taskIndex, 1);
    }
}

class ProjectList {

    constructor () {
        this.listOfProject = [];
    }
    
    set addProjectToList (addProject) {
        this.listOfProject.push(new Project (addProject));
    }

    get projectListArray () {
        return this.listOfProject;
    }

    removeTaskFromProject (projectIndex, taskIndex) {
        this.listOfProject[projectIndex].deleteTask(taskIndex);
    }

    removeProjectFromList (value) {
        this.listOfProject.splice(value, 1);
    }

}

export {ToDoTask, Project, ProjectList}