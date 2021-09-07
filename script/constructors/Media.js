class MediaFactory {

	constructor(data) {
		if (data.type === "image") {
			return new Photography(data);
		} else if (data.type === "video") {
			return new Video(data);
		} else {
			throw "Unknown Media Type";
		}
	}
}

class Photography {
// constructor des photos
	constructor(data) {
		this._imgSrc = data.image;
		this._imgAlt = data.description;
		this._imgTitle = data.title;
		this._imgPhotographerId = data.photographerId;
		this._imgLikes = data.likes;
	}

	
	createHtml() {
		return `
        <figure class="photographer-page__gallery__card" aria-label="${this._imgTitle} ">
            <img class="photographer-page__gallery__media focus__element-secondary" loading="lazy" tabindex="5" src="../assets/medias/${this._imgPhotographerId}/${this._imgSrc}" alt="${this._imgAlt}" />
            <footer class="photographer-page__gallery__media__footer">
                <figcaption class="photographer-page__gallery__media__footer__figcaption">${this._imgTitle}</figcaption>
                <div class="photographer-page__gallery__media__footer__like-section">
                    <p class="photographer-page__gallery__media__footer__like-section-counter">${this._imgLikes}</p>
                    <button class="photographer-page__gallery__media__footer__like-section-button focus__element-secondary" title="J'aime" tabindex="5" aria-label="Ajouter un j'aime"><i class="far fa-heart" aria-hidden="true"></i></button>
                </div>
            </footer>
        </figure>
        `;
	}
}

class Video {
//Constructor des videos
	constructor(data) {
		this._videoSrc = data.video;
		this._videoTitle = data.title;
		this._videoPhotographerId = data.photographerId;
		this._videoLikes = data.likes;
	}


	createHtml() {
		return `
        <figure class="photographer-page__gallery__card" aria-label = "${this._videoTitle}">
            <video controls class="photographer-page__gallery__media focus__element-secondary" tabindex="5">
                <source src="../assets/medias/${this._videoPhotographerId}/${this._videoSrc}"/>
            </video>
            <footer class="photographer-page__gallery__media__footer">
                <figcaption class="photographer-page__gallery__media__footer__figcaption">${this._videoTitle}</figcaption>
                <aside class="photographer-page__gallery__media__footer__like-section">
                    <p class="photographer-page__gallery__media__footer__like-section-counter">${this._videoLikes}</p>
                    <button class="photographer-page__gallery__media__footer__like-section-button focus__element-secondary" tabindex="5"><i class="far fa-heart" aria-hidden="true"></i></button>
                </aside>
            </footer>
        </figure>
        `;
	}
}
