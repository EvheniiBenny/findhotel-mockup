'use strict';

jQuery(function ($) {

    $('.star-ratings-label').on("click", function (event) {
        event.preventDefault();
        $(this).toggleClass("active");
    });
    $('.sort-link').on("click", function (event) {
        event.preventDefault();
        $('.sort-link').removeClass('active');
        $(this).addClass("active");
    });
    $('.collapse-p').readmore({
        speed: 75,
        collapsedHeight: 55,
        moreLink: '<a href="#" class="read-more-Btn">Read more ...</a>',
        lessLink: '<a href="#" class="hidden-text-Btn">Hidden</a>',

    });
    $('#clearTextBtn').on("click", function () {
        $('#citiesAutocompleteInput').val(' ');
    });
    $('#citiesAutocompleteInput').on("click", function () {
        $('.autocomplete-result-container').addClass('active');
    });

    $(document).mouseup(function (e) {
        var block = $(".autocomplete-result-container");
        var btn = $('#citiesAutocompleteInput');
        if (!block.is(e.target) &&
            !btn.is(e.target) &&
            block.has(e.target).length === 0) {
            block.removeClass('active');
        }
    });

    $('.guest-ratings-item ').on("click", function (event) {
        event.preventDefault();
        $(this).children('.guest-ratings-label').addClass('active');
        $(this).prevAll('.guest-ratings-item').children('.guest-ratings-label').addClass('active');
        $(this).nextAll('.guest-ratings-item').children('.guest-ratings-label').removeClass('active');
    });



    $('.mapOpenBtn').on("click", function () {
        $('.mob-filters-container').animate({
            scrollTop: 0,
        }, 'slow');
        $('.map-mobile-container').addClass('active');
    });


    // $('.count-dropdown-Btn').on("click", function () {
    //     $('.quantity-count-field').addClass('active');
    // });



    $('#mobFilterOpen').on("click", function () {
        $('#filtersContainer').addClass('active');
        $('.main').addClass('shadow')
    });
    $('#mobSortOpen').on("click", function () {
        $('#sortContainer').addClass('active');
    });
    $('#openFiltersBtn').on("click", function () {
        $('.mobile-filters-container').addClass('active');
    });

    $('#closeSortFilters, #closeMobFilters').on("click", function () {
        $('#filtersContainer').removeClass('active');
        $('#sortContainer').removeClass('active');
    });

    $('#closeMap').on("click", function () {
        $('.map-mobile-container').removeClass('active');
    });

    $('.sort-select-row').on("click", function () {
        $('.sort-select-row').removeClass("active");
        $(this).addClass('active');
    });
    $(document).mouseup(function (e) {
        var block = $(".quantity-count-field");
        var btn = $('.count-dropdown-Btn');
        if (!block.is(e.target) &&
            !btn.is(e.target) &&
            block.has(e.target).length === 0) {
            block.removeClass('active');
        }
    });

    $('.stepper-Btn-guests').on('click', function (event) {
        event.preventDefault();
        let setTo = $(this).data('action');
        let value = $(this).siblings('input').val();
        let newValue = undefined;
        let roomsInput = $('input[name="rooms"]');
        if (typeof (setTo) !== 'undefined') {
            switch (setTo) {
                case 'decrease':
                    if (value > 1) {
                        newValue = parseInt(value) - 1;
                        if (parseInt(roomsInput.val()) > newValue) {
                            roomsInput.val(newValue);
                            roomsInput.siblings('.stepper-value').text(newValue);
                            $('.quantity-room-count').text(newValue);
                            roomsCheck(newValue);
                        }
                    }
                    break;
                case 'increase':
                    if (value < 36) {
                        newValue = parseInt(value) + 1;

                    }
                    break;
            }
        }
        if (newValue !== undefined) {
            $(this).siblings('input').val(newValue);
            $(this).siblings('.stepper-value').text(newValue);
            $('.quantity-guest-count').text(newValue);
            if (newValue == 36) {
                $('.stepper-Btn-guests.increaseBtn').addClass('disable');
            } else {
                $('.stepper-Btn-guests.increaseBtn').removeClass('disable');
            }
            if (newValue > 1) {
                $('.quantity-guest-span').text('Guests');
                $('.stepper-Btn-guests.decreaseBtn').removeClass('disable');
            } else {
                $('.quantity-guest-span').text('Guest');
                $('.stepper-Btn-guests.decreaseBtn').addClass('disable');
            }
            let roomsCount = Math.ceil(newValue / 4);
            if (roomsInput.val() < roomsCount) {
                roomsInput.val(roomsCount);
                roomsCheck(roomsCount);
                roomsInput.siblings('.stepper-value').text(roomsCount);
                $('.quantity-room-count').text(roomsCount);
                if (roomsCount == 9) {
                    roomsInput.siblings('.stepper-Btn-rooms.increaseBtn').addClass('disable');
                } else {
                    roomsInput.siblings('.stepper-Btn-rooms.increaseBtn').removeClass('disable');
                }
                if (roomsCount == 1) {
                    roomsInput.siblings('.stepper-Btn-rooms.decreaseBtn').addClass('disable');
                } else {
                    roomsInput.siblings('.stepper-Btn-rooms.decreaseBtn').removeClass('disable');
                }
            }
        }
    });

    $('.stepper-Btn-rooms').on('click', function (event) {
        event.preventDefault();
        let guestsCount = $('input[name="guests"]').val();
        let setTo = $(this).data('action');
        let value = $(this).siblings('input').val();
        let newValue = undefined;
        if (typeof (setTo) !== 'undefined') {
            switch (setTo) {
                case 'decrease':
                    if (value > 1) {
                        newValue = parseInt(value) - 1;
                    }
                    break;
                case 'increase':
                    if (value < 9) {
                        newValue = parseInt(value) + 1;
                    }
                    break;
            }
        }
        if (newValue !== undefined && newValue <= guestsCount) {
            $(this).siblings('input').val(newValue);
            $(this).siblings('.stepper-value').text(newValue);
            $('.quantity-room-count').text(newValue);
            roomsCheck(newValue);
        }
    });

    function roomsCheck(newValue) {
        if (newValue == 9) {
            $('.stepper-Btn-rooms.increaseBtn').addClass('disable');
        } else {
            $('.stepper-Btn-rooms.increaseBtn').removeClass('disable');
        }
        if (newValue > 1) {
            $('.quantity-room-span').text('Rooms');
            $('.stepper-Btn-rooms.decreaseBtn').removeClass('disable');
        } else {
            $('.quantity-room-span').text('Room');
            $('.stepper-Btn-rooms.decreaseBtn').addClass('disable');
        }
    }

    $('.stepper-Btn').on("click", function (event) {
        event.preventDefault();

    });
    $('.tag-link').on("click", function (event) {
        event.preventDefault();
        if ($(this).siblings('.tag-checkbox').prop('checked') == false) {
            $(this).siblings('.tag-checkbox').prop('checked', true);
        } else {
            $(this).siblings('.tag-checkbox').prop('checked', false);
        }

    });
    var mymap = L.map('mapElem').setView([50.850, 4.34], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlrdG9ya3JlcGFrIiwiYSI6ImNqd2M1cjdxdTA1NjU0M2xjMTFzbzE2bGcifQ.nSavInRR78FzFv3POqC4gg', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var mymap_2 = L.map('mapElem-2').setView([50.850, 4.34], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidmlrdG9ya3JlcGFrIiwiYSI6ImNqd2M1cjdxdTA1NjU0M2xjMTFzbzE2bGcifQ.nSavInRR78FzFv3POqC4gg', {
        attribution: '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        id: 'mapbox.streets'
    }).addTo(mymap_2);

    var navNodes = $('.hotel-slider-nav')
    $('.hotel-slider').each(function (i, node) {
        var listNodeUniqueClass = 'hotel-slider' + i
        $(node).addClass(listNodeUniqueClass)
        var navNodeUniqueClass = 'hotel-slider-nav' + i
        navNodes.eq(i).addClass(navNodeUniqueClass)

        var listSelector = '.' + listNodeUniqueClass;
        var navSelector = '.' + navNodeUniqueClass;



        $(listSelector).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            asNavFor: navSelector
        });
        $(navSelector).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: listSelector,
            dots: false,
            focusOnSelect: true
        });

    });

    // $("#datepicker").datepicker({
    //     dateFormat: "dd MM",
    //     minDate: 0,
    //     firstDay: 1
    // });
    // $("#datepicker-2").datepicker({
    //     dateFormat: "dd MM",
    //     minDate: 0,
    //     firstDay: 1
    // });
    $(function () {

        let from = $("#from")
            .datepicker({
                dateFormat: "DD, MM dd ",
                numberOfMonths: 2,
                minDate: 0,
                firstDay: 1
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $("#to").datepicker({
                dateFormat: "DD, MM dd ",
                numberOfMonths: 2,
                minDate: 0,
                firstDay: 1
            })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
            });

        function getDate(element) {
            let date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });
    $("#m-datepicker").datepicker({
        dateFormat: "dd MM",
        minDate: 0,
        firstDay: 1
    });
    $("#m-datepicker-2").datepicker({
        dateFormat: "dd MM",
        minDate: 0,
        firstDay: 1
    });

});


window.onload = function () {
    let canvas = document.getElementById('cnvs');
    progressBar(canvas).display({
        color: '#ff8300',
        emptyColor: '#d8d8d8'
    });
}

var progressBar = function (canvas) {
    return {
        ctx: canvas.getContext('2d'),
        startAngle: 0.9 * Math.PI,
        endAngle: 2.1 * Math.PI,
        percent: canvas.dataset.percent,
        defaults: {
            color: '#ff8300', //default stroke color
            emptyColor: '#d8d8d8', //default stroke empty color
        },
        display: function (args) {

            this.progressEndAngle = this.startAngle + ((this.endAngle - this.startAngle) / 100 * this.percent); //progress
            this.ctx.lineWidth = 10;
            this.ctx.strokeStyle = (args.color) ? args.color : this.defaults.color;
            //display progress field of diagram
            this.ctx.beginPath();
            this.ctx.arc(62.5, 60, 48, this.startAngle, this.progressEndAngle);
            this.ctx.stroke();
            //display empty field of diagram
            this.ctx.strokeStyle = (args.emptyColor) ? args.emptyColor : this.defaults.emptyColor;
            this.ctx.beginPath();
            this.ctx.arc(62.5, 60, 48, this.progressEndAngle, this.endAngle);
            this.ctx.stroke();
            //display Percents in circle
            this.ctx.font = "normal 22px HelveticaBold";
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#272727';
            this.ctx.fillText(this.percent + '%', 65.5, 58);

        }
    }
};


Chart.defaults.global.defaultFontFamily = 'HelveticaRegular';
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = '#424242';

let barData_3 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [{
            data: [25, 40, 13, 22, 12, 33, 67, 43, 33, 44, 27],
            backgroundColor: '#4784c5',
            borderWidth: 2,
            borderColor: '#4784c5',
            pointBackgroundColor: '#72368D'

        },
        {
            data: [10, 55, 26, 13, 24, 15, 45, 12, 38, 40, 17],
            backgroundColor: '#ee5f49',
            borderWidth: 2,
            borderColor: '#ee5f49',
            pointBackgroundColor: '#C7AFD2'
        }
    ],

};



let ctx = document.getElementById('barChart-3').getContext('2d');
let barChart_3 = new Chart(ctx, {
    type: 'bar',
    data: barData_3,
    options: {
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            xAxes: [{


                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)"
                }
            }],
            yAxes: [{

                ticks: {
                    display: false
                },
            }]
        }
    }
});


let barData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
    datasets: [{
        data: [25, 40, 13, 22, 12, 33, 67, 43, 33, 44, 27],
        backgroundColor: '#2e8beb',
        borderWidth: 1,
        borderColor: '#2e8beb'
    }]

};

let ctx_1 = document.getElementById('barChart').getContext('2d');
let barChart = new Chart(ctx_1, {
    type: 'horizontalBar',
    data: barData,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        tooltips: {
            enabled: true
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            yAxes: [{
                barThickness: 5,
                // gridLines: {
                //     lineWidth: 0,
                //     color: "rgba(255,255,255,0)"
                // }
            }],
            xAxes: [{
                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)",
                },
                ticks: {
                    display: false
                },

            }]
        }
    }
});










let barData_2 = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [{
        data: [44, 66, 25, 31, 78, 49, 62],
        backgroundColor: '#2e8beb',
        borderWidth: 1,
        borderColor: '#2e8beb'
    }]

};
let ctx_2 = document.getElementById('barChart-2').getContext('2d');
let barChart_2 = new Chart(ctx_2, {
    type: 'horizontalBar',
    data: barData_2,
    options: {
        legend: {
            display: false
        },
        tooltips: {
            enabled: false
        },
        elements: {
            point: {
                radius: 0
            }
        },
        scales: {
            yAxes: [{
                barThickness: 5,
                // gridLines: {
                //     lineWidth: 0,
                //     color: "rgba(255,255,255,0)"
                // }
            }],
            xAxes: [{
                gridLines: {
                    lineWidth: 0,
                    color: "rgba(255,255,255,0)",
                },
                ticks: {
                    display: false
                },

            }]
        }
    }
});