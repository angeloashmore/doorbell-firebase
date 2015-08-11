import test from '../../../helpers/test';

const path = 'queue/tasks';

const serverValidData = {
  _uid: 'doorbell-firebase-server',
  _action: 'action__name',
};

const validData = {
  _uid: 'simplelogin:1',
  _action: 'action__name',
};

const invalidData = {
  _uid: 'invalid_uid',
  _action: 0
};

test(`${path}/$taskId`, (expect, users, server) => {
  const path0 = `${path}/0`;

  it('should be readable only by doorbell-firebase-server', () => {
    expect(server)
      .can.read.path(path0);

    expect(users.simplelogin)
      .cannot.read.path(path0);

    expect(users.unauthenticated)
      .cannot.read.path(path0);
  });

  it('should be writable by all authenticted users and doorbell-firebase-server', () => {
    expect(server)
      .can.write(serverValidData)
      .to.path(path0);

    expect(users.simplelogin)
      .can.write(validData)
      .to.path(path0);

    expect(users.unauthenticated)
      .cannot.write(validData)
      .to.path(path0);
  });

  it.skip('should fail when writing invalid data', () => {
    Object.keys(invalidData).forEach(key => {
      const data = Object.assign({}, serverValidData);
      data[key] = invalidData[key];
      expect(server)
        .cannot.write(data)
        .to.path(path0);
    });
  });
});
