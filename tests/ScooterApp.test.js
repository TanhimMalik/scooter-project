const User = require('../src/User');
const Scooter = require('../src/Scooter');
const ScooterApp = require('../src/ScooterApp');

describe('ScooterApp class', () => {
  let scooterApp;

  // Reset the scooterApp instance before each test
  beforeEach(() => {
    scooterApp = new ScooterApp(); // This ensures a fresh instance for every test
  });

  // register user

  describe('registerUser method tests', () => {
    test('Should return instance of User', () => {
      const response = scooterApp.registerUser('Joe Bloggs', 'test123', 21);
      expect(response).toBeInstanceOf(User);
    });

    test('Should throw error if user is under 18', () => {
      expect(() => scooterApp.registerUser('Young Joe', 'test456', 17)).toThrow('Too young to register');
    });

    test('Should throw error if user already exists', () => {
      scooterApp.registerUser('ExistingUser', 'password', 25);
      expect(() => scooterApp.registerUser('ExistingUser', 'password', 25)).toThrow('Already registered');
    });
  });

  // log in
  describe('loginUser method tests', () => {
    beforeEach(() => {
      scooterApp.registerUser('JaneDoe', 'password123', 25);
    });

    test('Should log the user in if correct credentials are provided', () => {
      expect(() => scooterApp.loginUser('JaneDoe', 'password123')).not.toThrow();
    });

    test('Should throw error if incorrect password is provided', () => {
      expect(() => scooterApp.loginUser('JaneDoe', 'wrongPassword')).toThrow('Incorrect password');
    });
  });

  // log out
  describe('logoutUser method tests', () => {
    beforeEach(() => {
      scooterApp.registerUser('JohnDoe', 'securePassword', 28);
      scooterApp.loginUser('JohnDoe', 'securePassword');
    });

    test('Should log the user out', () => {
      expect(() => scooterApp.logoutUser('JohnDoe')).not.toThrow();
      expect(scooterApp.registeredUsers['JohnDoe'].loggedIn).toBeFalsy();
    });
  });

  // rent scooter
  describe('rentScooter method tests', () => {
    let user, scooter;
    beforeEach(() => {
      scooterApp.registerUser('TestUser', 'userPass', 22);
      user = scooterApp.registeredUsers['TestUser'];
      scooter = scooterApp.createScooter('Station1');
    });

    test('Should rent the scooter if conditions are met', () => {
      expect(() => scooterApp.rentScooter(scooter, user)).not.toThrow();
    });

    test('Should throw error if scooter is already rented', () => {
      scooterApp.rentScooter(scooter, user); // Rent it first
      expect(() => scooterApp.rentScooter(scooter, user)).toThrow('Scooter already rented');
    });
  });

  // dock scooter
  describe('dockScooter method tests', () => {
    let scooter;
    beforeEach(() => {
      scooter = scooterApp.createScooter('Station1');
    });

    test('Should dock the scooter at a station', () => {
      expect(() => scooterApp.dockScooter(scooter, 'Station2')).not.toThrow();
    });

    test('Should throw error if docking at a non-existent station', () => {
      expect(() => scooterApp.dockScooter(scooter, 'StationX')).toThrow('No such station');
    });
  });
});
