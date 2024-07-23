function getStorage() {
    if (localStorage.length === 0) {
        const store = {
            name: "Default",
            todos: []
        };

        localStorage.setItem(store.name, JSON.stringify(store));
        return [store];
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

function deleteStorage(project) {

    localStorage.removeItem(project);
}

export {getStorage, saveStorage, deleteStorage};