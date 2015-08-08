import test from '../../../helpers/test';

const path = 'queue/tasks';

test(path, (expect, users, server) => {
  it('should be readable by only doorbell-firebase-server', () => {
    expect(server)
      .can.read.path(path);

    expect(users.simplelogin)
      .cannot.read.path(path);

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
