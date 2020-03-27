import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './canvasjs.min';
 
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'burg-view';

	ngOnInit() {
	let dataPoints = [];
	let dpsLength = 0;
	let chart = new CanvasJS.Chart("chartContainer",{
		exportEnabled: true,
		title:{
			text:"Live Chart with Data-Points from External JSON"
		},
		data: [{
			type: "spline",
			dataPoints : dataPoints,
		}]
	});
	
	$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function(data) {
		$.each(data, function(key, value){
			dataPoints.push({x: value[0], y: parseInt(value[1])});
		});
		dpsLength = dataPoints.length;
		chart.render();
		updateChart();
	});

	function updateChart() {
	$.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function(data) {
		$.each(data, function(key, value) {
			dataPoints.push({
			x: parseInt(value[0]),
			y: parseInt(value[1])
			});
			dpsLength++;
		});
		
		if (dataPoints.length >  20 ) {
      		dataPoints.shift();				
      	}
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	});
    }
}

}
