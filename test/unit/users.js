import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';

chai.use(targaryen.chai);

const path = 'users';

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('should be readable by any authenticated user', function() {
    expect(users.simplelogin)
      .can.read.path(path);

    expect(users.unauthenticated)
      .cannot.read.path(path);
  });

  it('should not be writable by anyone', function() {
    expect(users.simplelogin)
      .cannot.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });

  describe('/$user_id', function() {
    it('should be readable by any authenticated user', function() {
      expect(users.simplelogin)
        .can.read.path(`${path}/${users.simplelogin.uid}`);

      expect(users.unauthenticated)
        .cannot.read.path(`${path}/${users.simplelogin.uid}`);
    });

    it('should not be writable by anyone', function() {
      expect(users.simplelogin)
        .cannot.write()
        .to.path(`${path}/${users.simplelogin.uid}`);

      expect(users.unauthenticated)
        .cannot.write()
        .to.path(`${path}/${users.simplelogin.uid}`);
    });
  });
});
