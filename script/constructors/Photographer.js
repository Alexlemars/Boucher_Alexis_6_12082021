class Photographer {

    constructor(data, likes) {
        this._id = data.id
        this._city = data.city
        this._country = data.country
        this._name = data.name
        this._picture = data.portrait
        this._price = data.price
        this._tagline = data.tagline
        this._tags = data.tags
        this._totalLikes = likes
    }
    //lien vers image de profil du photographe
    get picture() {
        return `/assets/photographers/${this._picture}`
    }

    //localisation du photographe
    get localization() {
        return `${this._city}, ${this._country}`
    }
    
    //Obtenir le nom du photographe pour changer le titre de la page
    get updateDocumentTitle() {
        document.title += ` - ${this._name}`
    }

    //creation de presention du photographe(nom,photo...)
    get userCard() {
        return `
            <a href="pages/photographer-page.html?id=${this._id}" tabindex="10" class="focus__element" aria-label="Aller sur la page de ${this._name} basé à ${this.localization} sont tarif journalier est de ${this._price} euro par jour. Sa spécialité est ${this._tags} et sa devise ${this._tagline}" >
                <article class="photographer">
                    <img class="photographer__img" src="${this.picture}" alt="Photographie de profil de ${this._name}">
                    <h2 class="photographer__name">${this._name}</h2>
                    <p class="photographer__localization">${this.localization}</p>
                    <p class="photographer__tagline">${this._tagline}</p>
                    <p class="photographer__price">${this._price}€/jour</p>
                    <ul class="photographer__taglist">${this._tags.map(tag => `<li class="photographer__tag">#${tag}</li>`).join('')}</ul>
                </article>
            </a>`
    }

    // creation du header du photographe dans cette page
     
    get userHeader() {
       return  `
       <div class="photographer-page__header">
            <div class="photographer-page__header__content">
                <h1 class="photographer-page__header__content__title">${this._name}</h1>
                <p class="photographer-page__header__content__localization">${this.localization}</p>
                <p class="photographer-page__header__content__tagline">${this._tagline}</p>
                <ul class="photographer-page__header__content__taglist">${this._tags.map(tag => `<li href="../index.html" class="photographer-page__header__content__tags">#${tag}</li>`).join(" ")}</ul>
            </div>
            <button class="photographer-page__contact__button focus__element-secondary" tabindex="3" onclick="displayPhotographerModale()" aria-label="Contacter le photographe ${this._name}">Contactez-moi
            </button>
            <img src="${this.picture}" class="photographer-page__header__photo" alt="Photographie de profil de ${this._name}">
        </div> 
        `
    }

    //creation du footer dansd cette page
    get userFooter() {
        return `
        <section class="photographer-page__footer">
            <aside class="photographer-page__footer__aside">
            <p class="photographer-page__footer__aside__total-likes" aria-label="Nombre total de j'aime ${this.userReloadLikes}" tabindex="6">${this.userReloadLikes}</p>
            <i class="fas fa-heart" aria-hidden="true"></i>
            </aside>
            <p class="photographer-page__footer__price" tabindex="7" aria-label="Tarif du photographe ${this._price} euro par jour">${this._price}€/jour</p>
        </section>
        `
    }

    //fonction pour compter le nombre de likes sur la page des photographes
      
    get userReloadLikes() {
		let $totalLikesElements = document.querySelectorAll(
			".photographer-page__gallery__media__footer__like-section-counter"
		);
		let likeSum = 0;
		$totalLikesElements.forEach(function (like) {
			let likeUnit = Number(like.textContent)
			likeSum += likeUnit
		});
		return likeSum
	}           
}