import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './canvasjs.min';
import { WebsocketService } from './websocket.service';
import { StatsService } from './stats.service';

var dataPointsWheat = [];
var dataPointsFlour = [];
var dataPointsBread = [];

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [WebsocketService, StatsService]
})
export class AppComponent implements OnInit {
	title = 'burg-view';

	constructor(private statsService: StatsService) {
		statsService.messages.subscribe(msg => {
			console.log("Response from websocket: " + JSON.stringify(msg));

			dataPointsWheat.push({x: dataPointsWheat.length, y: msg.wheat});
			dataPointsFlour.push({x: dataPointsFlour.length, y: msg.flour});
			dataPointsBread.push({x: dataPointsBread.length, y: msg.bread});
		});
	}

	ngOnInit() {
		let chart = new CanvasJS.Chart("chartContainer",{
			exportEnabled: true,
			title:{
				text:"Live Chart with Data-Points from External JSON"
			},
			data: [{
				type: "spline",
				dataPoints : dataPointsWheat
			},
			{
				type: "spline",
				dataPoints : dataPointsFlour
			},
			{
				type: "spline",
				dataPoints : dataPointsBread
			}]
		});

		dataPointsWheat.push({x: 0, y: 0});
		dataPointsFlour.push({x: 0, y: 0});
		dataPointsBread.push({x: 0, y: 0});

		chart.render();
		updateChart();

		function updateChart() {

			//if (dataPoints.length >  20 ) {
			//	dataPoints.shift();
			//}

			chart.render();
			setTimeout(function(){updateChart()}, 1000);
		}
	}
}
