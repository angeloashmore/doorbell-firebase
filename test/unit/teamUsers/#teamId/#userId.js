import test from '../../../helpers/test';

const path = 'teamUsers';

const validData = {
  title: 'Co-Founder, Software Developer',
  email: 'angelo@doorbell.im',
  private: false,
  roles: {
    owner: true,
    admin: false,
    billing: false,
  },
};

const invalidData = {
  email: 'invalid_email',
  private: 'invalid_private',
  roles: 'invalid_roles',
};

test(`${path}/$teamId/$userId`, (expect, users, server) => {
  it('should be readable only by team users and doorbell-firebase-server', () => {
    expect(users.simplelogin)
      .can.read.path(`${path}/0/${users.simplelogin.uid}`);

    expect(users.simplelogin)
      .cannot.read.path(`${path}/1/${users.twitter.uid}`);

    expect(users.unauthenticated)
      .cannot.read.path(`${path}/0/${users.simplelogin.uid}`);

    expect(server)
      .can.read.path(`${path}/0/${users.simplelogin.uid}`);

    expect(server)
      .can.read.path(`${path}/1/${users.twitter.uid}`);
  });

  it('should be writable only by doorbell-firebase-server', () => {
    expect(server)
      .can.write(validData)
      .to.path(`${path}/0/${users.simplelogin.uid}`);

    expect(users.simplelogin)
      .cannot.write(validData)
      .to.path(`${path}/0/${users.simplelogin.uid}`);

    expect(users.unauthenticated)
      .cannot.write(validData)
      .to.path(`${path}/0/${users.simplelogin.uid}`);
  });

  it.skip('should fail when writing invalid data', () => {
    Object.keys(invalidData).forEach(key => {
      const data = Object.assign({}, validData);
      data[key] = invalidData[key];
      expect(server)
        .cannot.write(data)
        .to.path(`${path}/0/${users.simplelogin.uid}`);
    });
  });
});
