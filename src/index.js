import setupData from "./data.js";
import "../assets/styles/styles.css";
import setupDom from "./dom.js";
import { compareAsc, format } from "date-fns";



function pageLoad() {

    localStorage.clear();
    const localData = setupData();
    const localDom = setupDom(localData.getSetup());

    document.querySelector("body").addEventListener("click", (event) => {

        if (event.target.classList.contains("newProject") || event.target.parentNode.classList.contains("newProject")) {

            localDom.newProjectForm();

        }

        else if (event.target.classList.contains("addProject")) {

            event.preventDefault();
            const formData = new FormData(event.target.parentNode);
            const projName = formData.get("name");
            const capitalizedName = localData.newProject(projName);
            localDom.addProject(capitalizedName);
            localDom.deleteForm();

        }

        else if (event.target.classList.contains("selectProject")) {

            localDom.loadProject(localData.getProject(event.target.textContent));
        }

        else if (event.target.classList.contains("newTask") || event.target.parentNode.classList.contains("newTask")) {

            localDom.openModal();

            
        }


        else if (event.target.id === "submitTodo") {

            event.preventDefault();
            const formData = new FormData(event.target.parentNode);
            const newTodo = localData.newTodo({
                title: formData.get("title"),
                description: formData.get("description"),
                date: formData.get("date"),
                time: formData.get("time"),
                priority: formData.get("priority"),
                notes: formData.get("notes"),
                project: localDom.getProjName()


            });
            localDom.loadTodo(newTodo);
            localDom.closeModal();


        }

        else if (event.target.classList.contains("checkBox")) {

            localData.checkTodo(localDom.getTodoName(event.target), localDom.getTodoProject(event.target));
            localDom.changeCheck(event.target);
            
        }


        else if (event.target.classList.contains("todoDiv") && !event.target.classList.contains("expanded") && !event.target.classList.contains("selectMenu") ||
            event.target.parentNode.classList.contains("todoDiv") && !event.target.parentNode.classList.contains("expanded") && !event.target.classList.contains("selectMenu") ||
            event.target.parentNode.parentNode.classList.contains("todoDiv") && !event.target.parentNode.parentNode.classList.contains("expanded") && !event.target.classList.contains("selectMenu")) {

                const oldTodo = localData.getTodo(localDom.getTodoProject(event.target), localDom.getTodoName(event.target));
                localDom.expandTodo(localDom.getToDiv(event.target), oldTodo);


            }

        
        else if (event.target.classList.contains("delete")) {

            
            localData.deleteTodo(localDom.getTodoName(event.target), localDom.getTodoProject(event.target));
            localDom.deleteTodo(localDom.getToDiv(event.target));


        }

        else if (event.target.classList.contains("edit")) {

            localDom.allowEdit(localDom.getToDiv(event.target), event.target);
        }

        else if (event.target.classList.contains("shorten")) {

            
            localDom.shortenTodo(localDom.getToDiv(event.target));


        }

        else if (event.target.classList.contains("saveTodo")) {

            

            const editTodo = localDom.getTodoInfo(localDom.getToDiv(event.target));
            const newTodo  = localData.editTodo(editTodo);
            localDom.editTodo(localDom.getToDiv(event.target), newTodo);
            


        } else if (event.target.classList.contains("home")) {

            localDom.loadProject(localData.getDefault());
        } else if (event.target.classList.contains("deleteProject") || event.target.parentNode.classList.contains("deleteProject")) {

            localData.deleteProject(localDom.getProjName());
            localDom.deleteProjSidebar(localDom.getProjName());
            localDom.loadProject(localData.getDefault());
        }

    })

    document.querySelector(".todoMain").addEventListener("change", (event) => {

        if (event.target.classList.contains("selectMenu")) {

            localData.prioTodo(localDom.getTodoName(event.target), localDom.todoColor(event.target), localDom.getTodoProject(event.target));
        }
    })
    
}

pageLoad();





