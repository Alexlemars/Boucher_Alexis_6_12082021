// lightbox pour montrer les image en plus grand et les faire defiller
class Lightbox {
	static init() {
		const gallerySection = document.querySelector(".photographer-page__gallery");
		const links = Array.from(gallerySection.querySelectorAll('img[src$=".jpg"],source[src$=".mp4"]'));
		const gallery = links.map((link) => link.getAttribute("src"));
		links.forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				new Lightbox(e.currentTarget.getAttribute("src"), gallery);
				document.querySelector(".lightbox__close").focus()
				document.querySelector("lightbox__previous")
				document.querySelector("lightbox__next")

			});
			link.addEventListener("keyup", (e) => {
				if (e.keyCode === 13) {
					e.preventDefault();
					new Lightbox(e.currentTarget.getAttribute("src"), gallery);
					document.querySelector(".lightbox__close").focus()
					document.querySelector("lightbox__previous")
					document.querySelector("lightbox__next")
				} else {
					return;
				}
			});
		});
	}


	constructor(url, gallery, alt) {
		this.element = this.buildDOM(url, alt);
		this.gallery = gallery;
		this.loadMedia(url, alt, gallery);
		this.formatSrcForMediaLightbox(url);
		this.onKeyUp = this.onKeyUp.bind(this);
		document.body.appendChild(this.element);
		document.addEventListener("keyup", this.onKeyUp);
	}

	formatSrcForMediaLightbox(src) {
		let lightboxMediaLink = src.split("/");
		lightboxMediaLink.splice(4, 0, "lightbox");
		const formatedLightboxMediaLink = lightboxMediaLink.join("/");
		return formatedLightboxMediaLink;
	}


	loadMedia(url, alt) {
		this.url = url;
		this.alt = alt;
		if (url.endsWith(".mp4")) {
			const video = document.createElement("video");
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML += this.getFormatedTitle(url);
			container.innerHTML = "";
			container.appendChild(video);
			container.appendChild(legend);
			video.setAttribute("controls", "");
			video.src = url;
		} else if (url.endsWith(".jpg")) {
			const image = new Image();
			const container = this.element.querySelector(".lightbox__container");
			const legend = document.createElement("p");
			legend.innerHTML += this.getFormatedTitle(url);
			container.innerHTML = "";
			container.appendChild(image);
			container.appendChild(legend);
			image.alt = this.getFormatedTitle(url);
			image.src = this.formatSrcForMediaLightbox(url);
			image.classList.add("lightbox__container__img");
		}
	}

	// retourne le titre basé sur la source

	getFormatedTitle(path) {
		const splitedPath = path.split("/");
		const string = splitedPath[splitedPath.length - 1].split(".")[0];
		const formatedTitle = string.replaceAll("_", " ");
		return formatedTitle;
	}

	//Defiller avec le clavier

	onKeyUp(e) {
		if (e.key === "Escape") {
			this.close(e);
		} else if (e.key === "ArrowRight") {
			this.next(e);
		} else if (e.key === "ArrowLeft") {
			this.previous(e);
		}
	}

	// fermer la lightbox
	close(e) {
		e.preventDefault();
		this.element.classList.add("fadeOut");
		window.setTimeout(() => {
			this.element.parentElement.removeChild(this.element);
		}, 500);
		document.removeEventListener("keyup", this.onKeyUp);
	}

	//faire defiler pour le prochain media
	next(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === this.gallery.length - 1) {
			i = -1;
		}
		this.loadMedia(this.gallery[i + 1]);
	}

	//faire defiler pour le precedent media
	previous(e) {
		e.preventDefault();
		let i = this.gallery.findIndex((image) => image === this.url);
		if (i === 0) {
			i = this.gallery.length;
		}
		this.loadMedia(this.gallery[i - 1]);
	}

	// retourn les elements HTML
	buildDOM() {
		const dom = document.createElement("div");
		dom.classList.add("lightbox");
		dom.innerHTML = `
    <button class="lightbox__close" aria-label="Fermer la visualition du média"><i class="fas fa-times"></i></button>
    <button class="lightbox__previous" aria-label="Image précédente"><i class="fas fa-chevron-left"></i></button>
    <button class="lightbox__next" aria-label="Image suivante"><i class="fas fa-chevron-right"></i></button>
    <div class="lightbox__container" role="dialog" aria-label="">
    <p class="lightbox__container__img-title"></p>
    </div>`;
		dom.querySelector(".lightbox__close").addEventListener("click", this.close.bind(this));
		dom.querySelector(".lightbox__next").addEventListener("click", this.next.bind(this));
		dom.querySelector(".lightbox__previous").addEventListener("click", this.previous.bind(this));
		return dom;
	}
}
