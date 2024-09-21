// To-Do class
class ToDoTask {
    constructor (title, description, dueDate, priority, notes="") {
        title,
        description,
        dueDate,
        priority,
        notes
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
}

export {ToDoTask, Project}