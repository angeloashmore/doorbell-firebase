import test from '../../../helpers/test';

const path = 'billings/users';

const validData = {
  planId: 'USER__DEFAULT',
  stripeCustomerId: 'cus_12345',
  email: 'name@example.com',
  card: {
    brand: 'Visa',
    last4: '1234',
    expMonth: '01',
    expYear: '16',
  },
};

const invalidData = {
  planId: 'invalid_planId',
  stripeCustomerId: 'invalid_customer',
  email: 'invalid_email',
  card: 'invalid_card',
};

test(`${path}/$userId`, (expect, users, server) => {
  const path0 = `${path}/${users.simplelogin.uid}`;
  const path1 = `${path}/${users.twitter.uid}`;

  it('should be readable only by its user and doorbell-firebase-server', () => {
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
