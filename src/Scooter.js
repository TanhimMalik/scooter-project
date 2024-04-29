class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++;
    this.charge = 100; // scooters start fully charged
    this.isBroken = false;
  }

  rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
    } else {
      let errors = [];
      if (this.charge <= 20) errors.push('scooter needs to charge');
      if (this.isBroken) errors.push('scooter needs repair');
      throw new Error(errors.join(' and '));
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  recharge() {
    console.log('Recharging started...');
    const intervalId = setInterval(() => {
      this.charge += 10;
      console.log(`Charge: ${this.charge}%`);
      if (this.charge >= 100) {
        this.charge = 100;
        clearInterval(intervalId);
        console.log('Recharging completed.');
      }
    }, 1000); // simulate recharging process
  }

  requestRepair() {
    console.log('Repair requested...');
    setTimeout(() => {
      this.isBroken = false;
      console.log('Repair completed.');
    }, 5000);
  }
}

module.exports = Scooter;
