'use strict';

function Slider(options) {
	this._parent = options.slider;
	//slider create
	this._slider = document.createElement('div');
	this._slider.classList.add('slider');

	//thumb create
	this._thumb = document.createElement('div');
	this._thumb.classList.add('thumb');
	this._slider.appendChild(this._thumb);
	//append slider
	this._parent.appendChild(this._slider);

	//progress create
	this._progress = document.createElement('span');
	this._progress.classList.add('progress');
	this._progress.innerHTML = '0 %';
	this._parent.insertBefore(this._progress, this._slider);

	// metrics
	var sliderWidth = this._slider.clientWidth;
	var sliderLeft = this._slider.getBoundingClientRect().left;
	var thumbWidth = this._thumb.clientWidth;
	var sliderLeftMax = this._slider.clientWidth - thumbWidth;
	var thumbHalfWidth = thumbWidth / 2;

	function getProgress(prog) {
		return parseInt(prog * 100 / (sliderWidth - thumbWidth));
	}

	var thumb = this._thumb;
	var progress = this._progress;

	// move on slider click
	this._slider.addEventListener('mousedown', function (e) {

		if (e.target == this) {
			var delta = e.pageX - sliderLeft;
			var left = delta - thumbHalfWidth;

			if (delta < thumbHalfWidth) {
				left = 0;
			}

			if (delta > this.clientWidth - thumbHalfWidth) {
				left = sliderLeftMax;
			}

			thumb.style.left = left + 'px';
			progress.innerHTML = getProgress(left) + ' %';
		}
	});

	//move on mousemove
	thumb.onmousedown = function (e) {
		var stylesLeft = thumb.getBoundingClientRect().left;
		var thumbLeft = stylesLeft + pageXOffset;
		var shiftX = e.pageX - thumbLeft;

		function moveslider(e) {
			var tempLeft = e.pageX - shiftX - sliderLeft;

			if (tempLeft < 0) {
				tempLeft = 0;
			}

			if (tempLeft > sliderLeftMax) {
				tempLeft = sliderLeftMax;
			}

			thumb.style.left = tempLeft + 'px';
			progress.innerHTML = getProgress(tempLeft) + ' %';
		}

		document.addEventListener('mousemove', moveslider);

		thumb.onmouseup = document.onmouseup = function () {
			thumb.onmouseup = null;
			document.removeEventListener('mousemove', moveslider);
		}
	};

	thumb.ondragstart = function () {
		return false;
	};

}

new Slider({
	slider: document.getElementById('slider-box1')
});
new Slider({
	slider: document.getElementById('slider-box2')
});
new Slider({
	slider: document.getElementById('slider-box3')
});