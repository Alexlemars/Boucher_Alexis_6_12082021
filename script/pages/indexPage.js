//fetchAppi

	const getData = async () =>
	await fetch("./photographers.json")
		.then((res) => res.json())
		.catch((err) => console.log("", err));
 
//update et création d'une section pour les photographes avec le header des photographes
const displayData = async (photographers) => {
	const element = document.querySelector(".photographer__section");
	element.innerHTML = "";
	photographers.forEach((photographer) => {
		let photographerModel = new Photographer(photographer);
		element.innerHTML += photographerModel.userCard;
	});
};


//filtre des photographes avec les tags (sort)

const filterByTag = (tag, photographers) => {
		return photographers.filter((photographer) => photographer.tags.includes(tag));
	
};

//Fonction  pour l'affichage des photographes
const init = async () => {
	const $filterList = document.querySelector(".header__filters__navigation");
	const $tags = $filterList.querySelectorAll("li");
	const { photographers } = await getData();
	$tags.forEach((tag) => {
		tag.addEventListener("click", function () {
			const filteredPhotographers = filterByTag(
				tag.textContent.replace(/(\s|\#)+/g, "").toLowerCase(),
				photographers
			);
			displayData(filteredPhotographers);
		});
		tag.addEventListener("keypress", function (e) {
			if (e.key === "Enter") {
				const filteredPhotographers = filterByTag(
					tag.textContent.replace(/(\s|\#)+/g, "").toLowerCase(),
					photographers
				);
				displayData(filteredPhotographers);
			}
		});
	});
	displayData(photographers);
};

init();
