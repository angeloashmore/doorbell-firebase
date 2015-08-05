import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import authServer from '../helpers/authServer';

chai.use(targaryen.chai);

const path = 'teams';
const sampleData = {
  name: 'Coldwell Banker Pacific Properties',
  email: 'name@example.com',
};

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('should be readable only by doorbell-firebase-server', function() {
    expect(authServer)
      .can.read.path(path);

    expect(users.simplelogin)
      .cannot.read.path(path);

    expect(users.unauthenticated)
      .cannot.read.path(path);
  });

  it('should be writable only by doorbell-firebase-server', function() {
    expect(authServer)
      .can.write()
      .to.path(path);

    expect(users.simplelogin)
      .cannot.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });

  describe(`/$team_id`, function() {
    it('should be readable only by team members and doorbell-firebase-server', function() {
      expect(users.simplelogin)
        .can.read.path(`${path}/0`);

      expect(users.simplelogin)
        .cannot.read.path(`${path}/1`);

      expect(users.unauthenticated)
        .cannot.read.path(`${path}/0`);

      expect(authServer)
        .can.read.path(`${path}/0`);

      expect(authServer)
        .can.read.path(`${path}/1`);
    });

    it('should be writable only by doorbell-firebase-server', function() {
      expect(authServer)
        .can.write(sampleData)
        .to.path(`${path}/0`);

      expect(users.simplelogin)
        .cannot.write(sampleData)
        .to.path(`${path}/0`);

      expect(users.unauthenticated)
        .cannot.write(sampleData)
        .to.path(`${path}/0`);
    });
  });
});
