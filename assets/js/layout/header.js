export default function() {
    
    const containerEl = document.querySelector('.section-site-header');

    const initMobileNavigation = () => {

        const siteMobileHeaderContainerEl = containerEl.querySelector('.site-mobile-header-container');
        const siteMobileNavigationContainerEl = containerEl.querySelector('.site-mobile-navigation-container');
        const siteMobileNavigationToggleEl = containerEl.querySelector('.site-mobile-navigation-toggle');
        const siteMobileNavigationOverlayEl = containerEl.querySelector('.site-mobile-navigation-overlay');
        const siteMobileNavigationLayerChildEls = containerEl.querySelectorAll('.site-mobile-navigation-layer-child');
        const siteMobileNavigationShowLayerEls = containerEl.querySelectorAll('[name="site-mobile-navigation-show-layer"]');
        const siteMobileNavigationHideLayerEls = containerEl.querySelectorAll('[name="site-mobile-navigation-hide-layer"]');
        const siteMobileHeaderScrollDownClass = 'site-mobile-header-container-hide';
        let lastScroll = 0;
        let currentScroll = 0;

        const openMobileNavigation = () => {

            if (siteMobileNavigationContainerEl.classList.contains('site-mobile-navigation-visible')) {
                return;
            }

            let offset = siteMobileHeaderContainerEl.getBoundingClientRect().height;

            if (siteMobileHeaderContainerEl.getBoundingClientRect().top > 0) {
                offset += siteMobileHeaderContainerEl.getBoundingClientRect().top;
            };

            siteMobileNavigationContainerEl.style.top = Math.round(offset - 1)+'px';
            siteMobileNavigationContainerEl.style.setProperty('--site-mobile-navigation-container-height', Math.ceil(window.innerHeight - offset + 1)+'px');

            siteMobileNavigationContainerEl.classList.add('site-mobile-navigation-visible');
            siteMobileNavigationContainerEl.classList.add('site-mobile-navigation-active');
            
            if (siteMobileNavigationOverlayEl) {
                siteMobileNavigationOverlayEl.classList.add('site-mobile-navigation-overlay-visible');
            }

            siteMobileNavigationToggleEl.querySelectorAll('svg').forEach((el) => {
                el.classList.toggle('d-none')
            });
            
            document.body.classList.add('disable-scroll');
        };

        const closeMobileNavigation = () => {

            if (!siteMobileNavigationContainerEl.classList.contains('site-mobile-navigation-visible')) {
                return;
            }

            siteMobileNavigationContainerEl.classList.remove('site-mobile-navigation-active');

            if (siteMobileNavigationOverlayEl) {
                siteMobileNavigationOverlayEl.classList.remove('site-mobile-navigation-overlay-visible');
            }

            siteMobileNavigationToggleEl.querySelectorAll('svg').forEach((el) => {
                el.classList.toggle('d-none')
            });

            document.body.classList.remove('disable-scroll');
        };

        window.addEventListener('scroll', () => {

            currentScroll = window.scrollY;

            if (currentScroll <= 200) {
                return;
            }

            if (currentScroll > lastScroll && !siteMobileHeaderContainerEl.classList.contains(siteMobileHeaderScrollDownClass)) {

                siteMobileHeaderContainerEl.classList.add(siteMobileHeaderScrollDownClass);
                closeMobileNavigation();

            } else if (currentScroll < lastScroll && siteMobileHeaderContainerEl.classList.contains(siteMobileHeaderScrollDownClass)) {

                siteMobileHeaderContainerEl.classList.remove(siteMobileHeaderScrollDownClass);
            }

            lastScroll = currentScroll;
        });

        siteMobileNavigationLayerChildEls.forEach(el => { el.addEventListener('transitionend', (e) => {

            e.preventDefault();

            if (!el.classList.contains('site-mobile-navigation-layer-active')) {
                el.classList.remove('site-mobile-navigation-layer-visible');
            }
        })});

        siteMobileNavigationShowLayerEls.forEach(el => { el.addEventListener('click', (e) => {

            const id = e.target.value;
            const navigationLayerEl = containerEl.querySelector('.site-mobile-navigation-layer[data-mobile-navigation-layer-id="'+id+'"]');

            navigationLayerEl.classList.add('site-mobile-navigation-layer-visible');
            navigationLayerEl.classList.add('site-mobile-navigation-layer-active');
        })});

        siteMobileNavigationHideLayerEls.forEach(el => { el.addEventListener('click', (e) => {

            const id = e.target.value;
            const navigationLayerEl = containerEl.querySelector('.site-mobile-navigation-layer[data-mobile-navigation-layer-id="'+id+'"]');

            navigationLayerEl.classList.remove('site-mobile-navigation-layer-active');
        })});

        siteMobileNavigationToggleEl.addEventListener('click', (e) => {

            if (siteMobileNavigationContainerEl.classList.contains('site-mobile-navigation-visible')) {
                closeMobileNavigation();
            } else {
                openMobileNavigation();
            }
        });

        if (siteMobileNavigationOverlayEl) {

            siteMobileNavigationOverlayEl.addEventListener('click', (e) => {

                siteMobileNavigationContainerEl.classList.remove('site-mobile-navigation-active');
                siteMobileNavigationOverlayEl.classList.remove('site-mobile-navigation-overlay-visible');

                document.body.classList.remove('disable-scroll');
            });
        }

        siteMobileNavigationContainerEl.addEventListener('transitionend', e => {

            e.preventDefault();

            if (!siteMobileNavigationContainerEl.classList.contains('site-mobile-navigation-active')) {
                siteMobileNavigationContainerEl.classList.remove('site-mobile-navigation-visible');
            }
        });
    }

    const initCart = () => {

        if (theme.store.cart.styleVariant === '2') {

            const siteHeaderItemCartEl = containerEl.querySelector('.site-header-item-cart');
            const siteHeaderCartContainerEl = containerEl.querySelector('.site-header-cart-mini-container');
            const siteHeaderCartEl = containerEl.querySelector('[data-cart-mini-container]');
            const delay = 500;
            let delayTimer = null;

            siteHeaderCartContainerEl.style.top = siteHeaderItemCartEl.offsetTop + siteHeaderItemCartEl.clientHeight + 20 + 'px';

            siteHeaderItemCartEl.addEventListener('mouseenter', e => {

                siteHeaderItemCartEl.classList.add('cart-mini-expanded');
                siteHeaderCartEl.classList.add('cart-mini-expanded');

                if (delayTimer) {
                    clearTimeout(delayTimer);
                }
            });

            siteHeaderCartContainerEl.addEventListener('mouseenter', e => {

                siteHeaderItemCartEl.classList.add('cart-mini-expanded');
                siteHeaderCartEl.classList.add('cart-mini-expanded');

                if (delayTimer) {
                    clearTimeout(delayTimer);
                }
            });

            siteHeaderItemCartEl.addEventListener('mouseleave', e => {

                delayTimer = setTimeout(() => {
                    siteHeaderItemCartEl.classList.remove('cart-mini-expanded');
                    siteHeaderCartEl.classList.remove('cart-mini-expanded');
                }, delay);
            });

            siteHeaderCartContainerEl.addEventListener('mouseleave', e => {

                delayTimer = setTimeout(() => {
                    siteHeaderItemCartEl.classList.remove('cart-mini-expanded');
                    siteHeaderCartEl.classList.remove('cart-mini-expanded');
                }, delay);
            });

        } else if (theme.store.cart.styleVariant === '3') {

            const siteHeaderItemCartEl = containerEl.querySelector('.site-header-item-cart');
            const siteHeaderCartContainerEl = containerEl.querySelector('.site-header-cart-offcanvas-container');
            const siteHeaderCartOverlayEl = containerEl.querySelector('.site-header-cart-offcanvas-overlay');

            siteHeaderItemCartEl.addEventListener('click', (e) => {

                e.preventDefault();

                siteHeaderCartContainerEl.classList.add('site-header-cart-offcanvas-visible');
                siteHeaderCartOverlayEl.classList.add('site-header-cart-offcanvas-overlay-visible');
    
                document.body.classList.add('disable-scroll');
            });
    
            siteHeaderCartOverlayEl.addEventListener('click', (e) => {
    
                siteHeaderCartContainerEl.classList.remove('site-header-cart-offcanvas-visible');
                siteHeaderCartOverlayEl.classList.remove('site-header-cart-offcanvas-overlay-visible');
    
                document.body.classList.remove('disable-scroll');
            });

            document.addEventListener('theme:cart:render', () => {

                const cartOffcanvasHideEl = document.querySelector('[data-cart-offcanvas-hide]');
                
                if (cartOffcanvasHideEl) {

                    cartOffcanvasHideEl.addEventListener('click', (e) => {
        
                        siteHeaderCartContainerEl.classList.remove('site-header-cart-offcanvas-visible');
                        siteHeaderCartOverlayEl.classList.remove('site-header-cart-offcanvas-overlay-visible');
            
                        document.body.classList.remove('disable-scroll');
                    });
                }

            }, false);
        }
    }

    const initSearch = () => {

        const siteSearchEls = containerEl.querySelectorAll('.site-search');
        const siteHeaderSearchToggleEls = containerEl.querySelectorAll('.site-search-toggle');
        const siteHeaderSearchContainerEl = containerEl.querySelector('.site-search-container');
        const siteHeaderSearchInputEl = siteHeaderSearchContainerEl.querySelector('[name="q"]');
        const siteSearchResultsTemplate = theme.hbs.compile(document.querySelector('#hbs-site-search-results').innerHTML);
        const siteSearchNoResultsTemplate = theme.hbs.compile(document.querySelector('#hbs-site-search-no-results').innerHTML);

        const search = (siteSearchEl, siteSearchResultsEl, q) => {

            if (!q) {

                siteSearchEl.classList.remove('active');

                if (document.body.classList.contains('site-search-autocomplete-visible')) {
                    document.body.classList.remove('site-search-autocomplete-visible');
                }

                siteSearchResultsEl.innerHTML = '';

                return;
            }

            if (theme.store.accessibility.showSearchAutocomplete) {

                fetch('/api/search/suggest?q='+q)
                    .then(res => res.json())
                    .then(data => {

                        siteSearchEl.classList.add('active');
                        document.body.classList.add('site-search-autocomplete-visible');

                        if (data.length) {

                            if (siteSearchResultsTemplate) {
                                siteSearchResultsEl.innerHTML = siteSearchResultsTemplate({
                                    results: data
                                });
                            }

                        } else {

                            if (siteSearchResultsTemplate) {
                                siteSearchResultsEl.innerHTML = siteSearchNoResultsTemplate();
                            }
                        }

                        document.dispatchEvent(new CustomEvent('theme:search', {
                            detail: {
                                query: q,
                                items: data
                            }
                        }))
                    });
                
            } else {

                document.dispatchEvent(new CustomEvent('theme:search', {
                    detail: {
                        query: q
                    }
                }));
            }
        }

        siteSearchEls.forEach(el => {

            const siteSearchQueryEl = el.querySelector('input[name="q"]');
            const siteSearchResultsEl = el.querySelector('.site-search-results');
            const siteSearchResetEl = el.querySelector('button[type="reset"]');

            if (siteSearchResetEl) {

                siteSearchResetEl.addEventListener('click', () => {

                    if (!siteSearchQueryEl.value && siteHeaderSearchContainerEl.classList.contains('site-search-active')) {

                        const searchOverlayEl = document.querySelector('#search-overlay');

                        if (el.classList.contains('active')) {
                            el.classList.remove('active');
                        }
                        
                        if (document.body.classList.contains('site-search-autocomplete-visible')) {
                            document.body.classList.remove('site-search-autocomplete-visible');
                        }

                        if (searchOverlayEl) {

                            searchOverlayEl.click();

                        } else {
                            
                            theme.utils.animate(siteHeaderSearchContainerEl, 'fadeOutUp').then(() => {
                                siteHeaderSearchContainerEl.classList.remove('site-search-active');
                            });
                        }
                        
                    } else {

                        search(el, siteSearchResultsEl, null);
                    }
                }, false);
            }

            siteSearchQueryEl.addEventListener('input', theme.utils.debounce((e) => {
                search(el, siteSearchResultsEl, e.target.value);
            }, 300, false));

            if (theme.store.accessibility.showSearchAutocomplete) {

                siteSearchQueryEl.addEventListener('click', (e) => {

                    if (siteSearchQueryEl.value && siteSearchResultsEl.hasChildNodes() && theme.store.accessibility.showSearchAutocomplete) {

                        el.classList.add('active');
                        document.body.classList.add('site-search-autocomplete-visible');
                    }
                }, false);

                document.addEventListener('click', (e) => {
                    
                    if (el.classList.contains('active') && !el.contains(e.target) && el !== e.target) {

                        el.classList.remove('active');

                        if (document.body.classList.contains('site-search-autocomplete-visible')) {
                            document.body.classList.remove('site-search-autocomplete-visible');
                        }
                    }
                });
            }
        });

        siteHeaderSearchToggleEls.forEach(el => { el.addEventListener('click', e => {

            if (siteHeaderSearchContainerEl.classList.contains('site-search-active')) {

                const searchOverlayEl = document.querySelector('#search-overlay');

                if (searchOverlayEl) {
                    searchOverlayEl.click();
                }
                
                return;
            }

            siteHeaderSearchContainerEl.classList.add('site-search-active');

            theme.utils.animate(siteHeaderSearchContainerEl, 'fadeInDown');

            const searchOverlayEl = document.createElement('div');

            searchOverlayEl.id = 'search-overlay';
            searchOverlayEl.class = 'd-none';

            document.body.appendChild(searchOverlayEl);

            theme.utils.animate(searchOverlayEl, 'fadeIn');
            siteHeaderSearchInputEl.focus();

            searchOverlayEl.addEventListener('click', e => {

                if (!siteHeaderSearchContainerEl.contains(e.target) && siteHeaderSearchContainerEl !== e.target) {

                    theme.utils.animate(siteHeaderSearchContainerEl, 'fadeOutUp').then(() => {
                        siteHeaderSearchContainerEl.classList.remove('site-search-active');
                    });

                    theme.utils.animate(searchOverlayEl, 'fadeOut').then(() => {
                        searchOverlayEl.remove();
                    });
                }
            });
        })});
    };

    const initNavigation = () => {

        const siteHeaderContainerEl = containerEl.querySelector('.site-header-container');
        const siteHeaderMenuItemEls = containerEl.querySelectorAll('.site-header-menu-item');
        const submenuCloseDelay = 500;
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        const siteHeaderScrollDownClass = 'site-header-container-hide';
        const siteHeaderScrollVisibleClass = 'site-header-container-show';
        let lastScroll = 0;

        window.addEventListener('scroll', () => {

            const currentScroll = window.scrollY;

            if (currentScroll <= 200) {

                if (siteHeaderContainerEl.classList.contains(siteHeaderScrollVisibleClass)) {
                    siteHeaderContainerEl.classList.remove(siteHeaderScrollVisibleClass);
                    containerEl.style.zIndex = null;
                }

                return;
            }

            if (currentScroll > lastScroll && !siteHeaderContainerEl.classList.contains(siteHeaderScrollDownClass)) {

                siteHeaderContainerEl.classList.add(siteHeaderScrollDownClass);
                siteHeaderContainerEl.classList.remove(siteHeaderScrollVisibleClass);

                setTimeout(() => {
                    containerEl.style.zIndex = -1;
                }, 500);

            } else if (currentScroll < lastScroll && siteHeaderContainerEl.classList.contains(siteHeaderScrollDownClass)) {

                siteHeaderContainerEl.classList.remove(siteHeaderScrollDownClass);
                siteHeaderContainerEl.classList.add(siteHeaderScrollVisibleClass);
                containerEl.style.zIndex = null;
            }

            lastScroll = currentScroll;
        });

        siteHeaderMenuItemEls.forEach(el => {

            const menuItemEl = el;
            const submenuId = el.dataset.headerMenuChildId;

            if (submenuId) {

                const submenuEl = containerEl.querySelector('.site-header-submenu[data-header-submenu-id="'+submenuId+'"]');

                if (submenuEl) {    

                    const isMegamenu = submenuEl.classList.contains('is-megamenu');
                    let closeHandleTimer = null;

                    const closeSubmenu = (el) => {

                        el.classList.add('site-header-submenu-recently-active');
                        el.classList.remove('site-header-submenu-active');

                        setTimeout(() => {
                            el.classList.remove('site-header-submenu-recently-active');
                        }, 100);

                        el.style.height = 0+'px';

                        closeHandleTimer = null;

                        if (isTouchDevice) {
                            menuItemEl.classList.remove('site-header-menu-item-clicked');
                        }
                    };

                    const openEventHandler = (e) => {

                        if ((e.target.isEqualNode(submenuEl) || e.target.isEqualNode(menuItemEl)) && closeHandleTimer !== null) {
                            clearTimeout(closeHandleTimer);
                        }

                        const activeSubmenus = containerEl.querySelectorAll('.site-header-submenu-active');

                        if (activeSubmenus.length) {

                            activeSubmenus.forEach(el => {

                                if (!el.isEqualNode(submenuEl)) {

                                    el.classList.remove('site-header-submenu-active');

                                    closeSubmenu(el);
                                }
                            });
                        }

                        if (!isMegamenu) {

                            const submenuWidth = submenuEl.querySelector('.site-header-submenu-item').getBoundingClientRect().width;
                            const bodyPosRight = document.body.getBoundingClientRect().right;
                            let submenuPosLeft = menuItemEl.getBoundingClientRect().left;
                            const submenuPosRight = submenuPosLeft + submenuWidth;

                            if (submenuPosRight > bodyPosRight) {
                                submenuPosLeft = submenuPosLeft - (submenuPosRight - bodyPosRight);
                            }

                            submenuEl.style.left = submenuPosLeft+'px';
                            submenuEl.style.right = 'auto';
                        }

                        submenuEl.classList.add('site-header-submenu-active');
                        submenuEl.style.height = submenuEl.scrollHeight+'px';
                    };

                    const closeEventHandler = (e) => {

                        closeHandleTimer = setTimeout(() => {

                            if (submenuEl.classList.contains('site-header-submenu-active')) {
                                closeSubmenu(submenuEl);
                            }

                        }, submenuCloseDelay);
                    };

                    const touchClickEventHandler = (e) => {

                        if (!menuItemEl.classList.contains('site-header-menu-item-clicked')) {

                            e.preventDefault();

                            menuItemEl.classList.add('site-header-menu-item-clicked');

                        } else {

                            menuItemEl.classList.remove('site-header-menu-item-clicked');
                        }
                    };

                    menuItemEl.addEventListener('mouseenter', openEventHandler);
                    menuItemEl.addEventListener('mouseleave', closeEventHandler);

                    if (isTouchDevice) {
                        menuItemEl.querySelector('.site-header-menu-item-text').addEventListener('click', touchClickEventHandler);
                    }

                    submenuEl.addEventListener('mouseenter', openEventHandler);
                    submenuEl.addEventListener('mouseleave', closeEventHandler);
                }
            }
        });
    };

    if (window.innerWidth >= parseInt(theme.utils.getCssVariable('--style-grid-breakpoint-lg')), 10) {
        initCart();
    }

    if (theme.store.accessibility.showSearch) {
        initSearch();
    }

    initNavigation();
    initMobileNavigation();
}