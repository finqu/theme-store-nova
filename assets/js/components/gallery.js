import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css'
export default class Gallery {

	constructor(el) {

		this.pswp = null;
		this.el = el;
		this.imgPreload = true;
		this.opts = {
            bgOpacity: 0.85,
            allowPanToNext: false,
            returnFocus: false,
            loop: false,
			showHideAnimationType: 'none',
			dataSource: [],
			mouseMovePan: true,
			initialZoomLevel: 'fit',
			secondaryZoomLevel: 1.5,
			maxZoomLevel: 1,
			pswpModule: () => import('photoswipe')
        };

		this.initialize();
	}

	initialize() {

		this.addDomItems().then(() => {

			if (this.opts.dataSource.length) {

				this.opts.dataSource.sort((a, b) => a.index - b.index);

				this.el.querySelectorAll('[data-gallery-init]').forEach(galleryItemContainerEl => {
					
					galleryItemContainerEl.addEventListener('click', () => {

						let galleryItemEl = galleryItemContainerEl.closest('.gallery-item');
						let parentEl = galleryItemEl.parentElement;

						if (!parentEl && galleryItemContainerEl.parentElement.classList.contains('gallery-item')) {	
							galleryItemEl = galleryItemContainerEl.parentElement;
							parentEl = galleryItemEl.parentElement;
						}

						const parentElIndex = [].slice.call(parentEl.children).indexOf(galleryItemEl);

						this.init(parentElIndex);
					});
				});
			}
		});
	}

	addDomItems() {

		const galleryItemEls = this.el.querySelectorAll('.gallery-item');
		const maxLoadIndex = galleryItemEls.length;
		let itemsToLoad =  maxLoadIndex;
		let loadIndex = 0;

		return new Promise((resolve, reject) => {

			if (galleryItemEls.length) {

				galleryItemEls.forEach((galleryItemEl, i) => {

					const galleryImgSrcEl = galleryItemEl.querySelector('[data-gallery-img-src]');
					const galleryVideoSrcEl = galleryItemEl.querySelector('[data-gallery-video-src]');

					if (this.imgPreload && galleryImgSrcEl) {

						const src = galleryImgSrcEl.dataset.galleryImgSrc;
						let img = new Image();

						img.onload = () => {

							itemsToLoad--;
							loadIndex++;

							this.opts.dataSource.push({
								index: i,
				                src: src,
				                width: img.width,
				                height: img.height
				            });

				            if (itemsToLoad === 0) {

				            	resolve();

				            } else if (itemsToLoad > 0 && loadIndex === maxLoadIndex) {

				            	reject();
				            }
						}

						img.src = src;

					} else if (galleryImgSrcEl) {

						itemsToLoad--;
						loadIndex++;

						this.opts.dataSource.push({
							index: i,
			                src: galleryImgSrcEl.dataset.galleryImgSrc,
			                width: galleryImgSrcEl.dataset.galleryImgWidth,
			                height: galleryImgSrcEl.dataset.galleryImgHeight
			            });

			            if (itemsToLoad === 0) {

			            	resolve();

			            } else if (itemsToLoad > 0 && loadIndex === maxLoadIndex) {

			            	reject();
			            }

					} else if (galleryVideoSrcEl) {

						itemsToLoad--;
						loadIndex++;

						this.opts.dataSource.push({
							index: i,
			                html: `
			                	<div class="pswp__video-container">
			                		<div class="pswp__video-aspect-ratio-container">
				                		<iframe class="pswp__video" src="${galleryVideoSrcEl.dataset.galleryVideoSrc}" width="960" height="640" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
				                		</div>
			                	</div>
			                `
			            });

			            if (itemsToLoad === 0) {

			            	resolve();

			            } else if (itemsToLoad > 0 && loadIndex === maxLoadIndex) {

			            	reject();
			            }
					}
				});

			} else {

				resolve();
			}
		});
	}

	prev() {
		this.pswp.prev();
	}

	next() {
		this.pswp.next();
	}

	close() {
		this.pswp.close();
	}

	init(index) {
		this.pswp = new PhotoSwipeLightbox(this.opts);
        this.pswp.init();
		this.pswp.loadAndOpen(index);
	}
}