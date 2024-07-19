import setupData from "./data.js";
import "../assets/styles/styles.css";
import setupDom from "./dom.js";
import { compareAsc, format } from "date-fns";



function pageLoad() {

    localStorage.clear();
    const localData = setupData();
    
    
    localData.newProject("family");
    localData.newProject("work");
    localData.newProject("vacation");
    localData.newTodo({
        title: "morn",
        description: "another job",
        date: "2024-12-15",
        time: "15:00",
        priority: "3",
        notes: ""
    }, "Default")

    localData.newTodo({
        title: "goren",
        description: "maybe not today",
        date: "2024-12-12",
        time: "12:00",
        priority: "3",
        notes: ""
    }, "Default")

    
    
    let newTemp = (a, b) => compareAsc(a.dueDate, b.dueDate);
    const newPro = localData.getProject("Default")["todos"].sort(sortByDate);
    console.log(newPro);


    function sortByDate(a, b) {

        return compareAsc(a.dueDate, b.dueDate);


    }
    


    
    
   
    
    const localDom = setupDom(localData.getSetup());
    
}

pageLoad();





