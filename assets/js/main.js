chart1 = document.getElementById('chart1');
chart2 = document.getElementById('chart2');
chart3 = document.getElementById('chart3');
chart4 = document.getElementById('chart4');
chart5 = document.getElementById('chart5');
chart6 = document.getElementById('chart6');

Plotly.newPlot( chart1, [{

y:['voiture', 'bus', 'train', 'avion', 'bateau', 'moto', 'vélo', 'trotinette'], 

x: [90, 40, 60, 80, 75, 92, 87, 73],

type: 'bar',

orientation: 'h'}]);

Plotly.newPlot( chart2, [{

    values: [19, 26, 55],

    labels: ['transport', 'agriculture', 'industrie'],

type: 'pie',
}]);

Plotly.newPlot( chart3, [{

    values: [19, 26, 55],

    labels: ['éléctrique', 'essence', 'diesel'],

type: 'pie',
}]);