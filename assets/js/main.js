document.addEventListener('DOMContentLoaded', () => {
  const chart1 = document.getElementById('chart1');
  const chart2 = document.getElementById('chart2');
  const chart3 = document.getElementById('chart3');
  const chart4 = document.getElementById('chart4');
  const chart5 = document.getElementById('chart5');
  const chart6 = document.getElementById('chart6');

Plotly.newPlot('chart1', [{
    x: [60, 2, 7, 2, 1, 26],
    type: 'bar',
    orientation: 'h',
    y: [
        'Voiture',
        'Bus',
        'Train',
        'Avion',
        'Bateau',
        'Moto',
        'Transport routier de marchandises'
    ]

}], {
    xaxis: {
        range: [0, 100],
        title: 'Pourcentage (%)'
    },
    title: 'Répartition des types de transports',
});
Plotly.newPlot( chart2, [{
    values: [11, 14, 43, 13, 7, 12],
    type: 'pie',
    labels: [
        'Autres secteurs',
        'Residentiel',
        "transport",
        'Industrie et construction',
        'Energie hors électricité',
        'Production d\'électricité'
      ],

}]);

Plotly.newPlot( chart3, [{
    values: [55.2, 0.3, 40.1, 2.1, 1, 0.8, 0.5],
    type: 'pie',
    labels: [
        'Diesel thermique',
        'Diesel hybride non rechargeable',
        'Essence',
        'Essence hybride non recheargeable',
        'Electricité et hydrogène',
        'Hybride rechargeable',
        'Bicarburation essence-gpl'
    ],
}]);

  fetch("/data/addmap.json").then(res => {
    if (!res.ok) {
      throw new Error('Unable to load addmap.json.');
    }
    return res.json()
  }).then(res => {
    Plotly.newPlot(chart4,
      [{
        name: 'Europe',
        type: 'scattergeo',
        mode: 'markers',
        lon: res[2021].lon,
        lat: res[2021].lat,
        marker: {
          size: res[2021].counts.map(v => Math.log2(v)),
          // color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
          line: {
            color: 'black',
          },
        },
      }],
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

    let count = 0;
    document.getElementById('btn').addEventListener('mousedown', e => {
      e.preventDefault();
      count++;
      Plotly.animate(chart4,
        {
          data: [{
            lon: res[2021+count%4].lon,
            lat: res[2021+count%4].lat,
            marker: {
              size: res[2021+count%4].counts.map(v => Math.log2(v)),
            }
          }],
          traces: [0],
          layout: {},
        },
        {
          transition: {
            duration: 500,
            easing: 'cubic-in-out',
          },
          frame: {
            duration: 500,
          }
        }
      )
    });
  });

  fetch("/data/totalmap.json").then(res => {
    if (!res.ok) {
      throw new Error('Unable to load addmap.json.');
    }
    return res.json()
  }).then(res => {
    Plotly.newPlot(chart5,
      [{
        name: 'Europe',
        type: 'scattergeo',
        mode: 'markers',
        lon: res[2021].lon,
        lat: res[2021].lat,
        marker: {
          size: res[2021].counts.map(v => Math.log2(v)),
          // color: [10, 20, 40, 50],
          cmin: 0,
          cmax: 50,
          colorscale: 'Greens',
          line: {
            color: 'black',
          },
        },
      }],
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

    let count = 0;
    document.getElementById('btn').addEventListener('mousedown', e => {
      e.preventDefault();
      count++;
      Plotly.animate(chart5,
        {
          data: [{
            lon: res[2021+count%4].lon,
            lat: res[2021+count%4].lat,
            marker: {
              size: res[2021+count%4].counts.map(v => Math.log2(v)),
            }
          }],
          traces: [0],
          layout: {},
        },
        {
          transition: {
            duration: 500,
            easing: 'cubic-in-out',
          },
          frame: {
            duration: 500,
          }
        }
      )
    });
  });
});
