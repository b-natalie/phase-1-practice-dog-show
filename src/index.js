document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        data.forEach(renderDogInfo)
    });
})

function renderDogInfo(dog) {
    const tableBody = document.getElementById("table-body");
    const newRow = document.createElement("tr");
    tableBody.appendChild(newRow);
    
    const newName = document.createElement("td");
    newName.textContent = dog.name;
    newRow.appendChild(newName);

    const newBreed = document.createElement("td");
    newBreed.textContent = dog.breed;
    newRow.appendChild(newBreed);

    const newSex = document.createElement("td");
    newSex.textContent = dog.sex;
    newRow.appendChild(newSex);

    const newEditBtn = document.createElement("button");
    newEditBtn.textContent = "Edit";
    newRow.appendChild(newEditBtn);
    newEditBtn.addEventListener("click", event => {
        updateDogDetails(dog);
    })
}

function updateDogDetails(dog) {
    // gather new data submitted by the user
    const form = document.querySelector("#dog-form");
    const inputs = form.getElementsByTagName("input");
    inputs[0].value = dog.name;
    inputs[1].value = dog.breed;
    inputs[2].value = dog.sex;
    const updateId = dog.id;

    // update data on server and re-render
    form.addEventListener("submit", event => {
        event.preventDefault();
        // update
        fetch(`http://localhost:3000/dogs/${updateId}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                name: inputs[0].value,
                breed: inputs[1].value,
                sex: inputs[2].value,
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        // remove old data and re-render table
        removeOldData();
        fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            data.forEach(renderDogInfo);
        })
        form.reset();
    })
}

function removeOldData() {
    const tableBody = document.getElementById("table-body");
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
}
