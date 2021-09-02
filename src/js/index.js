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
        setHeight: 250,
    });
    $('.product-cart__list').mCustomScrollbar({
        axis: 'y',
    })
});

$(function () {
    // nav links
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

    // Borgir button
    $('.header-menu__borgir').on('click', function (e) {
        e.stopPropagation();
        $(this).toggleClass('active');
        $(this).next().toggleClass('show');
        $('body').toggleClass('fixed');
    });

    $(document).on('click', function (e) {
        e.stopPropagation();
        $('.header-menu__borgir').removeClass('active');
        $('.header-menu__nav-hidden-wrap').removeClass('show');
        $('body').removeClass('fixed');
    });

    $('.header-menu__nav-hidden').on('click', function (e) {
        e.stopPropagation();
    });

    // Header search field toggle
    $('.header-search__trigger').on('click', function() {
        $(this).parent().toggleClass('show');
        $(this).toggleClass('active');
    });

    // Swiper slider
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
            }
            else {
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

    // Button wishlist
    let wishBtn = $('.main-category__card-button-favorite');
    if (wishBtn.length) {
        wishBtn.on('click', function () {
            $(this).toggleClass('active');
        });
    }

    // Star rating
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
            emptyStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
            filledStar: `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024"><path d="M512 0l158.215 337.080 353.785 54.054-256 262.38 60.436 370.487-316.436-174.92-316.433 174.92 60.433-370.487-256-262.38 353.783-54.054 158.217-337.080z"></path></svg>`,
        });
    }

    // select2
    let productSelect = $('.card-select');

    if (productSelect) {
        productSelect.each(function(i, e) {
            $(this).select2({
                minimumResultsForSearch: -1,
                dropdownParent: $(this).nextAll('.dropdown-select'),
            });
        })

        $('.main-category__card').on('mouseleave', function() {
            $(this).find('.card-select').select2('close');
        });
    }

    // FAQ
    let faq = $('.faq');

    if (faq.length) {
        $('.faq__item-head').on('click', function() {
            $(this).parent().toggleClass('active');
            $(this).next().stop().slideToggle(400);
        });
    }

    // reset sidebar filter
    let filter = document.getElementById('sidebar_filter'),
        filterReset = document.getElementById('sidebar_filter_reset'),
        inputs = document.querySelectorAll('input[type="checkbox"]'),
        arr = [];

    if (inputs.length) {
        filter.addEventListener('input', function (e) {
            arr = [];

            inputs.forEach(function (input) {
                if (input.checked) {
                    arr.push(input);
                }
            });

            if (arr.length > 0) {
                filterReset.classList.remove('d-none');
                filterReset.classList.add('d-block');
            }
            else {
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

    // sidebar box
    let sidebarBox = $('.catalog-sidebar__box'),
        triggerBox = $('.catalog-sidebar__box-trigger');

    sidebarBox.each(function (i, e) {
        let boxBody = $(e).find('.catalog-sidebar__box-body');

        if ($(e).hasClass('active')) {
            boxBody.slideDown(0);
        }
        else {
            boxBody.slideUp(0);
        }
    });
    if (sidebarBox.length && triggerBox.length) {
        triggerBox.on('click', function () {
            $(this).closest('.catalog-sidebar__box').toggleClass('active');
            $(this).parent().next('.catalog-sidebar__box-body').slideToggle(300);
        });
    }

    // Range slide
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

    // sorting buttons
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
            }
            else {
                counter.val(counterVal - 1);
            }
        });
        plusCounter.on('click', function () {
            let counter = $(this).prev('.product-cart__item-counter');
            let counterVal = Number(counter.val());
            if (counterVal >= 999) {
                alert('Свяжитесь с менеджером');
                return false;
            }
            else {
                counter.val(counterVal + 1);
            }
        });

        cart.on('click', function (e) {
            if ($(e)[0].target.classList.contains('product-cart__item-delete')) {
                $(e)[0].target.parentElement.remove();
            }
        });
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