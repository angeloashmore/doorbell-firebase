import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import authServer from '../helpers/authServer';

chai.use(targaryen.chai);

const path = '_queue';

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

  it('should be writable by all authenticated users and doorbell-firebase-server', function() {
    expect(authServer)
      .can.write()
      .to.path(path);

    expect(users.simplelogin)
      .can.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });
});
