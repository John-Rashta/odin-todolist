import createTodo from "./todo.js";
import { getStorage, saveStorage, deleteStorage } from "./storage.js";


export default function setupData() {

    const [localData, storeKeys] = getStorage();

    for (let proj of localData) {

        for (let todo of proj["todos"]) {

            if (todo) {

                todo = createTodo(todo);

            }

        }
    }

    function newProject(projectName) {

        const tempProject = {
            name: projectName[0].toUpperCase() + projectName.slice(1),
            todos: [

            ]
        }

        localData.push(tempProject);
        saveStorage(tempProject);




    }

    function newTodo(data, projName) {

        
        const tempTodo = {
            checklist: "false",
            title: data.title,
            description: data.description,
            dueDate: `${data.date} ${data.time}`,
            priority: data.priority,
            notes: data.notes,
            
        }

        const newTodo = createTodo(tempTodo);

        for (let proj of localData) {

            if (proj["name"] === projName) {

                proj["todos"].push(newTodo);
                saveStorage(proj);
                break;
            }
        }


        return newTodo;

    }

    function editTodo(data, projName)  {

        for (let proj of localData) {

            if (proj["name"] === projName) {

                for (let todo of proj["todos"]) {

                    if (todo["title"] === data.oldName) {

                        todo.title = data.title;
                        todo.description = data.description;
                        todo.dueDate = data.dueDate;
                        todo.changePriority(data.priority);
                        todo.notes = data.notes;
                        break;
                        
                    }
                }

                saveStorage(proj);
                break;
            }
        }


    }

    function checkTodo(todoTitle, projName) {

        for (let proj of localData) {

            if (proj["name"] === projName) {

                for (let todo of proj["todos"]) {

                    if (todo["title"] === todoTitle) {
                        
                        
                        todo.toggleCheck();
                        break;

                    }
                }

            saveStorage(proj);
            break;
            }
        }
    }

    function prioTodo(todoTitle, newPrio, projName) {

        for (let proj of localData) {

            if (proj["name"] === projName) {

                for (let todo of proj["todos"]) {

                    if (todo["title"] === todoTitle) {
                        
                        todo.changePriority(newPrio);
                        break;

                    }
                }

            saveStorage(proj);
            break;
            }
        }
    }

    function getSetup() {

        return {
            Default: localData[0],
            Projects: storeKeys
        }
    }

    function deleteProject(projectName) {

        for (let key in localData) {

            if (localData[key].name === projectName) {

                localData.splice(key, 1);
                deleteStorage(projectName);
                return;


            }
        }

       



    }

    function deleteTodo(todoTitle, projName) {


        for (let proj of localData) {

            if (proj["name"] === projName) {

                for (let todo in proj["todos"]) {

                    if (proj["todos"][todo].title === todoTitle) {

                        proj["todos"].splice(todo, 1);
                        break;
                        
                    }
                }

                saveStorage(proj);
                break;
            }
        }




    }


    return {
        newTodo, 
        prioTodo, 
        checkTodo, 
        newProject, 
        editTodo, 
        getSetup, 
        deleteProject, 
        deleteTodo
    }

}



