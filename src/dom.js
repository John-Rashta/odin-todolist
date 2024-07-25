import plusOnly from "../assets/img/plus.svg";
import plusBox from "../assets/img/plus-box.svg";
import { compareDesc} from "date-fns";


export default function setupDom({Default, Projects}) {

    const currentKeys = Projects;
    currentKeys.shift();
    const baseLine = document.querySelector(".content");
    const sideBar = document.createElement("div");
    sideBar.classList.toggle("sidebar");
    const header = document.createElement("div");
    header.classList.toggle("mainHeader");
    const mainBody = document.createElement("div");
    mainBody.classList.toggle("mainBody");
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
    const newProjMain = document.createElement("div");
    newProjMain.classList.toggle("newProjMain");
    

    newProjDiv.appendChild(newProjIcon);
    newProjDiv.appendChild(newProjText);

    newProjMain.appendChild(newProjDiv);


    sideBar.appendChild(homeDiv);
    sideBar.appendChild(newProjMain);

    const projHead = document.createElement("div");
    projHead.textContent = "Projects";
    projHead.classList.toggle("projHead");
    sideBar.appendChild(projHead);


    const projDiv = document.createElement("div");
    projDiv.classList.toggle("projContainer");

    for (let key of currentKeys) {

        addProject(key);
    }

    sideBar.appendChild(projDiv);

    const headerDiv = document.createElement("div");
    headerDiv.textContent = "Todo-List";
    header.appendChild(headerDiv);


    const loadTitle = document.createElement("div");
    loadTitle.textContent = "Default";
    const todoContainer = document.createElement("div");
    todoContainer.classList.toggle("todoMain");
    const topContainer = document.createElement("div");
    topContainer.classList.toggle("mainTop");
    topContainer.appendChild(loadTitle);
    topContainer.appendChild(todoContainer);
    mainBody.appendChild(topContainer);

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

    const endDiv = document.createElement("div");
    endDiv.classList.toggle("endDiv");
    endDiv.appendChild(newTaskDiv);

    mainBody.appendChild(endDiv);


    function loadProject(proj) {

        while (todoContainer.firstChild) {

            todoContainer.removeChild(todoContainer.firstChild);
        }

        loadTitle.textContent = proj["name"];

        for (let key of proj["todos"]) {

        
            loadTodo(key);
    
        }

        while (endDiv.children.length > 1) {

            endDiv.removeChild(endDiv.lastChild);
        }

        if (proj["name"] != "Default") {

            const delProj = document.createElement("div");
            delProj.textContent = "Delete Project";
            delProj.classList.toggle("deleteProject");
            endDiv.appendChild(delProj);


        }




    }

    function loadTodo(todo) {

        const newDiv = document.createElement("div");
        prioColor(newDiv, todo.getPriority());
        const upperDiv = createUpperDiv(todo);
        newDiv.setAttribute("data-name", todo.title);
        newDiv.setAttribute("data-project", todo.getProject());
        newDiv.classList.toggle("todoDiv");
        newDiv.appendChild(upperDiv);
        if (todo.getCheck()) {

            newDiv.classList.toggle("todoComplete");
        }

        for (let child of todoContainer.children) {

           const innerDiv = child.children;

           for (let dateDiv of innerDiv[0].children) {

            

            if (dateDiv.classList.contains("date")) {


                if (compareDesc(todo.dueDate, dateDiv.textContent) > 0) {

                    todoContainer.insertBefore(newDiv, child);
                    return;


                }


            }
           }
        }
        todoContainer.appendChild(newDiv);


    }

    function addProject(projName) {

        const newDiv = document.createElement("div");
        newDiv.textContent = projName;
        newDiv.classList.toggle("selectProject");
        projDiv.appendChild(newDiv);


    }

    function expandTodo(toDiv, todo) {

        if (toDiv.children.length > 1) {

            toDiv.removeChild(toDiv.lastChild);
        }

        const lowerDiv = document.createElement("div");
        const discDiv = document.createElement("div");
        const notesDiv = document.createElement("div");
        discDiv.textContent = todo.description;
        notesDiv.textContent = todo.notes;
        discDiv.classList.toggle("description");
        notesDiv.classList.toggle("notes");
        lowerDiv.classList.toggle("todoBot");
        lowerDiv.appendChild(discDiv);
        lowerDiv.appendChild(notesDiv);
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
        buttonDiv.classList.toggle("editDelete");
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
        const upperDiv = createUpperDiv(todo);
        toDiv.appendChild(upperDiv);
        toDiv.classList.toggle("expanded");
        expandTodo(toDiv, todo);


    }

    function allowEdit(toDiv, editButton) {

        for (let div of toDiv.children) {

            for (let child of div.children) {
            if(child.nodeName !== "BUTTON" &&
                !child.classList.contains("checkBox") &&
                !child.classList.contains("selectMenu") &&
                !child.classList.contains("editDelete") ) {

                child.contentEditable = true;
            }}

        }

        editButton.classList.toggle("edit");
        editButton.classList.toggle("saveTodo");
        editButton.textContent = "Save";




    }

    function newProjectForm() {



        if (newProjMain.children.length > 1) {

            return;

        }

        const newDiv = document.createElement("div");
        const newForm = document.createElement("form");
        const newInput = document.createElement("input");
        const newButton = document.createElement("button");
        newDiv.id = "newFormDiv";
        newForm.id = "projForm";
        newInput.setAttribute("type", "text");
        newInput.id = "newProj";
        newInput.setAttribute("name", "name");
        newButton.setAttribute("type", "submit");
        newButton.classList.toggle("addProject");
        newButton.textContent = "Add";
        newForm.appendChild(newInput);
        newForm.appendChild(newButton);
        newDiv.appendChild(newForm);
        newProjMain.appendChild(newDiv);

    }

    function deleteForm() {

        if (newProjMain.children.length > 1) {

            newProjMain.removeChild(newProjMain.lastChild);
        }
    }

    function shortenTodo(toDiv) {

        while (toDiv.children.length > 1) {

            toDiv.removeChild(toDiv.lastChild);
        }

        toDiv.classList.toggle("expanded");


    }

    function openModal() {

        const dialog = document.querySelector("dialog");
        dialog.showModal();
        
    }

    function closeModal() {

        const dialog = document.querySelector("dialog");
        dialog.close();


    }

    function getProjName() {

        return loadTitle.textContent;
    }

    function getTodoName(targetDiv) {

        if (targetDiv.dataset.name) {

            return targetDiv.dataset.name;
        } else if (targetDiv.parentNode.dataset.name) {

           
            return targetDiv.parentNode.dataset.name;
        } else if (targetDiv.parentNode.parentNode.dataset.name) {

            
            return targetDiv.parentNode.parentNode.dataset.name;
        } else if (targetDiv.parentNode.parentNode.parentNode.dataset.name) {

            return targetDiv.parentNode.parentNode.parentNode.dataset.name;
        }
    }

    function changeCheck(targetDiv) {

        targetDiv.classList.toggle("checked");
        getToDiv(targetDiv).classList.toggle("todoComplete");
    }

    function getToDiv(targetDiv) {

        if (targetDiv.dataset.name) {

            return targetDiv;
        } else if (targetDiv.parentNode.dataset.name) {

            return targetDiv.parentNode;
        } else if (targetDiv.parentNode.parentNode.dataset.name) {

            return targetDiv.parentNode.parentNode;
        } else if (targetDiv.parentNode.parentNode.parentNode.dataset.name) {

            return targetDiv.parentNode.parentNode.parentNode;
        }


    }

    function getTodoInfo(targetDiv) {

        

        const children = targetDiv.children;
        const info = {oldName : targetDiv.dataset.name,
                      project : targetDiv.dataset.project
        };

        for (let child of children) {
            

            for (let input of child.children) {

            switch(input.classList[0]) {

                case "title":
                    info["title"] = input.textContent;
                    break;


                case "description":

                    info["description"] = input.textContent;
                    break;

                case "date":
                    info["dueDate"] = input.textContent;
                    break;
                
                case "notes": 
                    info["notes"] = input.textContent;
                    break;
            }
        }}

        
        return info;


    }

    function prioColor(toDiv, prio) {

        const prioClass = ["prioOne", "prioTwo", "prioThree", "prioFour", "prioFive"];

        toDiv.classList.remove(...prioClass);

        switch(prio) {

            case "1":
            case 1:
                toDiv.classList.toggle(prioClass[0]);
                break;
                

            case "2":
            case 2:
                toDiv.classList.toggle(prioClass[1]);
                break;

            case "3":
            case 3:
                toDiv.classList.toggle(prioClass[2]);
                break;

            case "4":
            case 4:
                toDiv.classList.toggle(prioClass[3]);
                break;

            case "5":
            case 5:
                toDiv.classList.toggle(prioClass[4]);
                break;
        }

    }

    function todoColor(selectDiv) {

        const parentDiv = getToDiv(selectDiv);
        const newPrio = selectDiv.options[event.target.selectedIndex].value;
        prioColor(parentDiv, newPrio);
        prioColor(selectDiv, newPrio);
        return newPrio;



    }

    function getTodoProject(toDiv) {

        const parentDiv = getToDiv(toDiv);

        return parentDiv.dataset.project;
    }

    function deleteProjSidebar(projName) {

        for (let child of projDiv.children) {

            if (child.textContent === projName) {

                projDiv.removeChild(child);
            }
        }
    }

    function createUpperDiv(todo) {


        
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
        titleDiv.classList.toggle("title");
        dateDiv.classList.toggle("date");

        const selectDiv = document.createElement("select");
        selectDiv.classList.toggle("selectMenu");
        selectDiv.setAttribute("name", "selectPriority");
        for (let i = 1; i < 6; i++) {

            const newDiv = document.createElement("option");
            newDiv.setAttribute("value", i);
            newDiv.textContent = i;
            if (i === todo.getPriority()) {

                newDiv.setAttribute("selected", "");
                prioColor(selectDiv, i);
                
            }
            prioColor(newDiv, i);
            selectDiv.appendChild(newDiv);
        }



       
        upperDiv.appendChild(check);
        upperDiv.appendChild(titleDiv);
        upperDiv.appendChild(dateDiv);
        upperDiv.appendChild(selectDiv);
        
        return upperDiv;


    }



    return {
        shortenTodo,
        deleteForm,
        newProjectForm,
        allowEdit,
        editTodo,
        deleteTodo,
        expandTodo,
        addProject,
        loadTodo,
        loadProject,
        openModal,
        closeModal,
        getProjName,
        getTodoName,
        changeCheck,
        getToDiv,
        getTodoInfo,
        todoColor,
        getTodoProject,
        deleteProjSidebar
    }



}