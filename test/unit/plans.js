import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';

chai.use(targaryen.chai);

const path = 'plans';

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('is readable by all authenticated users', function() {
    expect(users.simplelogin)
      .can.read.path(path);

    expect(users.unauthenticated)
      .cannot.read.path(path);
  });

  it('is not writable by all users', function() {
    expect(users.simplelogin)
      .cannot.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });
});
