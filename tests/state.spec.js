import { assert } from 'chai';
import { create, reset, update } from '../src/client/state';

describe('State functions', function() {
  const config = {
    bee: {
      up: '/frame-1.png',
      down: '/frame-2.png'
    },
    queen: {
      hitpoints: 100,
      deduction: 8,
      delta: .5
    },
    workers: {
      number: 2,
      hitpoints: 75,
      deduction: 10,
      delta: .6
    },
    drones: {
      number: 3,
      hitpoints: 50,
      deduction: 12,
      delta: .7
    }
  }
  const props = {
    queen: {
      idx: 0,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.queen.hitpoints,
      delta: config.queen.delta
    },
    workers: [{
      idx: 1,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.workers.hitpoints,
      delta: config.workers.delta
    },{
      idx: 2,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.workers.hitpoints,
      delta: config.workers.delta
    }],
    drones: [{
      idx: 3,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.drones.hitpoints,
      delta: config.drones.delta
    },{
      idx: 4,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.drones.hitpoints,
      delta: config.drones.delta
    },{
      idx: 5,
      left: 0,
      top: 0,
      frame: 'frame-1',
      hitpoints: config.drones.hitpoints,
      delta: config.drones.delta
    }] 
  };
  describe('#create(config)', function() {
    it('should return the correct state given a basic config', function() {
      let state = create(config);
      // queen state assertions
      assert.strictEqual(props.queen.idx, state.queen.idx);
      assert.strictEqual(props.queen.left, state.queen.left);
      assert.strictEqual(props.queen.top, state.queen.top);
      assert.equal(props.queen.hitpoints, state.queen.hitpoints);
      // workers state assertions
      assert.equal(props.workers.length, 2);
      assert.strictEqual(props.workers[0].idx, state.workers[0].idx);
      assert.strictEqual(props.workers[0].left, state.workers[0].left);
      assert.strictEqual(props.workers[0].top, state.workers[0].top);
      assert.equal(props.workers[0].hitpoints, state.workers[0].hitpoints);
      assert.strictEqual(props.workers[1].idx, state.workers[1].idx);
      assert.strictEqual(props.workers[1].left, state.workers[1].left);
      assert.strictEqual(props.workers[1].top, state.workers[1].top);
      assert.equal(props.workers[1].hitpoints, state.workers[1].hitpoints);
      // drones state assertions
      assert.equal(props.drones.length, 3);
      assert.strictEqual(props.drones[0].idx, state.drones[0].idx);
      assert.strictEqual(props.drones[0].left, state.drones[0].left);
      assert.strictEqual(props.drones[0].top, state.drones[0].top);
      assert.equal(props.drones[0].hitpoints, state.drones[0].hitpoints);
      assert.strictEqual(props.drones[1].idx, state.drones[1].idx);
      assert.strictEqual(props.drones[1].left, state.drones[1].left);
      assert.strictEqual(props.drones[1].top, state.drones[1].top);
      assert.equal(props.drones[1].hitpoints, state.drones[1].hitpoints);
      assert.strictEqual(props.drones[2].idx, state.drones[2].idx);
      assert.strictEqual(props.drones[2].left, state.drones[2].left);
      assert.strictEqual(props.drones[2].top, state.drones[2].top);
      assert.equal(props.drones[2].hitpoints, state.drones[2].hitpoints);
    });
  });
  describe('#reset(state)', function() {

    it('should reset the state to the correct initialization values', function() {
      let state = create(config);
      state = reset(state);
      // queen state assertions
      assert.equal(props.queen.frame, state.queen.frame);
      assert.equal(props.queen.hitpoints, state.queen.hitpoints);
      assert.equal(props.queen.delta, state.queen.delta);
      // workers state assertions
      assert.equal(props.workers[0].frame, state.workers[0].frame);
      assert.equal(props.workers[0].hitpoints, state.workers[0].hitpoints);
      assert.equal(props.workers[0].delta, state.workers[0].delta);
      assert.equal(props.workers[1].frame, state.workers[1].frame);
      assert.equal(props.workers[1].hitpoints, state.workers[1].hitpoints);
      assert.equal(props.workers[1].delta, state.workers[1].delta);
      // drones state assertions
      assert.equal(props.drones[0].frame, state.drones[0].frame);
      assert.equal(props.drones[0].hitpoints, state.drones[0].hitpoints);
      assert.equal(props.drones[0].delta, state.drones[0].delta);
      assert.equal(props.drones[1].frame, state.drones[1].frame);
      assert.equal(props.drones[1].hitpoints, state.drones[1].hitpoints);
      assert.equal(props.drones[1].delta, state.drones[1].delta);
      assert.equal(props.drones[2].frame, state.drones[2].frame);
      assert.equal(props.drones[2].hitpoints, state.drones[2].hitpoints);
      assert.equal(props.drones[2].delta, state.drones[2].delta);
    });
  });
  describe('#update(state)', function() {
    it('should update the state to the correct next value', function() {
      let state = create(config);
      reset(state);
      state.queen.oldLeft = state.queen.left;
      update(state); 
      // queen state assertions
      assert.equal('frame-2', state.queen.frame);
      assert.equal(state.queen.oldLeft+config.queen.delta, state.queen.left);
      update(state); 
      assert.equal('frame-1', state.queen.frame);
      assert.equal(state.queen.oldLeft+2*config.queen.delta, state.queen.left);
    });
  });
});
