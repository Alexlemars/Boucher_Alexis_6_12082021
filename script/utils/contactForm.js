//element du DOM 
async function displayPhotographerModale() {
	const modal = document.getElementById("contact__modal");
	const btn = document.querySelector(".photographer-page__contact__button");
	const span = document.getElementsByClassName("close")[0];
	const firstNameInput = document.getElementById("firstname");
	const lastNameInput = document.getElementById("lastname");
	const emailInput = document.getElementById("email");
	const messageInput = document.getElementById("message");
	const submitButton = document.getElementById("form-submit-button");

  // ouvre la modale quand utilisateur appuis sur le bouton

	btn.onclick = function () {
		modal.style.display = "block";
	};

	// ferme la modale quand l'utilisateur appuis sur le boutton
	span.onclick = function () {
		modal.style.display = "none";
	};

	// ferme la modale si l'utilisateur clique n'importe ou a l'exterieur de la modal
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};

	// ecoute si la touche du clavier et toucher il ferme la modal
	document.addEventListener('keydown', function(e) {
		let keyCode = e.key;
		if (keyCode === "Escape") {
				modal.style.display = "none";
		}
});
	// envoie le formulaire et le ferme 
	if (submitButton) {
		submitButton.addEventListener("click", function (event) {
			event.preventDefault();
			console.log(
				`L'utilisateur ${firstNameInput.value} ${lastNameInput.value} avec l'adresse mail suivante ${emailInput.value} vous adresse le message suivant : ${messageInput.value}`
			);
			modal.style.display = "none";
		});
	}
}