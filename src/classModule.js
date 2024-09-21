// To-Do class
class ToDoTask {
    constructor (title, description, dueDate, priority, notes="") {
        title,
        description,
        dueDate,
        priority,
        notes
        // implement checklist later
    }

    editTask (...args) {
        console.log(args);
        for (let i in args) {
            if (args[i] === "") continue;
            else this.args[i] = args[i];
        }
    }

    get values() {
        return [this.title, this.description, this.dueDate, this.priority, this.notes];
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

    addTask (title, description, dueDate, priority, notes) {
        let task = new ToDoTask (title, description, dueDate, priority, notes);
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