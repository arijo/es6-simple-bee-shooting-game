import $ from 'jquery';
import config from './config';
import { create, update, render, reset } from './state';

let state = create(config);
let SHOOT = false;

state = reset(state);

function loop() {
  let RUNNING = true;

  (function _loop() {
    if(!RUNNING) return;

    state = update(state, SHOOT);

    if(SHOOT) SHOOT = false;

    render(state);

    if(state.queen.hitpoints > 0) {
      return requestAnimationFrame(_loop);
    }

    $('#shoot').hide();
    RUNNING = false;
    state = create(config);
    state = reset(state);
    $('#start').show();
  })();
}

$('#shoot').on('click', function(ev) {
  SHOOT = true;
});

$('#start').on('click', function(ev) {
  $('#start').hide();
  loop();
  $('#shoot').show();
});



