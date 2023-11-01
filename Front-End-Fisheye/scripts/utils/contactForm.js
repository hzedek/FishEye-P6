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
