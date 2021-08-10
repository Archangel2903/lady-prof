import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/dist/js/swiper.min';
import noUiSlider from 'nouislider';


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
    /* Borgir button */
    $('.header-menu__borgir').on('click', function () {
        $(this).next().addClass('show');
    });

    $('.header-menu__borgir-close').on('click', function () {
        $(this).parent().removeClass('show');
    });

    // Swiper slider
    if ($('.swiper-container').length) {
        let slider;
        let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;

        if (slide > 1) {
            slider = new Swiper('.swiper-container', {
                observer: true,
                observeParents: true,
                loop: true,
                autoplay: true,
                spaceBetween: 25,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
                dynamicBullets: true,
            });
        }
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




$(function () {
    let select = $(".select-styler");
    if (select.length) {
        select.select2({
            minimumResultsForSearch: Infinity
        })
    }
    select.on("change", function () {
        let region = $("#region");
        let regionValue = region.val();
        let country = $("#country");
        let countryValue = country.val();
        let partnerBlock = $(".wrap-partner");
        if ($(this).attr("id") === "region") {
            partnerBlock.each(function (a, b) {
                console.log(regionValue);
                if (regionValue === "show-all") {
                    $(b).css("display", "block")
                } else {
                    if ($(b).data("region") !== regionValue) {
                        $(b).css("display", "none")
                    } else {
                        $(b).css("display", "block")
                    }
                }
            })
        } else {
            if ($(this).attr("id") === "country") {
                console.log(countryValue);
                partnerBlock.each(function (a, b) {
                    if (countryValue === "show-all") {
                        if (regionValue === "show-all") {
                            $(b).css("display", "block")
                        } else {
                            if ($(b).data("region") !== regionValue) {
                                $(b).css("display", "none")
                            } else {
                                $(b).css("display", "block")
                            }
                        }
                    } else {
                        if ($(b).data("country") !== countryValue) {
                            $(b).css("display", "none")
                        } else {
                            if (regionValue === "show-all") {
                                $(b).css("display", "block")
                            } else {
                                if ($(b).data("region") !== regionValue) {
                                    $(b).css("display", "none")
                                } else {
                                    $(b).css("display", "block")
                                }
                            }
                        }
                    }
                })
            }
        }
    })
});