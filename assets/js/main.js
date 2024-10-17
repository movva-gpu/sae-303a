const chart1 = document.getElementById('chart1');
const chart2 = document.getElementById('chart2');
const chart3 = document.getElementById('chart3');
const chart4 = document.getElementById('chart4');
const chart5 = document.getElementById('chart5');
const chart6 = document.getElementById('chart6');

Plotly.newPlot( chart1, [{

y:['voiture', 'bus', 'train', 'avion', 'bateau', 'moto', 'vélo', 'trotinette'], 

x: [90, 40, 60, 80, 75, 92, 87, 73],

type: 'bar',

orientation: 'h'}]);

Plotly.newPlot( chart2, [{

    values: [11, 14, 43, 13, 7, 12],

    labels: ['autres secteurs', 'residentiel', 'industrie et construction', 'énergie hors électricité', 'production d\'électricité'],

type: 'pie',
}]);

Plotly.newPlot( chart3, [{

    values: [19, 26, 55],

    labels: ['diesel thermique', 'essence', 'diesel hybride non rechargeable', 'essence', 'essence hybride non recheargeable'],
type: 'pie',
}]);

Plotly.newPlot('chart4',
  [
    {
      type: 'scattergeo',
      mode: 'markers',
      locations: ['FRA', 'DEU', 'RUS', 'ESP'],
      marker: {
        size: [20, 30, 15, 10],
        color: [10, 20, 40, 50],
        cmin: 0,
        cmax: 50,
        colorscale: 'Greens',
        colorbar: {
          title: 'Some rate',
          ticksuffix: '%',
          showticksuffix: 'last',
        },
        line: {
          color: 'black',
        },
      },
      name: 'europe data',
    },
  ],
  {
    geo: {
      scope: 'europe',
      resolution: 50,
      projection: {
        type: 'mercator',
        scale: 5,
      },
      center: { lon: 2.2137, lat: 46.2276 },
    },
    width: 800,
    height: 600,
  },
);

Plotly.newPlot(
  'chart5',
  [
    {
      type: 'scattergeo',
      mode: 'markers',
      locations: ['FRA', 'DEU', 'RUS', 'ESP'],
      marker: {
        size: [20, 30, 15, 10],
        color: [10, 20, 40, 50],
        cmin: 0,
        cmax: 50,
        colorscale: 'Greens',
        colorbar: {
          title: 'Some rate',
          ticksuffix: '%',
          showticksuffix: 'last',
        },
        line: {
          color: 'black',
        },
      },
      name: 'europe data',
    },
  ],
  {
    geo: {
      scope: 'europe',
      resolution: 50,
      projection: {
        type: 'mercator',
        scale: 5,
      },
      center: { lon: 2.2137, lat: 46.2276 },
    },
    width: 800,
    height: 600,
  },
);
