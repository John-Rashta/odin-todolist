import setupData from "./data.js";



function pageLoad() {

    localStorage.clear();
    const localData = setupData();
    localData.newProject("family");
    localData.newTodo({
        title: "morn",
        description: "another job",
        date: "15-12-2024",
        time: "15:00",
        priority: "3",
        notes: ""
    }, "Family")

    localData.editTodo({
        oldName: "morn",
        title: "morn",
        description: "maybe not today",
        date: "15-12-2024",
        time: "15:00",
        priority: "3",
        notes: ""
    }, "Family")

    localData.checkTodo("morn", "Family");
    localData.prioTodo("morn", "5", "Family");

    
}

pageLoad();





