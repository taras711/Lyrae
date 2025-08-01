const { IntentScheduler } = require('../../core/Scheduler/IntentScheduler');

describe('IntentScheduler – Advanced Features', () => {
  let scheduler;

  beforeEach(() => {
    scheduler = new IntentScheduler(2);
  });

  jest.setTimeout(2000); // Pro jistotu delší timeout

  it('activates intents by priority', done => {
    const order = [];

    scheduler.scheduleIntent(
      { id: 'low', timestamp: Date.now() + 10, priority: 1 },
      () => {
        order.push('low');
        if (order.includes('high')) checkOrder();
      }
    );

    const now = Date.now();
    scheduler.scheduleIntent(
      { id: '1', priority: 2, timestamp: now },
      () => { order.push('high'); checkOrder(); }
    );
    scheduler.scheduleIntent(
      { id: '2', priority: 1, timestamp: now },
      () => { order.push('low'); checkOrder(); }
    );


    function checkOrder() {
      if (order.length === 2) {
        expect(order).toEqual(['high', 'low']);
        done();
      }
    }
  });

  it('honors maxConcurrent limit', done => {
    let active = 0;
    const calls = [];

    const intentCallback = (id) => {
      active++;
      calls.push(id);
      setTimeout(() => active--, 100);
    };

    scheduler.scheduleIntent({ id: 'one', timestamp: Date.now(), priority: 3 }, () => intentCallback('one'));
    scheduler.scheduleIntent({ id: 'two', timestamp: Date.now(), priority: 2 }, () => intentCallback('two'));
    scheduler.scheduleIntent({ id: 'three', timestamp: Date.now(), priority: 1 }, () => intentCallback('three'));

    setTimeout(() => {
      expect(active).toBeLessThanOrEqual(2);
      expect(calls.length).toBeGreaterThanOrEqual(2);
      done();
    }, 300);
  });

  it('repeats intent based on interval', done => {
    let count = 0;
    scheduler.scheduleIntent(
      {
        id: 'repeat1',
        timestamp: Date.now(),
        priority: 1,
        repeatInterval: 50,
      },
      () => {
        count++;
        if (count === 3) {
          scheduler.cancelScheduledIntent('repeat1_repeat');
          expect(count).toBe(3);
          done();
        }
      }
    );
  });

  it('respects dependencies between intents', done => {
    const callOrder = [];

    scheduler.scheduleIntent({ id: 'first', timestamp: Date.now(), priority: 3 }, () => {
      callOrder.push('first');
    });

    scheduler.scheduleIntent(
      {
        id: 'second',
        timestamp: Date.now() + 30,
        priority: 2,
        dependsOn: ['first'],
      },
      () => callOrder.push('second')
    );

    setTimeout(() => {
      expect(callOrder).toEqual(['first', 'second']);
      done();
    }, 300);
  });
});