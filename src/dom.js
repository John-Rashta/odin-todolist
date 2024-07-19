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

        const newDiv = document.createElement("div");
        newDiv.textContent = key;
        projDiv.appendChild(newDiv);
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

        
        const newDiv = document.createElement("div");
        const upperDiv = document.createElement("div");
        upperDiv.classList.toggle("todoTop");
        const check = document.createElement("div");
        check.classList.toggle("checkBox");
        const titleDiv = document.createElement("div");
        titleDiv.textContent = key.title;
        const dateDiv = document.createElement("div");
        dateDiv.textContent = key.dueDate;
        upperDiv.appendChild(check);
        upperDiv.appendChild(titleDiv);
        upperDiv.appendChild(dateDiv);
        newDiv.appendChild(upperDiv);
        todoContainer.appendChild(newDiv);

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



}