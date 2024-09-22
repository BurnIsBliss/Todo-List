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
        console.log(args);
        this.title = args[0];
        this.description = args[1];
        this.dueDate = args[2];
        this.priority = args[3];
        this.notes = args[4];
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

    printValues = () => {
        console.log(this.projectName, this.toDoList.length);
        console.table(this.toDoList);
    }

    getToDoList () {
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
        this.listOfProject.push(addProject);
    }

    get projectListArray () {
        return this.listOfProject;
    }

}

export {ToDoTask, Project, ProjectList}