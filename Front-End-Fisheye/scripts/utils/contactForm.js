const modal = document.getElementById("contact_modal");
const modalbg = document.querySelector(".bground");

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


modalbtn.addEventListener("click", (event) => {
    event.preventDefault();
    for (let x = 0; x < getValue.length; x++) {
        const element = getValue[x];
        let values = element.value.trim();
        if (values.length <2) {
            console.log(element.value,"not good");
            console.log(element.name);
        }
        }
    
})

