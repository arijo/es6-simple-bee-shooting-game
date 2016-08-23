import $ from 'jquery';
import config from './config';
import { randLeft, randTop } from './randpos';

const width = $(window).width();
const height = $(window).height();

function create(config) {
  let state = {};
  let idx = 0;
  let template = `
    <div class='bee'>
      <header></header>
      <div class='body'></div>
    </div>
  `;

  let $el = $(template);
  $el.addClass('queen');
  $el.appendTo($(document.body));
  $el.hide();
  state['queen'] = {
    idx: idx++, 
    $el: $el,
    left: 0,
    top: 0,
    hitpoints: config.queen.hitpoints
  }

  state['workers'] = [];
  for(let i=0; i<config.workers.number; i++) {
    let $el = $(template);
    $el.addClass('worker');
    $el.appendTo($(document.body));
    $el.hide();
    state.workers.push({
      idx: idx++,
      $el: $el,
      left: 0,
      top: 0,
      hitpoints: config.workers.hitpoints
    });
  }
  
  state['drones'] = [];
  for(let i=0; i<config.drones.number; i++) {
    let $el = $(template);
    $el.addClass('drone');
    $el.appendTo($(document.body));
    $el.hide();
    state.drones.push({
      idx: idx++,
      $el: $el,
      left: 0,
      top: 0,
      hitpoints: config.drones.hitpoints
    });
  }

  return state;
}

function update(state, shoot) {
  let shootIdx = -1;
  if(shoot) {
    let beeCount = 
      1+state.workers.length+state.drones.length;
    shootIdx = Math.floor(Math.random()*(beeCount+1)); 
  }

  let queen = state.queen;
  if(queen.left > width || queen.left < 0) {
    queen.delta = -queen.delta;
    queen.mirror = !queen.mirror;
  }
  queen.left = queen.left + queen.delta;
  queen.top = state.queen.top;
  queen.frame = queen.frame === 'frame-1' ? 
    'frame-2' : 'frame-1';
  if(queen.idx === shootIdx) {
    queen.hitpoints = queen.hitpoints - config.queen.deduction;
    if(queen.hitpoints < 0) {
      queen.$el.remove();
      state.workers.forEach(worker => worker.$el.remove());
      state.drones.forEach(drone => drone.$el.remove());
    }
  }

  state.workers.forEach(function(worker) {
    if(worker.left > width || worker.left <0) {
       worker.delta = -worker.delta;
       worker.mirror = !worker.mirror;
    }
    worker.left = worker.left + worker.delta;
    worker.top = worker.top;
    worker.frame = worker.frame === 'frame-1' ? 
     'frame-2' : 'frame-1';
    if(worker.idx === shootIdx) {
      worker.hitpoints = worker.hitpoints - config.workers.deduction;
      if(worker.hitpoints < 0) {
        worker.$el.remove();
        state.workers.splice(state.workers.indexOf(worker), 1); 
      }
    }
  });

  state.drones.forEach(function(drone) {
    if(drone.left > width || drone.left < 0) {
      drone.delta = -drone.delta;
      drone.mirror = !drone.mirror;
    }
    drone.left = drone.left + drone.delta;
    drone.top = drone.top;
    drone.frame = drone.frame === 'frame-1' ? 
     'frame-2' : 'frame-1';
    if(drone.idx === shootIdx) {
      drone.hitpoints = drone.hitpoints - config.drones.deduction;
      if(drone.hitpoints < 0) {
        drone.$el.remove();
        state.drones.splice(state.drones.indexOf(drone), 1); 
      }
    }
  });

  return state;
}

function render(state) {
  let queen = state.queen;
  let html = `<span>Q ${queen.hitpoints}</span>`;
  let $el = queen.$el;
  $el.find('header').html(html);
  $el.show();
  $el.css({
    left: queen.left + 'px',
    top: queen.top + 'px'
  });
  let $body = $el.find('.body');
  $body.css('background-image', `url(/img/${queen.frame}.png)`) 
  if(queen.mirror) { 
    $body.addClass('mirror');
  } else {
    $body.removeClass('mirror');
  }

  state.workers.forEach(function(worker) {
    let html = `<span>W ${worker.hitpoints}</span>`;
    let $el = worker.$el;
    $el.find('header').html(html);
    $el.show();
    $el.css({
      left: worker.left + 'px',
      top: worker.top + 'px'
    });
    let $body = $el.find('.body');
    $body.css('background-image', `url(/img/${worker.frame}.png)`) 
    if(worker.mirror) { 
      $body.addClass('mirror');
    } else {
      $body.removeClass('mirror');
    }
  });

  state.drones.forEach(function(drone) {
    let html = `<span>D ${drone.hitpoints}</span>`;
    let $el = drone.$el;
    $el.find('header').html(html);
    $el.show();
    $el.css({
      left: drone.left + 'px',
      top: drone.top + 'px'
    });
    let $body = $el.find('.body');
    $body.css('background-image', `url(/img/${drone.frame}.png)`) 
    if(drone.mirror) { 
      $body.addClass('mirror');
    } else {
      $body.removeClass('mirror');
    }
  });
}

function reset(state) {
  let queen = state.queen;
  queen.left = randLeft(); 
  queen.top = randTop(); 
  queen.frame = 'frame-1';
  queen.hitpoints = config.queen.hitpoints;
  queen.delta = config.queen.delta;

  state.workers.forEach(function(worker) {
    worker.left = randLeft();
    worker.top = randTop();
    worker.frame = 'frame-1';
    worker.hitpoints = config.workers.hitpoints;
    worker.delta = config.workers.delta;
  });

  state.drones.forEach(function(drone) {
    drone.left = randLeft();
    drone.top = randTop();
    drone.frame = 'frame-1';
    drone.hitpoints = config.drones.hitpoints;
    drone.delta = config.drones.delta;
  });

  return state;
}

export {
  create,
  update,
  render,
  reset
}
