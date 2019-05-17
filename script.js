var myCanvas = document.getElementById('chart-0');
var ctx = document.getElementById('chart-0').getContext('2d');

// [] some kind of listener on any change to the table to update the radar chart
// [] calc max based on values

var myChart = new Chart(ctx, {
  type: 'radar',
  data: radarData,
  options: {
    title: {
      display: true,
      text: "Construct"
    },
    scale: {
      pointLabels: {
        fontSize: 14
      },
      ticks: {
        max: 120,
        min: 0,
        stepSize: 0
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    },

    //tooltips: {
    //  callbacks: {
    //    title: function(tooltipItems, data) {
    //      console.log(tooltipItems);
    //      console.log(data);
    //      return new Date().toLocaleTimeString();
    //    }
    //  }
    //},

    dragData: true,
    dragX: true,
    dragDataRound: 1,
    onDragEnd: function (event, datasetIndex, index, value) {
      console.log(`datasetIndex:${datasetIndex}, index:${index}, value:${value}`);
      document.getElementById('item').innerHTML = myChart.config.data.labels[index];
      document.getElementById('value').innerHTML = value;
    },
  }
});