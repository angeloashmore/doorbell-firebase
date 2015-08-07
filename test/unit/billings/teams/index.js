import test from '../../../helpers/test';

const path = 'billings/teams';

test(path, (expect, users, server) => {
  it('should not be readable by anyone', () => {
    expect(server)
      .cannot.read.path(path);

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
