import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import authServer from '../helpers/authServer';

chai.use(targaryen.chai);

const path = 'users';

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('should not be readable by anyone', function() {
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

  describe('/$user_id', function() {
    it('should be readable only by the user and doorbell-firebase-server', function() {
      expect(users.simplelogin)
        .can.read.path(`${path}/${users.simplelogin.uid}`);

      expect(users.simplelogin)
        .cannot.read.path(`${path}/simplelogin:2`);

      expect(users.unauthenticated)
        .cannot.read.path(`${path}/${users.simplelogin.uid}`);

      expect(authServer)
        .can.read.path(`${path}/${users.simplelogin.uid}`);

      expect(authServer)
        .can.read.path(`${path}/simplelogin:2`);
    });

    it('should be writable only by doorbell-firebase-server', function() {
      expect(authServer)
        .can.write()
        .to.path(path);

      expect(users.simplelogin)
        .cannot.write()
        .to.path(`${path}/${users.simplelogin.uid}`);

      expect(users.unauthenticated)
        .cannot.write()
        .to.path(`${path}/${users.simplelogin.uid}`);
    });
  });
});
