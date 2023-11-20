const modal = document.getElementById("contact_modal");
const modalbg = document.querySelector(".bground");
const modalbtn = document.getElementById("contact_button");
const getValue = document.querySelectorAll(".getValue");
const form = document.querySelector("form");

const p = document.createElement("p");

function displayModal(event) {
	modal.style.display = "block";
    modalbg.style.display = "block";
    document.getElementById('first').focus();
}
function closeModal() {
    modal.style.display = "none";
    modalbg.style.display = "none";
}

modalbtn.addEventListener("click", (event) => {
    event.preventDefault();
    for (let x = 0; x < getValue.length; x++) {
        const element = getValue[x];
        let values = element.value.trim();
        if (values.length <2) {
            p.textContent += "veuillez remplir le champ "+element.name;
        }
        else{
            console.log(element.value);
        }
        }
    
})

modalbtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        for (let x = 0; x < form.elements.length; x++) {
            const element = form.elements[x];
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                element.value = element.value.trim();
                if (element.value.length < 2) {
                    alert("Veuillez remplir le champ " + element.name);
                    element.focus();
                    return;
                }
                console.log(element.value);
            }
        }
    }
});