import test from '../../helpers/test';

const path = 'teams';

const validData = {
  name: 'Coldwell Banker Pacific Properties',
  email: 'name@example.com',
};

const invalidData = {
  email: 'invalid_email',
};

test(`${path}/$teamId`, (expect, users, server) => {
  const path0 = `${path}/0`;
  const path1 = `${path}/1`;

  it('should be readable only by team members and doorbell-firebase-server', () => {
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

  it.skip('should fail when writing invalid data', () => {
    Object.keys(invalidData).forEach(key => {
      const data = Object.assign({}, validData);
      data[key] = invalidData[key];
      expect(server)
        .cannot.write(data)
        .to.path(path0);
    });
  });
});
