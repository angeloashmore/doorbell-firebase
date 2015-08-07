import test from '../../helpers/test';

const path = 'plans';

test(`${path}/$planId`, (expect, users, server) => {
  const path0 = `${path}/USER__DEFAULT`;

  it('should be readable by all authenticated users and doorbell-firebase-server', () => {
    expect(server)
      .can.read.path(path0);

    expect(users.simplelogin)
      .can.read.path(path0);

    expect(users.unauthenticated)
      .cannot.read.path(path0);
  });

  it('should not be wriable by anyone', () => {
    expect(server)
      .cannot.write()
      .to.path(path0);

    expect(users.simplelogin)
      .cannot.write()
      .to.path(path0);

    expect(users.unauthenticated)
      .cannot.write()
      .to.path(path0);
  });
});
