// require the User and Scooter classes - see where they can be used in ScooterApp.js

const User = require('./User');
const Scooter = require('./Scooter');

class ScooterApp {
  constructor() {
    this.stations = {
      "Station1": [],
      "Station2": [],
      "Station3": []
    };
    this.registeredUsers = {};
  }

  registerUser(username, password, age) {
    if (age < 18) throw new Error('Too young to register');
    if (this.registeredUsers[username]) throw new Error('Already registered');

    const newUser = new User(username, password, age);
    this.registeredUsers[username] = newUser;
    console.log(`User ${username} has been registered.`);
    return newUser;
  }

  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) throw new Error('Username or password is incorrect');
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) throw new Error('No such user is logged in');
    user.logout();
  }

  createScooter(station) {
    if (!this.stations[station]) throw new Error('No such station');
    const newScooter = new Scooter(station);
    this.stations[station].push(newScooter);
    console.log('Created new scooter');
    return newScooter;
  }

  dockScooter(scooter, station) {
    if (!this.stations[station]) throw new Error('No such station');
    if (this.stations[station].includes(scooter)) throw new Error('Scooter already at station');

    scooter.dock(station);
    this.stations[station].push(scooter);
    console.log('Scooter is docked');
  }

  rentScooter(scooter, user) {
    if (scooter.user) throw new Error('Scooter already rented');
    scooter.rent(user);
    console.log('Scooter is rented');
  }

  print() {
    console.log('Registered Users:', Object.keys(this.registeredUsers));
    console.log('Stations and Scooters:');
    Object.keys(this.stations).forEach(station => {
      console.log(`${station}: ${this.stations[station].length} scooters`);
    });
  }
}

module.exports = ScooterApp;

