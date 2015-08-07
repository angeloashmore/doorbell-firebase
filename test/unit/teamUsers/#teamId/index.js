import test from '../../../helpers/test';

const path = 'teamUsers';

test(`${path}/$teamId`, (expect, users, server) => {
  const path0 = `${path}/0`;
  const path1 = `${path}/1`;

  it('should be readable only by team users and doorbel-firebase-server', () => {
    expect(users.simplelogin)
      .can.read.path(path0);

    expect(users.simplelogin)
      .cannot.read.path(path1);

    expect(users.unauthenticated)
      .cannot.read.path(path0);

    expect(server)
      .can.read.path(path0);

    expect(server)
      .can.read.path(path1);
  });

  it('should not be writable by anyone', () => {
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
