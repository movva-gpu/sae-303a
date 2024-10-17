document.addEventListener('DOMContentLoaded', () => {
  const chart1 = document.getElementById('chart1');
  const chart2 = document.getElementById('chart2');
  const chart3 = document.getElementById('chart3');
  const chart4 = document.getElementById('chart4');
  const chart5 = document.getElementById('chart5');
  const chart6 = document.getElementById('chart6');

  Plotly.newPlot(chart1,
    [{
      type: 'bar',
      orientation: 'h',
      x: [90, 40, 60, 80, 75, 92, 87, 73],
      y: [
        'Voitures',
        'Bus',
        'Trains',
        'Avions',
        'Bateaux',
        'Motos',
        'Vélos',
        'Trotinettes',
      ],
    }]
  );

  Plotly.newPlot(chart2,
    [{
      type: 'pie',
      values: [11, 14, 43, 13, 7, 12],
      labels: [
        'Autres secteurs',
        'Résidentiel',
        'Industrie et construction',
        'Énergie hors électricité',
        'Production d\'électricité',
      ],
    }]
  );

  Plotly.newPlot(chart3,
    [{
      type: 'pie',
      values: [19, 26, 55],
      labels: [
        'Diesel thermique',
        'Essence',
        'Diesel hybride non rechargeable',
        'Essence',
        'Essence hybride non recheargeable',
      ],
    }]
  );

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
