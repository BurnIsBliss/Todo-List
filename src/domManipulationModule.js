function formButtonFunctionality () {
    const addProjectButton = document.querySelector('#addProject');
    addProjectButton.addEventListener("click", () => {
        document.querySelector('.projectModal').showModal();
    })
}

export {formButtonFunctionality}