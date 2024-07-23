import plusOnly from "../assets/img/plus.svg";
import plusBox from "../assets/img/plus-box.svg";


export default function setupDom({Default, Projects}) {

    const currentKeys = Projects;
    currentKeys.shift();
    const baseLine = document.querySelector(".content");
    const sideBar = document.createElement("div");
    sideBar.classList.toggle("sidebar");
    const header = document.createElement("div");
    const mainBody = document.createElement("div");
    baseLine.appendChild(sideBar);
    baseLine.appendChild(header);
    baseLine.appendChild(mainBody);

    const homeDiv = document.createElement("div");
    homeDiv.textContent = "Home";
    homeDiv.classList.toggle("home");
    

    const newProjDiv = document.createElement("div");
    const newProjIcon = new Image();
    newProjIcon.src = plusBox;
    const newProjText = document.createElement("div");
    newProjText.textContent = "New Project";
    newProjDiv.classList.toggle("newProject");
    

    newProjDiv.appendChild(newProjIcon);
    newProjDiv.appendChild(newProjText);


    sideBar.appendChild(homeDiv);
    sideBar.appendChild(newProjDiv);

    const projHead = document.createElement("div");
    projHead.textContent = "Projects";
    sideBar.appendChild(projHead);


    const projDiv = document.createElement("div");
    projDiv.classList.toggle("projContainer");

    for (let key of currentKeys) {

        addProject(key);
    }

    sideBar.appendChild(projDiv);

    const headerDiv = document.createElement("div");
    header.textContent = "Todo-List";
    header.appendChild(headerDiv);


    const loadTitle = document.createElement("div");
    loadTitle.textContent = "Default";
    const todoContainer = document.createElement("div");
    mainBody.appendChild(loadTitle);
    mainBody.appendChild(todoContainer);

    for (let key of Default["todos"]) {

        
        loadTodo(key);

    }

    const newTaskDiv = document.createElement("div");
    newTaskDiv.classList.toggle("newTask");
    const newTaskIcon = new Image();
    newTaskIcon.src = plusOnly;
    const newTaskText = document.createElement("div");
    newTaskText.textContent = "New Task";
    newTaskDiv.appendChild(newTaskIcon);
    newTaskDiv.appendChild(newTaskText);
    mainBody.appendChild(newTaskDiv);


    function loadProject(proj) {

        while (todoContainer.firstChild) {

            todoContainer.removeChild(todoContainer.firstChild);
        }

        loadTitle.textContent = proj["name"];

        for (let key of proj["todos"]) {

        
            loadTodo(key);
    
        }




    }

    function loadTodo(todo) {

        const newDiv = document.createElement("div");
        const upperDiv = document.createElement("div");
        upperDiv.classList.toggle("todoTop");
        const check = document.createElement("div");
        check.classList.toggle("checkBox");

        if (todo.getCheck()) {

            check.classList.toggle("checked");
        }

        const titleDiv = document.createElement("div");
        titleDiv.textContent = todo.title;
        const dateDiv = document.createElement("div");
        dateDiv.textContent = todo.dueDate;
        upperDiv.appendChild(check);
        upperDiv.appendChild(titleDiv);
        upperDiv.appendChild(dateDiv);
        newDiv.appendChild(upperDiv);
        todoContainer.appendChild(newDiv);


    }

    function addProject(projName) {

        const newDiv = document.createElement("div");
        newDiv.textContent = projName;
        projDiv.appendChild(newDiv);


    }

    function expandTodo(toDiv, todo) {

        if (toDiv.children.length > 1) {

            toDiv.removeChild(toDiv.lastChild);
        }

        const lowerDiv = document.createElement("div");
        const discDiv = document.createElement("div");
        const notesDiv = document.createElement("div");
        const prioDiv = document.createElement("div");
        discDiv.textContent = todo.description;
        notesDiv.textContent = todo.notes;
        prioDiv.textContent = todo.getPriority();
        lowerDiv.appendChild(discDiv);
        lowerDiv.appendChild(notesDiv);
        lowerDiv.appendChild(prioDiv);
        toDiv.appendChild(lowerDiv);

        const bottomDiv = document.createElement("div");
        const shortButton = document.createElement("button");
        const buttonDiv = document.createElement("div");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        shortButton.classList.toggle("shorten");
        editButton.classList.toggle("edit");
        deleteButton.classList.toggle("delete");
        bottomDiv.classList.toggle("buttonsDiv");
        shortButton.textContent = "^";
        editButton.textContent = "Edit";
        deleteButton.textContent = "Delete";
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(deleteButton);
        bottomDiv.appendChild(shortButton);
        bottomDiv.appendChild(buttonDiv);
        toDiv.appendChild(bottomDiv);



        toDiv.classList.toggle("expanded");

        




    }

    function deleteTodo(toDiv) {

        toDiv.parentNode.removeChild(toDiv);

    }

    function editTodo(toDiv, todo) {

        while (toDiv.firstChild) {

            toDiv.removeChild(toDiv.firstChild);
        }
        const upperDiv = document.createElement("div");
        upperDiv.classList.toggle("todoTop");
        const check = document.createElement("div");
        check.classList.toggle("checkBox");
        if (todo.getCheck()) {

            check.classList.toggle("checked");
        }
        const titleDiv = document.createElement("div");
        titleDiv.textContent = todo.title;
        const dateDiv = document.createElement("div");
        dateDiv.textContent = todo.dueDate;
        upperDiv.appendChild(check);
        upperDiv.appendChild(titleDiv);
        upperDiv.appendChild(dateDiv);
        toDiv.appendChild(upperDiv);
        expandTodo(toDiv, todo);


    }

    function allowEdit(toDiv, editButton) {

        for (let child of toDiv.children) {

            if(child.nodeName !== "BUTTON") {

                child.contentEditable = true;
            }
        }

        editButton.classList.toggle("edit");
        editButton.classList.toggle("saveTodo");
        editButton.textContent = "Save";




    }

    function newProjectForm() {

        const newDiv = document.createElement("div");
        const newForm = document.createElement("form");
        const newInput = document.createElement("input");
        const newButton = document.createElement("button");
        newDiv.id = "newFormDiv";
        newForm.id = "projForm";
        newInput.setAttribute("type", "text");
        newInput.id = "newProj";
        newInput.setAttribute("name", "newProj");
        newButton.setAttribute("type", "submit");
        newForm.appendChild(newInput);
        newForm.appendChild(newButton);
        newDiv.appendChild(newForm);
        newProjDiv.appendChild(newDiv);

    }

    function deleteForm() {

        if (newProjDiv.children.length > 2) {

            newProjDiv.removeChild(newProjDiv.lastChild);
        }
    }

    function shortenTodo(toDiv) {

        while (toDiv.children.length > 1) {

            toDiv.removeChild(toDiv.lastChild);
        }

        toDiv.classList.toggle("expanded");


    }



}