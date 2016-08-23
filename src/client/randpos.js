import $ from 'jquery';

const width = $(window).width();
const height = $(window).height();

function randLeft() {
  return Math.random()*width;
}

function randTop() {
  return Math.random()*height;
}

export {
  randLeft,
  randTop
}
