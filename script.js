const form = document.querySelector("#treeform");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const treeData = {
        name: document.querySelector("#name"),
        height: document.querySelector("#height"),
        type: document.querySelector("#type")
    }

    fetch("http://localhost:3300/medziai", {
        method: "POST",
        headers: {
            "Content-Type": "aplication/json"
        },
        body: JSON.stringify(treeData)
    })
        .then((response) => response.json())
        .then((resp) => { form.reset() })
        .then((err) => { console.log(err) });
});