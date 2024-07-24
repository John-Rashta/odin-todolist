function createChecklist(value) {

    let checklist = value === "true";
    
    function getCheck() {
        return this.checklist;
    
    }
    function toggleCheck() {

        this.checklist = !this.checklist;

    } 

    return {getCheck, toggleCheck, checklist}
}


function createTitle(value) {

    return {title: value}
}

function createDescription(value) {

    return {description: value}
}

function createDate(value) {

    return {dueDate: value}
}

function createPriority(value)  {

    let priority = Number(value);

    function getPriority() {

        return this.priority;
    }
    function changePriority(value) {

        this.priority = Number(value);

    } 

    return {getPriority, changePriority, priority}
}

function createNotes(value) {

    return {notes: value}
}

function createProject(value) {

    let project = value;

    function getProject() {

        return this.project;


    }
    return {project, getProject}


}



export default function createTodo(form) {

    return {
        ...createChecklist(form.checklist),
        ...createTitle(form.title),
        ...createDescription(form.description),
        ...createDate(form.dueDate),
        ...createPriority(form.priority),
        ...createNotes(form.notes),
        ...createProject(form.project)
    }
}