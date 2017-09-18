"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var initVectorMap = require('../../../assets/js/init/initVectorMap.js');
var initCharts = require('../../../assets/js/init/charts.js');
var initAniCharts = require('../../../assets/js/init/initAniCharts.js');
var initTooltips = require('../../../assets/js/init/initTooltips.js');
var initNotify = require('../../../assets/js/init/notify.js');
var HomeComponent = (function () {
    function HomeComponent(http) {
        this.http = http;
        this.car_selected_page = 1;
        // private car_list_url: string = 'http://autogate.webscrapers.com.au/api/get_cars.php';
        this.car_list_url = 'http://localhost:3006/get_cars';
    }
    HomeComponent.prototype.ngOnInit = function () {
        initCharts();
        initVectorMap();
        initNotify();
        initAniCharts();
        initTooltips();
        var that = this;
        $.ajax({
            url: that.car_list_url,
            type: 'GET',
            dataType: 'json',
            data: { page: 1 },
            success: function (data, textStatus, jqXHR) {
                that.cars = data.cars;
                that.car_total = data.total;
                that.car_pages = data.pages;
                that.calcCarPageRange();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    };
    HomeComponent.prototype.calcCarPageRange = function () {
        if (this.car_selected_page % 10)
            this.car_start_page = Math.floor(this.car_selected_page / 10) * 10 + 1;
        else
            this.car_start_page = Math.floor(this.car_selected_page / 10) * 10 - 9;
        this.car_end_page = this.car_start_page + 9;
        if (this.car_end_page > this.car_pages)
            this.car_end_page = this.car_pages;
        this.car_page_range = [];
        var index = 0;
        for (var i = this.car_start_page; i <= this.car_end_page; i++) {
            this.car_page_range[index] = i;
            index++;
        }
    };
    HomeComponent.prototype.goCarPage = function (page) {
        if (page == 'next') {
            if (this.car_selected_page == this.car_pages)
                return;
            this.car_selected_page++;
        }
        else if (page == 'prev') {
            if (this.car_selected_page == 1)
                return;
            this.car_selected_page--;
        }
        else {
            this.car_selected_page = page;
        }
        this.calcCarPageRange();
        var that = this;
        $.ajax({
            url: that.car_list_url,
            type: 'GET',
            dataType: 'json',
            data: { page: that.car_selected_page },
            success: function (data, textStatus, jqXHR) {
                that.cars = data.cars;
                that.car_total = data.total;
                that.car_pages = data.pages;
                that.calcCarPageRange();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: ' home-cmp ',
            templateUrl: 'home.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map