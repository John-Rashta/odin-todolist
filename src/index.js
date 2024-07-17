import createTodo from "./todo.js";
import { getProjects,saveProject } from "./storage.js";


function pageLoad() {

    const localData = getProjects();

    for (proj of localData) {

        for (todo of proj["todos"]) {

            if (todo) {

                todo = createTodo(todo);

            }

        }
    }
    
}




