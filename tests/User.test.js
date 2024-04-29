const User = require('../src/User');

const user = new User('Tanhim Malik', 'password', 23);

// User property tests
describe('User property tests', () => {
  // test username
  test('username should be a string', () => {
    expect(typeof user.username).toBe('string');
    expect(user.username).toEqual('Tanhim Malik');
  });

  // test password
  test('password should be a string', () => {
    expect(typeof user.password).toBe('string');
    expect(user.password).toEqual('password');
  });

  // test age
  test('age should be a number', () => {
    expect(typeof user.age).toBe('number');
    expect(user.age).toEqual(23);
  });
});

// test login
describe('login method tests', () => {
  test('should log the user in with the correct password', () => {
    user.login('password');
    expect(user.loggedIn).toBe(true);
  });

  test('should throw an error with the incorrect password', () => {
    expect(() => user.login('wrongPassword')).toThrow('Incorrect password');
  });
});

// test logout
describe('logout method tests', () => {
  test('should log the user out', () => {
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
