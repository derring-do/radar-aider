var palette = ["rgba(98, 189, 65, .3)",
"rgba(57, 139, 205, 0.3)",
"rgba(222, 0, 0, 0.3)"
];

var tableData = [
    {name:"Meganium",   hp: 80, att: 82, def: 100, spatt: 83, spdef: 100, speed: 80},
	{name:"Feraligatr", hp: 78, att: 84, def: 78, spatt: 109, spdef: 85, speed: 100},
	{name:"Typhlosion", hp: 85, att: 105, def: 100, spatt: 79, spdef: 63, speed: 78}
];

function radarValuesToTableValues() {
	var newTableData = []
	for (var rd = myChart.data.datasets, i = 0; i < rd.length; i++) {
		rname = '{ "name": "' + rd[i].label + '"'; 
		nums = [];
		for (var l = myChart.data.labels, j = 0; j < l.length; j++) {
			nums.push('"' + l[j] + '": ' + rd[i].data[j])
			entry = rname + ", " + nums.join(", ")
		}
		var entryObj = JSON.parse(entry + "}")
		newTableData.push(entryObj)
	}
	return(newTableData)
}

// var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');

var table = new Tabulator("#example-table", {
	data: tableData,          //load row data from array
	movableRows: true,
    rowHeader:{headerSort:false, resizable: false, minWidth:30, width:30, rowHandle:true, formatter:"handle"},
	reactiveData:true, 
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	pagination:"local",       //paginate the data
	paginationSize:7,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	// initialSort:[             //set the initial sort order of the data
	// 	{column:"name", dir:"asc"},
	// ],
	columns:[                 //define the table columns
		{title:"name", field:"name", editor:"input", editableTitle:true},
		{title:"hp", field:"hp", editor:"input", editableTitle:true},
		{title:"att", field:"att", editor:"input", editableTitle:true},
		{title:"def", field:"def", editor:"input", editableTitle:true},
		{title:"spatt", field:"spatt", editor:"input", editableTitle:true},
		{title:"spdef", field:"spdef", editor:"input", editableTitle:true},
		{title:"speed", field:"speed", editor:"input", editableTitle:true},
	],
});

// table columns to radar labels

function tableColumnsToRadarLabels() { // exclude naming column by changing i
	for(var radarLabels=[], tc = table.columnManager.columns, i=2; i<tc.length;i++) {
		radarLabels.push(tc[i].definition.title)
	}
	return(radarLabels)
}

function tableRowsToRadarPolygons() {
	for (var radarDatasets = [], tr = table.getData(), i = 0; i < tr.length; i++) {
		var entry = {
			label: tr[i].name,
			data: Object.values(tr[i]).slice(1, tr[i].length),
			backgroundColor: palette[i],
			pointRadius: 5,
			pointHoverRadius: 10
		}
		radarDatasets.push(entry)
	}
	return(radarDatasets)
}


// table rows to radar polygons (legend)

// format radar data from table / table construct
var radarData = {
		labels: tableColumnsToRadarLabels(), // will the label order match? label order appears to match
		datasets: tableRowsToRadarPolygons()
}

function updateRadar() {
	var newData = {
		labels: tableColumnsToRadarLabels(), // will the label order match? label order appears to match
		datasets: tableRowsToRadarPolygons() 
	}
	myChart.data = newData;
	myChart.update();
}

function updateTable() {
	table.setData(radarValuesToTableValues())
}

