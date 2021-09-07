const $elementGallery = document.querySelector(".photographer-page__gallery");

//dropdown menu personaliser

window.onload = () =>{
	const selectDiv = document.querySelector(".photographer-page__dropdown-menu-newselect")
	const selectItem = document.querySelector(".photographer-page__dropdown-menu-item")
	const chevronDown = document.querySelector(".fa-chevron-down");

	

	selectDiv.addEventListener("click",function(e){
		e.stopPropagation
		selectItem.classList.toggle("photographer-page__dropdown-menu-item-none")
		chevronDown.classList.toggle("fa-chevron-up")
	})


}

//filtre de la galerie photos avec un selecteur de parametres

const date = document.querySelector('.photographer-page__dropdown-menu-date')



const filterByOption = (mediaGallery,option) => {

	switch (option) {
		case "Popularité":
			return mediaGallery.sort((a, b) => {
				return b.likes - a.likes;
			});
		case "Date":
			return mediaGallery.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});
		case "Titre":
			return mediaGallery.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return mediaGallery.sort((a, b) => {
				return b.likes - a.likes;
			});
	}
};


//Afficher les données du photographeur, sur la base de son ID
 

async function displayPhotographerData() {
	const { media, photographers } = await getData();
	const params = new URLSearchParams(document.location.search.substring(1));
	const identifier = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id == identifier
	);
	const PhotographerConstructor = new Photographer(selectedPhotographerData);
	PhotographerConstructor.updateDocumentTitle;

	const mediaGallery = media.filter((media) => media.photographerId == identifier);

	updateMediaGallery(mediaGallery);





	const selectItem = document.querySelector(".photographer-page__dropdown-menu-item")
	const selectDiv = document.querySelector(".photographer-page__dropdown-menu-newselect")
	const chevronDown = document.querySelector(".fa-chevron-down");

	selectItem.addEventListener('click',function(e){
		$elementGallery.innerHTML = "";
		const option = filterByOption(mediaGallery, e.target.innerHTML);
		selectDiv.innerHTML = e.target.innerHTML;
		selectItem.classList.toggle("photographer-page__dropdown-menu-item-none")
		chevronDown.classList.toggle("fa-chevron-up")
		updateMediaGallery(option);
		Lightbox.init()
		getAndUpdateLikes()
	})


	const $photographerHeader = document.querySelector(".photographer-page__header-section");
	const $photographerFooter = document.querySelector(".photographer-page__footer-section");
	$photographerHeader.innerHTML += new Photographer(selectedPhotographerData).userHeader;
	$photographerFooter.innerHTML += new Photographer(selectedPhotographerData).userFooter;
}

// mise a jour de la galery 

function updateMediaGallery(gallery) {
	gallery.forEach((media) => {
		let medias = new MediaFactory(media);
		$elementGallery.innerHTML += medias.createHtml();
	});
}

//function pour les likes 

function getAndUpdateLikes() {
	const $likesSection = document.querySelectorAll(
		".photographer-page__gallery__media__footer__like-section"
	);

	function reloadLikes() {
		let $likeCounter = document.querySelector('.photographer-page__footer__aside__total-likes')
		let $totalLikesElements = document.querySelectorAll(
			".photographer-page__gallery__media__footer__like-section-counter"
		);
		let likeSum = 0
		$totalLikesElements.forEach(function (like) {
			let likeUnit = Number(like.textContent)
			likeSum += likeUnit
		});
		$likeCounter.innerHTML = likeSum
		return likeSum
	}


	//boucle pour les likes (j'aime ou je n'aime pas)
	$likesSection.forEach(function (i) {
		i.addEventListener("click", function () {
			let elementCounter = i.querySelector(
				".photographer-page__gallery__media__footer__like-section-counter"
			);
			let button = i.querySelector('.photographer-page__gallery__media__footer__like-section-button')
			let iconButton = i.querySelector(".fa-heart");
			let likeSum = Number(elementCounter.textContent);
			const liked = i.dataset.liked === "true";
			i.dataset.liked = !liked;
			elementCounter.innerHTML = likeSum + (!liked ? 1 : -1);
			if (liked) {
				reloadLikes();
				iconButton.classList.add("far");
				iconButton.classList.remove("fas");
				button.ariaLabel = "J'aime pas"
			} else if (!liked) {
				reloadLikes();
				iconButton.classList.add("fas");
				iconButton.classList.remove("far");
				button.ariaLabel = "J'aime"
			}
		});
	});
}

// fonction pour initialise la page
const init = async () => {
	await displayPhotographerData();
	getAndUpdateLikes();
	Lightbox.init();
};

init();
