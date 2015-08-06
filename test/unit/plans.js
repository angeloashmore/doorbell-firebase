import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import authServer from '../helpers/authServer';

chai.use(targaryen.chai);

const path = 'plans';

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('should be readble by all authenticated users and doorbell-firebase-server', function() {
    expect(authServer)
      .can.read.path(path);

    expect(users.simplelogin)
      .can.read.path(path);

    expect(users.unauthenticated)
      .cannot.read.path(path);
  });

  it('should not be writable by anyone', function() {
    expect(authServer)
      .cannot.write()
      .to.path(path);

    expect(users.simplelogin)
      .cannot.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });

  describe('/$planId', function() {
    it('should be readable by all authenticated users and doorbell-firebase-server', function() {
      expect(authServer)
        .can.read.path(`${path}/USER__DEFAULT`);

      expect(users.simplelogin)
        .can.read.path(`${path}/USER__DEFAULT`);

      expect(users.unauthenticated)
        .cannot.read.path(`${path}/USER__DEFAULT`);
    });

    it('should not be wriable by anyone', function() {
      expect(authServer)
        .cannot.write()
        .to.path(`${path}/USER__DEFAULT`);

      expect(users.simplelogin)
        .cannot.write()
        .to.path(`${path}/USER__DEFAULT`);

      expect(users.unauthenticated)
        .cannot.write()
        .to.path(`${path}/USER__DEFAULT`);
    });
  });
});
