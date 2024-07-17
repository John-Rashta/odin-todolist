function createChecklist(value) {

    let checklist = Boolean(value);

    getCheck = () => checklist;
    toggleCheck = () => checklist = !checklist;

    return {getCheck, toggleCheck}
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

    return {priority: Number(value)}
}

function createNotes(value) {

    return {notes: value}
}



function createTodo(form) {

    return {
        ...createChecklist(form.get("checklist")),
        ...createTitle(form.get("title")),
        ...createDescription(form.get("description")),
        ...createDate(`${form.get("date")} ${form.get("time")}`),
        ...createPriority(form.get("priority")),
        ...createNotes(form.get("notes"))
    }
}