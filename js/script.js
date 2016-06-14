$(function () {


	$("#ib1").diagramCreate({
		name: 'Vasiliy',
		bg: 'red',
		levels: [
			{
				start: 20,
				finish: 50,
				sectors: [
					{value: 30, background: "#DAEE34"},
					{value: 50, background: "#0BD2FD"},
					{value: 78, background: "#FDAE05"},
				]
			},
			
			{
				start: 55,
				finish: 75,
				sectors: [
					{value: 30, background: "#DAEE34"},
					{value: 50, background: "#0BD2FD"},
					{value: 78, background: "#FDAE05"},
				]
			}
		]
	});

	$("#ib2").diagramCreate({
		angle: 25,
		// name: 'Vasiliy',
		sectors: [
			{value: 30, background: "#FCFF00"},
			{value: 20, background: "#eeeeee"},
			{value: 50, background: "#C03E8E"},
			{value: 50, background: "#FF6009"},
			{value: 15, background: "#6C37F1"},
		]
	});
});