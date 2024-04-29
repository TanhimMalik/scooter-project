const Scooter = require('../src/Scooter')

// typeof scooter === object
describe('scooter object', () => {
  test('Scooter class should create Scooter instance', () => {
    const scooter = new Scooter()
    expect(scooter).toBeInstanceOf(Scooter)
  })
})

// Method tests
describe('scooter methods', () => {

  let scooter;
  beforeEach(() => {
    scooter = new Scooter('Station1');
  });

  // rent method
  describe('rent method', () => {
    test('should throw error if scooter needs charge', () => {
      scooter.charge = 10; // below the required 20% charge
      expect(() => scooter.rent({})).toThrow('scooter needs to charge');
    });

    test('should throw error if scooter is broken', () => {
      scooter.isBroken = true;
      expect(() => scooter.rent({})).toThrow('scooter needs repair');
    });

    test('should assign user to scooter if charge is sufficient and not broken', () => {
      scooter.charge = 100; // fully charged
      const user = { name: 'John Doe' };
      scooter.rent(user);
      expect(scooter.user).toBe(user);
      expect(scooter.station).toBeNull();
    });
  });

  // dock method
  describe('dock method', () => {
    test('should dock scooter at a station', () => {
      const stationName = 'Station2';
      scooter.dock(stationName);
      expect(scooter.station).toBe(stationName);
      expect(scooter.user).toBeNull();
    });
  });

  // requestRepair method
  describe('requestRepair method', () => {
    jest.useFakeTimers();
    test('should repair the scooter after 5 seconds', () => {
      scooter.isBroken = true;
      scooter.requestRepair();
      jest.advanceTimersByTime(5000); // Simulate 5 seconds passing
      expect(scooter.isBroken).toBeFalsy();
    });
  });

  // charge method
  describe('recharge method', () => {
    jest.useFakeTimers();
    test('should recharge scooter to full', () => {
      scooter.charge = 0;
      scooter.recharge();
      jest.advanceTimersByTime(10000); // Simulate 10 seconds passing
      expect(scooter.charge).toBe(100);
    });
  });

});
