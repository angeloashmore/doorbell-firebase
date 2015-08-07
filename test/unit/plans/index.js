import test from '../../helpers/test';

const path = 'plans';

test(path, (expect, users, server) => {
  it('should be readble by all authenticated users and doorbell-firebase-server', () => {
    expect(server)
      .can.read.path(path);

    expect(users.simplelogin)
      .can.read.path(path);

    expect(users.unauthenticated)
      .cannot.read.path(path);
  });

  it('should not be writable by anyone', () => {
    expect(server)
      .cannot.write()
      .to.path(path);

    expect(users.simplelogin)
      .cannot.write()
      .to.path(path);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path);
  });
});
