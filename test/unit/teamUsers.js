import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import authServer from '../helpers/authServer';

chai.use(targaryen.chai);

const path = 'teamUsers';
const sampleData = {
  title: 'Co-Founder, Software Developer',
  email: 'angelo@doorbell.im',
  private: false,
  roles: {
    owner: true,
    admin: false,
    billing: false,
  },
};

describe(`/${path}`, function() {
  before(function() {
    targaryen.setFirebaseData(data);
    targaryen.setFirebaseRules(rules);
  });

  it('should not be readable by anyone', function() {
    expect(authServer)
      .cannot.read.path(path);

    expect(users.simplelogin)
      .cannot.read.path(path);

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

  describe(`/$teamId`, function() {
    it('should be readable only by team users and doorbel-firebase-server', function() {
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

    it('should not be writable by anyone', function() {
      expect(authServer)
        .cannot.write()
        .to.path(`${path}/0`);

      expect(users.simplelogin)
        .cannot.write()
        .to.path(`${path}/0`);

      expect(users.unauthenticated)
        .cannot.write()
        .to.path(`${path}/0`);
    });

    describe('/$userId', function() {
      it('should be readable only by team users and doorbell-firebase-server', function() {
        expect(users.simplelogin)
          .can.read.path(`${path}/0/${users.simplelogin.uid}`);

        expect(users.simplelogin)
          .cannot.read.path(`${path}/1/simplelogin:2`);

        expect(users.unauthenticated)
          .cannot.read.path(`${path}/0/${users.simplelogin.uid}`);

        expect(authServer)
          .can.read.path(`${path}/0/${users.simplelogin.uid}`);

        expect(authServer)
          .can.read.path(`${path}/1/simplelogin:2`);
      });

      it('should be writable only by doorbell-firebase-server', function() {
        expect(authServer)
          .can.write(sampleData)
          .to.path(`${path}/0/${users.simplelogin.uid}`);

        expect(users.simplelogin)
          .cannot.write(sampleData)
          .to.path(`${path}/0/${users.simplelogin.uid}`);

        expect(users.unauthenticated)
          .cannot.write(sampleData)
          .to.path(`${path}/0/${users.simplelogin.uid}`);
      });
    });
  });
});
