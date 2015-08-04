import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';

chai.use(targaryen.chai);

describe('/users', function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('allows anyone to read', function() {
    expect(users.simplelogin)
      .can.read.path('users');

    expect(users.unauthenticated)
      .can.read.path('users');
  });

  it('allows anyone to read children', function() {
    expect(users.simplelogin)
      .can.read.path(`users/${users.simplelogin.uid}`);

    expect(users.unauthenticated)
      .can.read.path(`users/${users.simplelogin.uid}`);
  });

  it('allows authenticated users to be added', function() {
    const userData = {
      provider: 'twitter',
      email: 'name@example.com',
      name: 'John Doe',
    };

    expect(users.twitter)
      .can.write(userData)
      .to.path(`users/${users.twitter.uid}`);

    expect(users.unauthenticated)
      .cannot.write(userData)
      .to.path(`users/${users.simplelogin.uid}`);
  });

  it('allows users to update their own children', function() {
    expect(users.simplelogin)
      .can.write('New Name')
      .to.path(`users/${users.simplelogin.uid}/name`);

    expect(users.twitter)
      .cannot.write('New Name')
      .to.path(`users/${users.simplelogin.uid}/name`);

    expect(users.unauthenticated)
      .cannot.write('New Name')
      .to.path(`users/${users.simplelogin.uid}/name`);
  });

  it('does not allow any deletions', function() {
    expect(users.simplelogin)
      .cannot.write(null)
      .to.path(`users/${users.simplelogin.uid}`);

    expect(users.simplelogin)
      .cannot.write(null)
      .to.path(`users/${users.twitter.uid}`);

    expect(users.unauthenticated)
      .cannot.write(null)
      .to.path(`users/${users.simplelogin.uid}`);
  });

  it('requires an email address for the email child', function() {
    expect(users.simplelogin)
      .can.write('name@example.com')
      .to.path(`users/${users.simplelogin.uid}/email`);

    expect(users.simplelogin)
      .cannot.write('example.com')
      .to.path(`users/${users.simplelogin.uid}/email`);
  });
});
