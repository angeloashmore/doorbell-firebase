import test from '../../helpers/test';

const path = 'users';

const validData = {
  provider: 'password',
  email: 'name@example.com',
  name: 'First Last',
};

const invalidData = {
  email: 'invalid_email',
};

test(`${path}/$userId`, (expect, users, server) => {
  const path0 = `${path}/${users.simplelogin.uid}`;
  const path1 = `${path}/${users.twitter.uid}`;

  it('should be readable only by the user and doorbell-firebase-server', () => {
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

  it('should be writable only by doorbell-firebase-server', () => {
    expect(server)
      .can.write(validData)
      .to.path(path0);

    expect(users.simplelogin)
      .cannot.write(validData)
      .to.path(path0);

    expect(users.unauthenticated)
      .cannot.write(validData)
      .to.path(path0);
  });

  it('should fail when writing invalid data', () => {
    Object.keys(invalidData).forEach(key => {
      const data = Object.assign({}, validData);
      data[key] = invalidData[key];
      expect(server)
        .cannot.write(data)
        .to.path(path0);
    });
  });
});
