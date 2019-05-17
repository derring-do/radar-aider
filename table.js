var tableData = [
    {name:"Meganium", hp: 80, att: 90, def: 99, spatt: 80, spdef: 78, speed: 102},
	{name:"Feraligatr", hp: 78, att: 90, def: 99, spatt: 80, spdef: 78, speed: 102},
	{name:"Typhlosion", hp: 85, att: 90, def: 99, spatt: 80, spdef: 78, speed: 102}
];

var table = new Tabulator("#example-table", {
	data: tableData,          //load row data from array
	layout:"fitColumns",      //fit columns to width of table
	responsiveLayout:"hide",  //hide columns that dont fit on the table
	tooltips:true,            //show tool tips on cells
	addRowPos:"top",          //when adding a new row, add it to the top of the table
	history:true,             //allow undo and redo actions on the table
	pagination:"local",       //paginate the data
	paginationSize:7,         //allow 7 rows per page of data
	movableColumns:true,      //allow column order to be changed
	resizableRows:true,       //allow row order to be changed
	initialSort:[             //set the initial sort order of the data
		{column:"name", dir:"asc"},
	],
	columns:[                 //define the table columns
		{title:"Name", field:"name", editor:"input"},
		{title:"HP", field:"hp", editor:"input"},
		{title:"Attack", field:"att", editor:"input"},
		{title:"Defense", field:"def", editor:"input"},
		{title:"Special Attack", field:"spatt", editor:"input"},
		{title:"Special Defense", field:"spdef", editor:"input"},
		{title:"Speed", field:"speed", editor:"input"},
	],
});

// table rows to radar polygons (legend)
for(var legend=[], tr = table.rowManager.rows, i=0; i<tr.length;i++) {
	legend.push(tr[i].data.name)
}; legend

// table columns to radar labels
for(var radarLabels=[], tc = table.columnManager.columns, i=1; i<tc.length;i++) {
	radarLabels.push(tc[i].definition.title)
}; radarLabels

// format radar data from table / table construct
var radarData = {
	    labels: radarLabels,
    datasets: [{
        label: "Meganium",
        data: [80, 82, 100, 83, 100, 80],
        backgroundColor: "rgba(98, 189, 65, .3)",
        pointRadius: 5,
        pointHoverRadius: 10
    },
    {
        label: "Feraligatr",
        data: [78, 84, 78, 109, 85, 100],
        backgroundColor: "rgba(57, 139, 205, 0.3)",
        pointRadius: 5,
        pointHoverRadius: 10
    },
    {
        label: "Typhlosion",
        data: [85, 105, 100, 79, 83, 78],
        backgroundColor: "rgba(222, 0, 0, 0.3)",
        pointRadius: 5,
        pointHoverRadius: 10
    }]
}

