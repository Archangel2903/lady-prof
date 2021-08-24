import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import noUiSlider from 'nouislider';
import 'bootstrap-star-rating';
import 'select2';

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
});

$(function () {
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

        /*if (!$('.header-search').hasClass('show')) {
            $('.header-search').find('.header-search__input').val('');
        }*/
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
            $(this).next().slideToggle(400);
        });
    }

    // Range slide
    if ($('input[type="range"]')) {
        let sliderRange = document.querySelectorAll('.slider-range');
        let sliderHandles = document.querySelectorAll('.slider-handles');

        if (sliderRange.length) {
            sliderRange.forEach(function (elem) {
                let input = elem.childNodes[0];
                let startValue = input.hasAttribute('value') ? Number(input.getAttribute('value')) : 1;
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [startValue],
                    step: 1,
                    behavior: 'tap',
                    connect: [true, false],
                    range: {
                        'min': [minValue],
                        'max': [maxValue]
                    }
                });
            });
        }

        if (sliderHandles.length) {
            sliderHandles.forEach(function (elem) {
                let input = elem.childNodes[0];
                let minValue = input.hasAttribute('min') ? Number(input.getAttribute('min')) : 1;
                let maxValue = input.hasAttribute('max') ? Number(input.getAttribute('max')) : 100;

                input.remove();

                noUiSlider.create(elem, {
                    start: [minValue, maxValue / 2],
                    step: 1,
                    behavior: 'tap-drag',
                    connect: true,
                    range: {
                        'min': minValue,
                        'max': maxValue
                    }
                });
            });
        }
    }

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