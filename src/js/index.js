import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import noUiSlider from 'nouislider';
import 'bootstrap-star-rating';
import 'select2';
import 'jquery-mousewheel';
import 'malihu-custom-scrollbar-plugin';
import 'leaflet';
import IMask from 'imask';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import '../img/eye-open.svg';
import '../img/eye-closed.svg';

const mqlMax = {
    xxxl: matchMedia('(max-width: 1769px)'),
    xxl: matchMedia('(max-width: 1365px)'),
    xl: matchMedia('(max-width: 1199px)'),
    lg: matchMedia('(max-width: 991px)'),
    md: matchMedia('(max-width: 767px)'),
    sm: matchMedia('(max-width: 575px)'),
    xs: matchMedia('(max-width: 394px)'),
}

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');


    $('.catalog-sidebar__box-body .catalog-sidebar__box-content').mCustomScrollbar({
        axis: 'y',
    });

    $('.product-cart__list').mCustomScrollbar({
        axis: 'y',
    });

    $('.scroll-js').mCustomScrollbar({
        axis: 'y',
    });


    if ($('#map').length) {
        /*delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: '../img/map-point.svg',
            iconUrl: 'img/map-point.svg',
            iconSize: 36,
            iconAnchor: [18, 48],
            shadowUrl: null,
        });*/
        const map = L.map('map');
        const mapCenter = [50.46251377176145, 30.525405151883337];
        const baseMap = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });
        // const markerMap = L.marker(mapCenter).addTo(map).bindPopup('АБУ - Вул. Набережно-хрещатицька 11, м. Київ, 03800');
        baseMap.addTo(map);
        if (map) {
            map.setView(mapCenter, 14).scrollWheelZoom.disable();
        }
    }
});

$(function () {
    let buttonToTop = $('#to_top');
    buttonToTop.on('click', function () {
        $('html, body').stop().animate({
            scrollTop: 0,
        }, 750);

        return false;
    });

    $(window).on('scroll', function () {
        let offsetTop = window.pageYOffset;
        if (offsetTop > 300) {
            buttonToTop.addClass('show');
        } else {
            buttonToTop.removeClass('show');
        }
    });

    // nav links
    (function () {
        let hiddenMenu = document.querySelector('.header-menu__nav-hidden');
        let links = document.querySelectorAll('.header-menu__nav-link');

        if (links.length) {
            for (let i = links.length; i > 0; i--) {
                let elem = links[i - 1];
                let link = document.createElement('a');
                link.setAttribute('href', elem.getAttribute('href'));
                link.classList.add('header-menu__nav-hidden-link', 'd-xxxl-none');
                link.innerText = elem.innerText;
                hiddenMenu.prepend(link);
            }
        }
    })();

    // header catalog
    (function() {
        let catalogToggle = $('.header-menu__catalog-toggle');
        let catalogClose = $('.header-menu__catalog-category-close');
        let categoryToggle = $('.header-menu__catalog-category-toggle');

        catalogToggle.on('click', function(e) {
            $(this).next().addClass('opened');
            e.stopPropagation();
        });

        catalogClose.on('click', function(e) {
            $(this).parent().removeClass('opened');
            categoryToggle.removeClass('opened');
            $('.header-menu__catalog-subcategory-wrap').stop().slideUp();
            e.stopPropagation();
        });

        categoryToggle.on('click', function(e) {
            if ($(this).hasClass('opened')) {
                $(this).toggleClass('opened').next().stop().slideToggle();
            }
            else {
                $('.header-menu__catalog-subcategory-wrap').stop().slideUp();
                $(this).toggleClass('opened').next().stop().slideToggle();
            }
            e.stopPropagation();
        });
    })();

    // catalog menu
    (function() {
        let dropdownToggle = $('.category-nav__dropdown-toggle');
        let subcategoryWrap = $('.category-nav__subcategory-wrap');

        dropdownToggle.on('click', function() {
            if ($(this).hasClass('opened')) {
                $(this).toggleClass('opened').next().stop().slideToggle();
            }
            else {
                dropdownToggle.removeClass('opened');
                subcategoryWrap.stop().slideUp();
                $(this).toggleClass('opened').next().stop().slideToggle();
            }
        });
    })();

    // Borgir button
    $('.header-menu__borgir').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $(this).next().toggleClass('show');
        $('body').toggleClass('fixed');
    });

    $('.header-menu__closed').on('click', function(e) {
        e.stopPropagation();
        $(this).closest('.header-menu__nav-hidden-wrap').removeClass('show');
        $('.header-menu__borgir').removeClass('active');
        $('body').removeClass('fixed');
    });

    $(document).on('click', function (e) {
        e.stopPropagation();
        $('.header-menu__borgir').removeClass('active');
        $('.header-menu__nav-hidden-wrap').removeClass('show');
        $('.header-menu__catalog-category-wrap').removeClass('opened');
        $('.header-menu__catalog-category-toggle').removeClass('opened');
        $('.header-menu__catalog-subcategory-wrap').stop().slideUp();
        $('body').removeClass('fixed');
    });

    $('.header-menu__nav-hidden-wrap').on('click', function (e) {
        e.stopPropagation();
    });

    // Header search field toggle
    (function () {
        $('.header-search__trigger').on('click', function () {
            $(this).parent().toggleClass('show');
            $(this).toggleClass('active');
        });
    })();

    // Swiper slider
    (function () {
        if ($('.slider-banner').length) {
            let slider;
            let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

            if (slide > 1) {
                slider = new Swiper('.slider-banner', {
                    observer: true,
                    observeParents: true,
                    autoplay: true,
                    loop: true,
                    // loopedSlides: 1,
                    slidesPerView: 'auto',
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    dynamicBullets: true,
                });
            }
        }

        let sliderReviews = $('.slider-reviews');
        if (sliderReviews.length) {
            let slider, slide = document.querySelectorAll('.slider-reviews .swiper-slide').length;

            if (slide > 2) {
                slider = new Swiper('.slider-reviews', {
                    observer: true,
                    observeParents: true,
                    autoHeight: true,
                    slidesPerView: 2,
                    spaceBetween: 40,
                    navigation: {
                        nextEl: sliderReviews.next().find('.swiper-button-next'),
                        prevEl: sliderReviews.next().find('.swiper-button-prev')
                    },
                    breakpoints: {
                        1199: {
                            slidesPerView: 1,
                        }
                    }
                });
            }
        }

        let mainProdSlider = $('.main-category__slider');
        if (mainProdSlider.length) {
            let slider, slide = document.querySelectorAll('.main-category__slider .swiper-slide').length;

            mqlMax.xxxl.addListener(function () {
                if (mqlMax.xxxl.matches) {
                    slider = new Swiper('.main-category__slider', {
                        observeParents: true,
                        observer: true,
                        slidesPerView: 4,
                        spaceBetween: 20,
                        pagination: {
                            el: mainProdSlider.find('.swiper-pagination'),
                            clickable: true
                        },
                        breakpoints: {
                            1365: {
                                slidesPerView: 3,
                                spaceBetween: 35,
                            },
                            1199: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            991: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            767: {
                                slidesPerView: 1,
                            }
                        }
                    });
                } else {
                    slider.forEach(function (e, i) {
                        e.destroy();
                    });
                }
            });

            if (mqlMax.xxxl.matches) {
                slider = new Swiper('.main-category__slider', {
                    observeParents: true,
                    observer: true,
                    slidesPerView: 4,
                    spaceBetween: 20,
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        1365: {
                            slidesPerView: 3,
                            spaceBetween: 35,
                        },
                        1199: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        991: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        767: {
                            slidesPerView: 1,
                        }
                    }
                });
            }
        }

        let stagesSlider = $('.stages-slider');
        if (stagesSlider.length) {
            let slider, slide = document.querySelectorAll('.stages-slider .swiper-slide').length;

            if (slide > 3) {
                slider = new Swiper('.stages-slider', {
                    observer: true,
                    observeParents: true,
                    centeredSlides: false,
                    loop: true,
                    // loopAdditionalSlides: slide,
                    slidesPerView: 4,
                    spaceBetween: 30,
                    navigation: {
                        prevEl: stagesSlider.find('.swiper-button-prev'),
                        nextEl: stagesSlider.find('.swiper-button-next'),
                    },
                    breakpoints: {
                        1769: {
                            slidesPerView: 3,
                        },
                        1199: {
                            slidesPerView: 2,
                        },
                        767: {
                            slidesPerView: 1,
                        }
                    }
                });
            }
        }

        let productSetSlider = $('.product-cart__set-slider');
        if (productSetSlider.length) {
            let slider,
                slide = document.querySelectorAll('.product-cart__set-slider .swiper-slide').length;

            if (slide) {
                slider = new Swiper('.product-cart__set-slider', {
                    observer: true,
                    observeParents: true,
                    centeredSlides: true,
                    loop: true,
                    slidesPerView: 1,
                    spaceBetween: 120,
                    navigation: {
                        prevEl: productSetSlider.find('.swiper-button-prev'),
                        nextEl: productSetSlider.find('.swiper-button-next'),
                    },
                    pagination: {
                        el: productSetSlider.find('.swiper-pagination'),
                        clickable: true,
                    }
                })
            }
        }
    })();

    // Button wishlist
    (function () {
        let wishBtn = $('.main-category__card-button-favorite');
        if (wishBtn.length) {
            wishBtn.on('click', function () {
                $(this).toggleClass('active');
            });
        }
    })();

    // Star rating
    (function () {
        let ratingOutput = $('.star-rating-output'),
            ratingInput = $('.star-rating');

        if (ratingOutput.length) {
            ratingOutput.rating({
                size: 'xs',
                readonly: true,
                displayOnly: true,
                showClear: false,
                showCaption: false,
                stars: 5,
                emptyStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
                filledStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
            });
        }
        if (ratingInput.length) {
            ratingInput.rating({
                size: 'xs',
                showClear: false,
                showCaption: false,
                stars: 5,
                step: 1,
                emptyStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
                filledStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
            });
        }
    })();

    // select2
    (function () {
        let productSelect = $('.card-select');
        let formSelect = $('.form-select');

        if (productSelect) {
            productSelect.each(function (i, e) {
                $(e).select2({
                    minimumResultsForSearch: -1,
                    dropdownParent: $(this).nextAll('.dropdown-select'),
                });
            })

            $('.main-category__card').on('mouseleave', function () {
                $(this).find('.card-select').select2('close');
            });
        }

        if (formSelect) {
            formSelect.each(function (i, e) {
                $(e).select2({
                    minimumResultsForSearch: -1,
                    dropdownParent: $(this).nextAll('.dropdown-select'),
                });
            })
        }
    })();

    // FAQ
    (function () {
        let faq = $('.faq');
        if (faq.length) {
            $('.faq__item-head').on('click', function () {
                $(this).parent().toggleClass('active');
                $(this).next().stop().slideToggle(400);
            });
        }
    })();

    // reset sidebar filter
    (function () {
        let filter = document.querySelector('.catalog-sidebar'),
            filterReset = document.getElementById('sidebar_filter_reset'),
            filterSwitch = document.getElementById('sidebar_switch'),
            inputs = document.querySelectorAll('input[type="checkbox"]'),
            arr = [];

        if (filter) {
            if (filterReset) {
                filter.addEventListener('input', function () {
                    arr = [];

                    inputs.forEach(function (input) {
                        if (input.checked) {
                            arr.push(input);
                        }
                    });

                    if (arr.length > 0) {
                        filterReset.classList.remove('d-none');
                        filterReset.classList.add('d-block');
                    } else {
                        filterReset.classList.remove('d-block');
                        filterReset.classList.add('d-none');
                    }
                });
                filterReset.addEventListener('click', function () {
                    this.classList.remove('d-block');
                    this.classList.add('d-none');

                    let priceSlider = filter.querySelectorAll('.slider-handles');
                    if (priceSlider.length) {
                        priceSlider.forEach(function (elem) {
                            elem.noUiSlider.reset();
                        });
                    }
                });
            }

            filterSwitch.addEventListener('click', function () {
                filter.classList.toggle('open');
            });
        }
    })();

    // sidebar box
    (function () {
        let sidebarBox = $('.catalog-sidebar__box'),
            triggerBox = $('.catalog-sidebar__box-trigger');

        sidebarBox.each(function (i, e) {
            let boxBody = $(e).find('.catalog-sidebar__box-body');

            if ($(e).hasClass('active')) {
                boxBody.slideDown(0);
            } else {
                boxBody.slideUp(0);
            }
        });
        if (sidebarBox.length && triggerBox.length) {
            triggerBox.on('click', function () {
                $(this).closest('.catalog-sidebar__box').toggleClass('active');
                $(this).parent().next('.catalog-sidebar__box-body').slideToggle(300);
            });
        }
    })();

    // Range slide
    (function () {
        if ($('input[type="range"]')) {
            let sliderHandles = document.querySelectorAll('.slider-handles');

            if (sliderHandles.length) {
                sliderHandles.forEach(function (elem) {
                    let input = elem.children[0];
                    let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                    let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;
                    let minInput = elem.nextElementSibling.children[0].children[1];
                    let maxInput = elem.nextElementSibling.children[1].children[1];
                    let inputs = elem.nextElementSibling.querySelectorAll('.price-slider__value');
                    input.remove();

                    noUiSlider.create(elem, {
                        start: [minValue, maxValue / 2],
                        step: 1,
                        behavior: 'tap-drag',
                        connect: true,
                        range: {
                            'min': minValue,
                            'max': maxValue
                        },
                        pips: {
                            mode: 'range',
                            density: 2,
                        }
                    });

                    elem.noUiSlider.on('update', function (values, handle) {
                        inputs[handle].value = values[handle].slice(0, -3);
                    });

                    inputs.forEach(function (input, handle) {
                        input.addEventListener('change', function () {
                            elem.noUiSlider.setHandle(handle, this.value);
                        });
                    })

                    minInput.addEventListener('change', function () {
                        elem.noUiSlider.set([this.value, null]);
                    });

                    maxInput.addEventListener('change', function () {
                        elem.noUiSlider.set([null, this.value]);
                    });
                });
            }
        }
    })();

    // sorting buttons
    (function () {
        let sortingVariant = document.querySelectorAll('.catalog-content__sorting-variant a'),
            sortingPrice = document.querySelectorAll('.catalog-content__sorting-price a');

        sortingVariant.forEach(function (e) {
            e.addEventListener('click', function (event) {
                event.preventDefault();
                sortingVariant.forEach(function (e) {
                    e.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
        sortingPrice.forEach(function (e) {
            e.addEventListener('click', function (event) {
                event.preventDefault();
                sortingPrice.forEach(function (e) {
                    e.classList.remove('active');
                });

                this.classList.add('active');
            });
        });
    })();

    // product cart
    (function prodCounter() {
        let cart = $('#cart'),
            minusCounter = $('.product-cart__item-counter_minus'),
            plusCounter = $('.product-cart__item-counter_plus'),
            deleteProduct = $('.product-cart__item-delete');

        minusCounter.on('click', function () {
            let counter = $(this).next('.product-cart__item-counter');
            let counterVal = Number(counter.val());

            if (counterVal <= 1) {
                return false;
            } else {
                counter.val(counterVal - 1);
            }
        });
        plusCounter.on('click', function () {
            let counter = $(this).prev('.product-cart__item-counter');
            let counterVal = Number(counter.val());
            if (counterVal >= 999) {
                alert('Свяжитесь с менеджером');
                return false;
            } else {
                counter.val(counterVal + 1);
            }
        });

        cart.on('click', function (e) {
            if ($(e)[0].target.classList.contains('product-cart__item-delete')) {
                $(e)[0].target.parentElement.remove();
            }
        });
    })();

    // tabs
    (function () {
        let prodTabs = $('#product_card_tabs');
        if (prodTabs.length) {
            prodTabs.tabs({
                hide: {effect: "fadeOut", duration: 300},
                show: {effect: "fadeIn", duration: 300},
            });
        }
    })();

    // product card thumbs gallery
    (function () {
        const thumbSliderWrap = $('.product-card__thumbs-wrap');

        if (thumbSliderWrap.length) {
            thumbSliderWrap.each(function (i, e) {
                let thumbs = $(e).find('.product-card__thumbs'),
                    thumb = $(e).find('.product-card__thumb');

                let slider = new Swiper(thumbs, {
                    observer: true,
                    observeParents: true,
                    direction: 'vertical',
                    spaceBetween: 10,
                    slidesPerView: 'auto',
                    watchSlidesProgress: true,
                    breakpoints: {
                        1365: {
                            direction: 'horizontal',
                            slidesPerView: 2,
                        }
                    }
                });

                let slider2 = new Swiper(thumb, {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 1,
                    navigation: {
                        prevEl: thumb.find('.swiper-button-prev'),
                        nextEl: thumb.find('.swiper-button-next'),
                    },
                    thumbs: {
                        swiper: slider,
                    }
                });
            });
        }
    })();

    // product card open reply reviews
    (function () {
        const openReply = $('.product-card__reviews-reply-open');

        openReply.on('click', function () {
            let answers = $(this).closest('.product-card__reviews-box').next().nextAll();

            $(this).toggleClass('active');
            answers.each(function (i, e) {
                $(e).slideToggle(300);
            });
        });
    })();

    // pass visibility
    (function () {
        let passVisible = $('.pass-visible');

        if (passVisible) {
            passVisible.on('click', function () {
                let ico = $(this).find('img');
                let passInput = $(this).prev();

                if (passInput.attr('type') === 'password') {
                    ico.attr('src', './img/eye-open.svg');
                    passInput.attr('type', 'text');
                } else {
                    ico.attr('src', './img/eye-closed.svg');
                    passInput.attr('type', 'password');
                }
            });
        }
    })();

    // modal switcher
    (function () {
        let modalSwitch = $('.modal-switcher__btn');
        let closeModal = $('.modal .close');

        modalSwitch.on('click', function (e) {
            e.preventDefault();
            let current = $(this).closest('.modal');
            let targetUrl = $(this).attr('href');

            current.modal('hide');
            current.on('hidden.bs.modal', function () {
                $(targetUrl).modal('show');
                targetUrl = undefined;
            });
        });

        closeModal.on('click', function () {
            let currentModal = $(this).closest('.modal');
            currentModal.modal('hide');
        });
    })();

    // modal switch user class
    (function () {
        let radio = $('.user-class');

        radio.on('click', function () {
            let val = $(this).val();
            let special = $('.client');
            let forMaster = $('.for-master');
            let notForMaster = $('.not-for-master');

            switch (val) {
                case 'client':
                    special.each(function (i, e) {
                        if ($(e).hasClass('for-master')) {
                            $(e).css('display', 'none');
                        } else {
                            $(e).css('display', 'block');
                        }
                    });
                    break;
                case 'master':
                    special.each(function (i, e) {
                        if ($(e).hasClass('not-for-master')) {
                            $(e).css('display', 'none');
                        } else {
                            $(e).css('display', 'block');
                        }
                    });
                    break;
            }
        });
    })();

    // modal file
    (function () {
        let fileInput = $('input[type="file"]');

        fileInput.on('change', function () {
            let files = this.files;

            if (this.hasAttribute('multiple')) {
                throw Error('input must be for single files');
            }

            if (files[0] && files.length && files[0].type.match(`image.*`)) {
                let fileName = files[0].name.match(/^.+(?=\.\w+$)/);
                let name = $(this).next('.input-file').find('.input-file__text');
                name.html(fileName);
            }
        });
    })();

    // input mask
    (function () {
        let phoneInputs = document.querySelectorAll('.mask-phone');
        let cardNumber = document.querySelectorAll('.mask-card');
        let cardDate = document.querySelectorAll('.mask-card-date');

        if (phoneInputs.length) {
            phoneInputs.forEach(function (e, i) {
                const phone = IMask(e, {
                    mask: '+{38}(\\000)000-00-00',
                    lazy: true,
                    placeholderChar: '_',
                });
            });
        }

        if (cardNumber) {
            cardNumber.forEach(function (e, i) {
                const card = IMask(e, {
                    mask: '0000 0000 0000 0000',
                    lazy: true,
                    placeholderChar: 'X',
                });
            });
        }

        if (cardDate) {
            cardDate.forEach(function (e, i) {
                const card = IMask(e, {
                    mask: '00\\/00',
                    lazy: true,
                    placeholderChar: '0',
                });
            });
        }
    })();

    // payment
    (function () {
        const payment = $('.registration-payment');
        let firstStep = $('.registration-payment-steps__item'),
            clientType = $('.registration-payment-user-types input'),
            stepForm = $('.registration-payment__step'),
            nextStep = $('#payment_btn'),
            cardSelect = $('#card_selection'),
            deliveryMethod = $('#delivery_method'),
            deliveryMethodBlock = $('.delivery-method'),
            cardAdded = $('.registration-payment__new-card'),
            cityInput = $('#city_input');

        if (payment) {
            clientType.on('change', function (e) {
                let v = e.target.value;

                switch (v) {
                    case 'new_client':
                        $('.registration-payment__user_old').addClass('d-none');
                        $('.registration-payment__user_new').removeClass('d-none');
                        break;

                    case 'old_client':
                        $('.registration-payment__user_new').addClass('d-none');
                        $('.registration-payment__user_old').removeClass('d-none');
                        break;

                    default:
                        return false;
                }
            });

            nextStep.on('click', function () {
                firstStep.removeClass('active').next().addClass('active');
                if ($(this).data('check') === false) {
                    $(this).text('Оплатить').data('check', true);

                    $('.registration-payment__step_first').addClass('d-none');
                    $('.registration-payment__step_second').removeClass('d-none');
                } else {
                    $(this).attr('type', 'submit');
                }
            });

            cardSelect.on('change', function () {
                if (cardSelect.val() !== '') {
                    cardAdded.addClass('d-none');
                }
            });

            deliveryMethod.on('change', function () {
                switch ($(this).val()) {
                    case 'new_post':
                        deliveryMethodBlock.addClass('d-none');
                        $('.registration-payment__post-info').removeClass('d-none');
                        break;

                    case 'ukr_post':
                        deliveryMethodBlock.addClass('d-none');
                        $('.registration-payment__post-info').removeClass('d-none');
                        break;

                    case 'courier':
                        deliveryMethodBlock.addClass('d-none');
                        $('.registration-payment__courier-info').removeClass('d-none');
                        break;

                    case 'pickup':
                        deliveryMethodBlock.addClass('d-none');
                        $('.registration-payment__pickup-info').removeClass('d-none');
                        break;
                }
            });

            cityInput.on('change', function (e) {
                let options = deliveryMethod.children();

                if (e.target.value.trim().toLowerCase() !== 'херсон') {
                    options.each(function (i, el) {
                        $(el).attr('disabled', false);
                        if (el.value === 'courier' || el.value === 'pickup') {
                            $(el).attr('disabled', true);
                        }
                    });
                } else {
                    options.each(function (i, el) {
                        $(el).attr('disabled', false);
                    });
                }
            });
        }
    })();

    // personal account
    (function () {
        let acc = $('#account-content');

        if (acc) {
            let editBtn = $('.personal-data-box__edit'),
                editStateBtn = $('.personal-data-box__edit-control-btn'),
                addCardBtn = $('.add-card-confirm');

            editBtn.on('click', function () {
                let inputs = $(this).parent().next().find('input');

                $(this)
                    .addClass('d-none');

                $(this)
                    .next()
                    .removeClass('d-none');

                switchInputs(inputs, false);
            });

            editStateBtn.on('click', function () {
                let inputs = $(this).closest('.personal-data-box').find('.personal-data-box__body input');

                $(this)
                    .parent()
                    .addClass('d-none');

                $(this)
                    .parent()
                    .prev()
                    .removeClass('d-none');

                switchInputs(inputs, true);
            });

            addCardBtn.on('click', function () {
                let confirm = $(this).data('confirm');
                let form = $('#add_card_form');

                if (confirm) {
                    let cardsWrap = $('#credit_card_list');
                    let cardInputs = form.find('input');
                    const v = [];

                    cardInputs.each(function (i, el) {
                        if (el.value !== '') {
                            v.push(el.value);
                        } else {
                            return false;
                        }
                    });
                    if (v.length === 3) {
                        let numberTrim = v[0].replace(/(\d+\s){3}/g, '');

                        cardsWrap.prepend(`<div class="col-xxxl-3 col-xl-6 col-lg-4 col-sm-6 mb-3">
                                    <div class="added-credit-card">
                                        <p class="added-credit-card__number card-data" data-card="${v[0]}">**** **** **** ${numberTrim}</p>

                                        <div class="added-credit-card__info">
                                            <div class="added-credit-card__info-item">
                                                <span class="added-credit-card__info-name">Срок действия</span>
                                                <span class="added-credit-card__info-text card-data" data-card="${v[1]}">****</span>
                                            </div>

                                            <div class="added-credit-card__info-item">
                                                <span class="added-credit-card__info-name">CVV</span>
                                                <span class="added-credit-card__info-text card-data" data-card="${v[2]}">***</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>`);
                        form[0].reset();
                    }
                    else {
                        alert(`Все поля должны быть заполнены`);
                    }
                }
                else {
                    form[0].reset();
                }
            });
        }

        function switchInputs(inputs, readonly) {
            console.log(inputs);

            if (readonly) {
                console.log(`readonly status: ${readonly}`);
                inputs.each(function (i, el) {
                    $(el).attr('readonly', 'readonly');
                });
            } else {
                console.log(`readonly status: ${readonly}`);
                inputs.each(function (i, el) {
                    $(el).removeAttr('readonly');
                });
            }
        }
    })();

    // upload photo
    (function() {
        const input = document.getElementById('upload_photo');
        const photoWrap = document.querySelector('.add-photos');

        function readUrl(field) {
            if (field.files[0].type.match(`image.*`)) {
                let reader = new FileReader();

                reader.onload = function () {
                    let src = this.result;
                    photoWrap.insertAdjacentHTML("afterbegin", `<div class="add-photos__thumb"><picture class="add-photos__thumb-pic"><img src="${src}" alt="image" title="image"></picture><button type="button" class="add-photos__thumb-remove"><svg><use xlink:href="img/spritemap.svg#sprite-close"></use></svg></button></div>`);
                }

                console.log(field.files[0]);

                reader.readAsDataURL(field.files[0]);
            }
            else {
                return false
            }
        }

        if (input) {
            input.addEventListener('change', function() {
                readUrl(this);
            });

            photoWrap.addEventListener('click', function(e) {
                let el = e.target;
                if (el.classList.contains('add-photos__thumb-remove')) {
                    el.closest('.add-photos__thumb').remove();
                }
            });
        }
    })();

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});