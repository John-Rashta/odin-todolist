function createChecklist(value) {

    let checklist = Boolean(value);

    const getCheck = () => checklist;
    const toggleCheck = () => checklist = !checklist;

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

    const getPriority = () => priority;
    const changePriority = (value) => priority = Number(value);

    return {getPriority, changePriority, priority}
}

function createNotes(value) {

    return {notes: value}
}



export default function createTodo(form) {

    return {
        ...createChecklist(form.checklist),
        ...createTitle(form.title),
        ...createDescription(form.description),
        ...createDate(form.dueDate),
        ...createPriority(form.priority),
        ...createNotes(form.notes)
    }
}