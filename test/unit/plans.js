import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';

chai.use(targaryen.chai);

describe('/plans', function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('is readable by all users', function() {
    expect(users.simplelogin)
      .can.read.path('plans');

    expect(users.unauthenticated)
      .can.read.path('plans');
  });

  it('is not writable by all users', function() {
    expect(users.simplelogin)
      .cannot.write()
      .to.path('plans');

    expect(users.unauthenticated)
      .cannot.write()
      .to.path('plans');
  });
});
