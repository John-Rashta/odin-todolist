function getStorage() {
    if (localStorage.length === 0) {
        return [{
            name: "Default",
            todos: []
        }];
    }
    let storage = [];
    let keys = Object.keys(localStorage);
    
    for (let key of keys) {

        const project = JSON.parse(localStorage.getItem(key));
        storage.push(project);


    }

    return storage;
}


function saveStorage(project) {

    const jsonProject = JSON.stringify(project);
    localStorage.setItem(project.name, jsonProject);
}

export {getStorage, saveStorage};