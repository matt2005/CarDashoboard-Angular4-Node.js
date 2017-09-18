import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import initVectorMap = require('../../../assets/js/init/initVectorMap.js');
import initCharts = require('../../../assets/js/init/charts.js');
import initAniCharts = require('../../../assets/js/init/initAniCharts.js');
import initTooltips= require('../../../assets/js/init/initTooltips.js');
import initNotify= require('../../../assets/js/init/notify.js');

@Component({
    moduleId: module.id,
    selector: ' home-cmp ',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit{
    constructor(private http: Http) { }

    private car_selected_page: number = 1;
    private car_start_page: number;
    private car_end_page: number;
    private car_page_range: any;
    // private car_list_url: string = 'http://autogate.webscrapers.com.au/api/get_cars.php';
    private car_list_url: string = 'http://localhost:3006/get_cars';
    private cars: any;
    private car_total: number;
    private car_pages: number;

    ngOnInit(){
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
            data: {page: 1},
            success: function(data, textStatus, jqXHR ) {
                that.cars = data.cars;
                that.car_total = data.total;
                that.car_pages = data.pages;
                that.calcCarPageRange();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }

    calcCarPageRange() {
        if(this.car_selected_page % 10)
            this.car_start_page = Math.floor(this.car_selected_page / 10) * 10 + 1;
        else
            this.car_start_page = Math.floor(this.car_selected_page / 10) * 10 - 9;
        this.car_end_page = this.car_start_page + 9;
        if(this.car_end_page > this.car_pages)
            this.car_end_page = this.car_pages;
        this.car_page_range = [];
        var index = 0;
        for(var i = this.car_start_page; i <= this.car_end_page; i++) {
            this.car_page_range[index] = i;
            index++;
        }
    }

    goCarPage(page: any) {
        if(page == 'next') {
            if(this.car_selected_page == this.car_pages)
                return;
            this.car_selected_page++;
        } else if(page == 'prev') {
            if(this.car_selected_page == 1)
                return;
            this.car_selected_page--;
        } else {
            this.car_selected_page = page;
        }
        this.calcCarPageRange();

        var that = this;
        $.ajax({
            url: that.car_list_url,
            type: 'GET',
            dataType: 'json',
            data: {page: that.car_selected_page},
            success: function(data, textStatus, jqXHR ) {
                that.cars = data.cars;
                that.car_total = data.total;
                that.car_pages = data.pages;
                that.calcCarPageRange();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    }
}
