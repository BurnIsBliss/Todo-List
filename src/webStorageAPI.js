function populateStorage (value) {
    if (Array.isArray(value)) {
        sessionStorage.setItem("projectList", JSON.stringify(value));
    }
    else {
        let arrayValue = fetchStorage();
        if (!arrayValue) {
            arrayValue=[value]; 
        }
        else {
            arrayValue.push(value);
        }
        sessionStorage.setItem("projectList", JSON.stringify(arrayValue));
    }
}

function fetchStorage () {
    return JSON.parse((sessionStorage.getItem("projectList")));
}

export {populateStorage, fetchStorage}