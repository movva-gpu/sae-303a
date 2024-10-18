document.addEventListener('DOMContentLoaded', () => {
  const chart1 = document.getElementById('chart-1');
  const chart2 = document.getElementById('chart-2');
  const chart3 = document.getElementById('chart-3');
  const chart4 = document.getElementById('chart-4');
  const chart5 = document.getElementById('chart-5');

  const chart2FieldSet = document.getElementById('chart-2-fs');
  const chart3FieldSet = document.getElementById('chart-3-fs');

  Plotly.newPlot(chart1,
    [{
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
    }],
    {
      xaxis: {
        range: [0, 100],
        title: 'Pourcentage (%)'
      },
      title: 'Répartition des types de transports',
  });

  const chart2Values = {
    2018: [12, 13, 41, 13, 9, 12],
    2021: [11, 14, 43, 13, 7, 12],
  };
  Plotly.newPlot(chart2,
    [{
      values: chart2Values[2021],
      type: 'pie',
      labels: [
        'Autres secteurs',
        'Residentiel',
        'Transport',
        'Industrie et construction',
        'Energie hors électricité',
        'Production d\'électricité'
      ],
    }]
  );
  chart2FieldSet.addEventListener('input', (e) => {
    Plotly.animate(chart2,
      {
        data: [{
          values: chart2Values[e.target.value],
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
    );
  });

  const chart3Values = {
    2022: [55.2, 0.3, 40.1, 2.1, 1, 0.8, 0.5],
    2023: [50.7, 0.4, 40.4, 2.9, 1.5, 1.1, 0.6],
  };
  Plotly.newPlot(chart3,
    [{
      values: chart3Values[2023],
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
    }]
  );
  chart3FieldSet.addEventListener('input', (e) => {
    Plotly.animate(chart3,
      {
        data: [{
          values: chart3Values[e.target.value],
        }],
        traces: [0],
        layout: {},
      },
      {
        transition: {
          duration: 500,
          easing: 'cubic-in-out',
        },
      }
    );
  });

  fetch("data/addmap.json").then(res => {
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
          line: {
            color: 'black',
          },
        },
      }],
      {
        title: 'Stations électriques contsruites en 2021',
        geo: {
          scope: 'europe',
          resolution: 50,
          projection: {
            type: 'mercator',
            scale: 5,
          },
          center: { lon: 2.2137, lat: 46.2276 },
        },
        width: 600,
        height: 600,
      },
    );

    document.getElementById('years').addEventListener('input', e => {
      Plotly.animate(chart4,
        {
          data: [{
            lon: res[e.target.value].lon,
            lat: res[e.target.value].lat,
            marker: {
              size: res[e.target.value].counts.map(v => Math.log2(v)),
            }
          }],
          traces: [0],
          layout: {
            title: 'Stations électriques contsruites en ' + e.target.value,
          },
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
      );
    });
  });

  fetch("data/totalmap.json").then(res => {
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
          line: {
            color: 'black',
          },
        },
      }],
      {
        title: 'Stations électriques contsruites (total) en 2021',
        geo: {
          scope: 'europe',
          resolution: 50,
          projection: {
            type: 'mercator',
            scale: 5,
          },
          center: { lon: 2.2137, lat: 46.2276 },
        },
        width: 600,
        height: 600,
      },
    );

    document.getElementById('years').addEventListener('input', e => {
      Plotly.animate(chart5,
        {
          data: [{
            lon: res[e.target.value].lon,
            lat: res[e.target.value].lat,
            marker: {
              size: res[e.target.value].counts.map(v => Math.log2(v)),
            }
          }],
          traces: [0],
          layout: {
            title: 'Stations électriques contsruites (total) en ' + e.target.value
          },
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
