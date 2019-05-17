var myCanvas = document.getElementById('chart-0');
var ctx = document.getElementById('chart-0').getContext('2d');

// Populate input fields with default data
for(names = [], i=0; i<data.datasets.length; i++) {
  names.push(data.datasets[i].label)
}

document.querySelector("#names").value = names.join().replace(/,/g, "\n");
document.querySelector("#attributes").value = data.labels.join().replace(/,/g, "\n");

// Define pallette for names
var palette = [
 " rgba(8, 7, 8, 1)",
  "rgba(55, 114, 255, 1)",
  "rgba(223, 41, 53, 1)",
  "rgba(253, 202, 64, 1)",
  "rgba(230, 232, 230, 1)"
];

function updateConfigByMutating() {
  datasets2 = [];
  var names2 = document.querySelector("#names").value.split("\n");
  var attributes2 = document.querySelector("#attributes").value.split("\n")
  makeData(names2, attributes2, datasets2)
  myChart.data.labels = attributes2;
  myChart.data.datasets = datasets2;
  myChart.update();
  }

var myChart = new Chart(ctx, {
  type: 'radar',
  data: data,
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
    onDragEnd: function(event, datasetIndex, index, value) {
      console.log(`datasetIndex:${datasetIndex}, index:${index}, value:${value}`);
      document.getElementById('item').innerHTML = myChart.config.data.labels[index];
      document.getElementById('value').innerHTML = value;
    },
  }
});

// function makeData(names, attributes, datasets) {
// for(i=0; i<names.length; i++) {
//   var data = {
//     label: names[i],
//     data: Array(attributes.length).fill(myChart.options.scale.ticks.max - (i+.25)),
//     backgroundColor: palette[i],
//     pointRadius: 10,
//     pointHoverRadius: 10
//     };
//     console.log(data)
//     datasets.push(data)
// };
// }

// makeData(names, attributes, datasets);

