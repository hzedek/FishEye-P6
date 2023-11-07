const modal = document.getElementById("contact_modal");
const modalbg = document.querySelector(".bground");
const p = document.createElement("p");

function displayModal() {
	modal.style.display = "block";
    modalbg.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
    modalbg.style.display = "none";
}
const modalbtn = document.getElementById("contact_button");
const getValue = document.querySelectorAll(".getValue");
const form = document.querySelector("form");


modalbtn.addEventListener("click", (event) => {
    event.preventDefault();
    for (let x = 0; x < getValue.length; x++) {
        const element = getValue[x];
        let values = element.value.trim();
        if (values.length <2) {
            p.textContent += "veuillez remplir le champ "+element.name;
            form.appendChild(p);
        }
        }
    
})

