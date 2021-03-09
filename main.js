/**
 *
 * @param {string} sliderId => id of the slider element
 * @param {int} multiplier
 */
function InfinitySlider(sliderId, multiplier) {
  /**
   * slider selector: put the id of the element where slider is to be shown
   */
  this.slider = document.getElementById(sliderId);

  /**
   * slide distance from left
   */
  this.slideWidth = multiplier || 100;

  /**
   * selector of items in the slider
   */
  this.slides = document.querySelectorAll(`#${sliderId} li`);

  /**
   * position of slide at center
   */
  this.middleSlidePosition = Math.ceil(this.slides.length / 2);

  /**
   * total number of slides in the slider
   */
  this.numberOfSlides = Number.parseInt(this.slides.length);

  /**
   * initialize the slider: set position and z-index
   */
  this.initializeSlider = () => {
    this.slider.classList.add('inifinity-slider');
    this.slides.forEach((slide, index) => {
      slide.classList.add('infinity-slide');
      slide.setAttribute('data-pos', index);
      slide.style.left = `${this.setSlideAlignment(slide)}px`;
      slide.classList.remove('infinity-active');
      if (index + 1 === this.middleSlidePosition) {
        slide.classList.add('infinity-active');
      }
    });
  };

  /**
   * set the z-index of the slide
   * @param {int} slidePosition => at which position the slide is
   */
  this.setSlideZIndex = (slidePosition) => {
    /**
     * slide at centre will have greatest z-index
     */
    if (this.middleSlidePosition === slidePosition) {
      return 999999;
    } else if (this.middleSlidePosition > slidePosition) {
      /**
       * slides on the left of middle slide
       */
      return slidePosition + 1;
    } else {
      /**
       * slides on the right of middle slide
       * 7 - 4 + 1 (5 => 4)
       */
      return this.numberOfSlides + 1 - slidePosition;
    }
  };

  /**
   * set the alignment of the slide inside the container to align properly
   * @param {string} slide
   */
  this.setSlideAlignment = (slide) => {
    return (this.getSlidePosition(slide) + 1) * this.slideWidth;
  };

  /**
   * @param {string} => slide whose position has to be found
   */
  this.getSlidePosition = (slide) => {
    return Number.parseInt(slide.dataset.pos);
  };

  /**
   * @param {string} => slide whose position has to be set
   * @param {string} => left or right (which side the slides should move)
   */
  this.setSlidePosition = (slide, direction) => {
    if (direction === 'left') {
      /**
       * 0 => 7
       */
      return this.getSlidePosition(slide) - 1 < 0
        ? this.numberOfSlides - this.getSlidePosition(slide)
        : this.getSlidePosition(slide) - 1;
    }
    if (direction === 'right') {
      /**
       * 7 => 0
       */
      return this.getSlidePosition(slide) + 1 > this.numberOfSlides
        ? this.numberOfSlides - this.getSlidePosition(slide)
        : this.getSlidePosition(slide) + 1;
    }
  };

  this.addClickListener = () => {
    this.slides.forEach((slide, index) => {
      slide.addEventListener('click', this.handleSlideClick);
    });
  };

  this.handleSlideClick = (e) => {
    const clickedSlide = e.target;
    const clickedSlidePosition = Number.parseInt(clickedSlide.dataset.pos);
    if (clickedSlidePosition < this.middleSlidePosition) {
      // move slides to right
      this.slides.forEach((slide, index) => {
        slide.setAttribute('data-pos', this.setSlidePosition(slide, 'right'));
        slide.style.left = this.setSlideAlignment(slide) + 'px';
      });
    } else if (clickedSlidePosition === this.middleSlidePosition) {
      // do nothing
    } else {
      // move slides to left
      this.slides.forEach((slide, index) => {
        slide.setAttribute('data-pos', this.setSlidePosition(slide, 'left'));
        slide.style.left = this.setSlideAlignment(slide) + 'px';
      });
    }
  };
}

const inifinitySlider = new InfinitySlider('my-slider', 100);
inifinitySlider.initializeSlider();
inifinitySlider.addClickListener();
