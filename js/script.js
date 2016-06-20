$(function () {

	$("#ib1").diagramCreate({

		levels: [
			{
				start: 15,
				finish: 55,
				sectors: [
					{value: 20, background: "#DAEE34"},
					{value: 40, background: "#0BD2FD"},
					{value: 78, background: "#FDAE05"},
				]
			},
			{
				start: 70,
				finish: 95,
				angle: 15,
				sectors: [
					{value: 30, background: "#7DCF09"},
					{value: 50, background: "#0BD2FD"},
					{value: 20, background: "#053AA6"},
					{value: 78, background: "#FD6E05"},
					{value: 60, background: "#A91008"},
				]
			},
			{
				start: 100,
				finish: 120,
				angle: -25,
				sectors: [
					{value: 30, background: "#DFFFB1"},
					{value: 30, background: "#B1ECFF"},
				]
			}
		]
	});
});