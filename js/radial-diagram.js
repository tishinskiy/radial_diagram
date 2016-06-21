;(function($){

	var idNum = 0;

	var defaults = {
		angle: 0,
		sectors: {value: 1, background: "#2753B7"}
	}
	$.fn.diagramCreate = function(options){

		var domObject = $(this);
		var w = domObject.innerWidth();
		var h = domObject.innerHeight();

		var init = function(){


			var sectorProto = {

				constructor: function(value, background, procent, start, finish) {
					this.value = value;
					this.background = background;
					this.procent = procent;
					this.start = start;
					this.finish = finish;
					this.draw();
					return this;
				},

				draw: function(){
					// console.log(this);
					drawSector(this);
				}
			};

			var levelProto = {
				// angle: 0,
				constructor: function(obj) {
					this.start = obj.start;
					this.finish = obj.finish;
					this.angle = obj.angle;
					this.sectors = obj.sectors;
					this.draw();
					return this;

				},
				draw: function(){
					drawLevel(this);
				}
			};

			var objParams = $.extend({}, defaults, options);
			var ctxId = "canvas_diagram_"+idNum++;
			var newCanvas = $('<canvas width="'+w+'" height="'+h+'" id="'+ctxId+'">Обновите браузер</canvas>');
			var currentAngle = (objParams.angle * Math.PI / 180) -1.5708;
			domObject.append(newCanvas);


			var example = document.getElementById(ctxId);
			ctx = example.getContext('2d');
			ctx.fillStyle = objParams.bg;

			var drawSector = function(obj, start=20, finish=50, shadow=false) {

				// this.angle.__parent(angle);

				if(obj.start) {start = obj.start;}
				if(obj.finish) {finish = obj.finish;}

				var angle = 360 * obj.procent / 100;
				var angleRad = angle * Math.PI / 180;
				ctx.fillStyle = obj.background;
				ctx.beginPath();


				ctx.moveTo(Math.cos(currentAngle)*start + w/2, Math.sin(currentAngle)*start + h/2);
				ctx.lineTo(Math.cos(currentAngle)*finish + w/2, Math.sin(currentAngle)*finish + h/2);
				ctx.arc(w/2, h/2, finish, currentAngle, currentAngle + angleRad, false);
				ctx.lineTo(Math.cos(currentAngle + angleRad)*start + w/2, Math.sin(currentAngle + angleRad)*start + h/2);
				ctx.arc(w/2, h/2, start, currentAngle + angleRad, currentAngle, true);

				if(shadow === true) {
					ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
					ctx.shadowBlur = 20;
				}
				else {
					ctx.shadowBlur = 0;
				}

				ctx.fill();
				ctx.closePath;

				currentAngle += angleRad;
			}

			var drawLevel = function(obj) {

				var newLevel = {
					value: 1,
					background: "rgba(100, 100, 100, 0.5)",
					procent: 100,
				}

				if(obj.angle) {
					currentAngle = (obj.angle * Math.PI / 180) -1.5708;
				}


				drawSector(newLevel, obj.start, obj.finish, shadow = true);

				var sectors = obj.sectors;
				var total = 0;
				var angle = 0;
				var procent = 0;


				var sectorCreate = function(value, background) {
					procent = value * 100 / total;
					angle = value * 360 / total;
					sectors.push(Object.create(sectorProto).constructor(value, background, procent, obj.start, obj.finish));
				}

				if(Array.isArray(obj.sectors)){
					obj.sectors.forEach(function(item, i, arr){
						total += item.value;
					});

					obj.sectors.forEach(function(item, i, arr){
						sectorCreate(item.value, item.background);
					});
				}
				else {
					obj.sectors.push(Object.create(sectorProto).constructor(obj.sectors.value, obj.sectors.background));
					total = obj.sectors.value;
					sectorCreate(obj.sectors.value, obj.sectors.background);
				}

			}

			var diagramm = {

				center: [100, 100],
				startRadius: 20,
				fitishRadius: 100,
				levels: [],
				sectors: [],

				init: function(){

					var sectors = this.sectors;
					var levels = this.levels;
					var total = 0;
					var angle = 0;
					var procent = 0;

					var sectorCreate = function(value, background, start, finish) {
						procent = value * 100 / total;
						angle = value * 360 / total;
						sectors.push(Object.create(sectorProto).constructor(value, background, procent, start, finish));

					}

					if(objParams.levels) {
						objParams.levels.forEach(function(item, i, arr){
							levels.push(Object.create(levelProto).constructor(item));
						});
					}

					if(Array.isArray(objParams.sectors)){
						objParams.sectors.forEach(function(item, i, arr){
							total += item.value;
						});

						objParams.sectors.forEach(function(item, i, arr){
							sectorCreate(item.value, item.background);
						});
					}
					else {
						sectors.push(Object.create(sectorProto).constructor(objParams.sectors.value, objParams.sectors.background));
						total = objParams.sectors.value;
						sectorCreate(objParams.sectors.value, objParams.sectors.background );
					}
				}
			};

			diagramm.init();
		}

		init();
	}

})(jQuery);


