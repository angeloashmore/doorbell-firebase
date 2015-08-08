import test from '../../../helpers/test';

const path = 'queue/specs';

const validData = {
  start_state: null,
  in_progress_state: 'in_progress',
  finished_state: null,
  error_state: 'error',
  timeout: 300000,
  retries: 0,
};

const invalidData = {
  start_state: 0,
  in_progress_state: 0,
  finished_state: 0,
  error_state: 0,
  timeout: 'invalid_timeout',
  retries: 'invalid_retries',
};

test(`${path}/$specId`, (expect, users, server) => {
  const path0 = `${path}/0`;

  it('should be readable only by doorbell-firebase-server', () => {
    expect(server)
      .can.read.path(path0);

    expect(users.simplelogin)
      .cannot.read.path(path0);

    expect(users.unauthenticated)
      .cannot.read.path(path0);
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
