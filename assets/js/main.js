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

d3.csv('consolidation-etalab-schema-irve-statique-v-2.3.1-20241004.csv', function(err, rows){

    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    var cityName = unpack(rows, 'name'),
        cityPop = unpack(rows, 'pop'),
        cityLat = unpack(rows, 'lat'),
        cityLon = unpack(rows, 'lon'),
        color = [,"rgb(255,65,54)","rgb(133,20,75)","rgb(255,133,27)","lightgrey"],
        citySize = [],
        hoverText = [],
        scale = 50000;

    for ( var i = 0 ; i < cityPop.length; i++) {
        var currentSize = cityPop[i] / scale;
        var currentText = cityName[i] + " pop: " + cityPop[i];
        citySize.push(currentSize);
        hoverText.push(currentText);
    }

    var data = [{
        type: 'scattergeo',
        locationmode: 'USA-states',
        lat: cityLat,
        lon: cityLon,
        hoverinfo: 'text',
        text: hoverText,
        marker: {
            size: citySize,
            line: {
                color: 'black',
                width: 2
            },
        }
    }];

    var layout = {
        title: '2014 US City Populations',
        showlegend: false,
        geo: {
            scope: 'usa',
            projection: {
                type: 'albers usa'
            },
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            subunitwidth: 1,
            countrywidth: 1,
            subunitcolor: 'rgb(255,255,255)',
            countrycolor: 'rgb(255,255,255)'
        },
    };

    Plotly.newPlot("chart4", data, layout, {showLink: false});

});
