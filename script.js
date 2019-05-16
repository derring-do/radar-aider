var myCanvas = document.getElementById('chart-0');
var ctx = document.getElementById('chart-0').getContext('2d');

var names = document.querySelector("#names").innerHTML.split(",")
var attributes = document.querySelector("#attributes").innerHTML.split(",")

var palette = ["rgba(255,204,51,0.3)", "rgba(51,153,153,0.3)", "rgba(255,0,0,0.3)"]
var datasets = [];

function updateConfigByMutating() {
  datasets2 = [];
  var names2 = document.querySelector("#names").value.split(",");
  var attributes2 = document.querySelector("#attributes").value.split(",")
  makeData(names2, attributes2, datasets2)
  myChart.data.labels = attributes2;
  myChart.data.datasets = datasets2;
  myChart.update();
  }

var myChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: attributes,
    datasets: datasets
  },
  options: {
    scale: {
      pointLabels: {
        fontSize: 14 
      },
      ticks: {
        max: 3, 
        min: 0,
        stepSize: 1
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

function makeData(names, attributes, datasets) {
for(i=0; i<names.length; i++) {
  var data = {
    label: names[i],
    data: Array(attributes.length).fill(myChart.options.scale.ticks.max - (i+.25)),
    backgroundColor: palette[i],
    pointRadius: 10,
    pointHoverRadius: 10
    };
    console.log(data)
    datasets.push(data)
};
}

makeData(names, attributes, datasets);

