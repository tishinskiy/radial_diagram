;(function($){

	var idNum = 0;

	var defaults = {
		angle: 0,
		name: 'noname',
		age: 12,
		bg: "#ccc",
		total: 3,
		sectors: {value: 1, background: "#2753B7"}
	}
	$.fn.diagramCreate = function(options){

		var domObject = $(this);

		var init = function(){


			var sectorProto = {
				angle: 0,
				constructor: function(value, background, procent) {
					this.value = value;
					this.background = background;
					this.procent = procent;
					return this;
				},
				draw: function(){
					drawSector(this);
				}
			};


			var objParams = $.extend({}, defaults, options);
			var ctxId = "canvas_diagram_"+idNum++;
			var newCanvas = $('<canvas width="300" id="'+ctxId+'">Обновите браузер</canvas>');
			var currentAngle = (objParams.angle * Math.PI / 180) -1.5708;
			domObject.append(newCanvas);


			var example = document.getElementById(ctxId);
			ctx = example.getContext('2d');
			ctx.fillStyle = objParams.bg;

			var drawSector = function(obj) {

				var angle = 360 * obj.procent / 100;
				var angleRad = angle * Math.PI / 180;
				ctx.fillStyle = obj.background;
				ctx.beginPath();

				ctx.moveTo(Math.cos(currentAngle)*20 + 100, Math.sin(currentAngle)*20 + 100);
				ctx.lineTo(Math.cos(currentAngle)*50 + 100, Math.sin(currentAngle)*50 + 100);
				ctx.arc(100, 100, 50, currentAngle, currentAngle + angleRad, false);
				ctx.lineTo(Math.cos(currentAngle + angleRad)*20 + 100, Math.sin(currentAngle + angleRad)*20 + 100);
				ctx.arc(100, 100, 20, currentAngle + angleRad, currentAngle, true);

				ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
				ctx.shadowBlur = 20;

				ctx.fill();

				currentAngle += angleRad;
			}

			var diagramm = {

				center: [100, 100],
				startRadius: 20,
				fitishRadius: 100,
				total: objParams.total,
				sectors: [],

				init: function(){

					var sectors = this.sectors;
					var total = 0;
					var angle = 0;
					var procent = 0;

					var sectorCreate = function(value, background) {
						procent = value * 100 / total;
						angle = value * 360 / total;
						var t = Object.create(sectorProto).constructor(value, background, procent);
						sectors.push(t);
						// console.log(t);
						t.draw();
					}

					if(Array.isArray(objParams.sectors)){
						objParams.sectors.forEach(function(item, i, arr){
							total += item.value;
						});
						objParams.sectors.forEach(function(item, i, arr){
							sectorCreate(item.value, item.background, total);
						});
					}
					else {
						sectors.push(Object.create(sectorProto).constructor(objParams.sectors.value, objParams.sectors.background));
						total = objParams.sectors.value;
						sectorCreate(objParams.sectors.value, objParams.sectors.background );
					}
					// console.log(this.sectors);
					// ctx.arc(x, y, radius, startAngle, endAngle, antiClockwise);
				}
			};

			diagramm.init();

		}

		init();
	}
})(jQuery);


