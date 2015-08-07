import chai, { expect } from 'chai';
import targaryen, { users } from 'targaryen';
import rules from '../../rules';
import data from '../data';
import server from '../helpers/server';

chai.use(targaryen.chai);

export default function test(path, tests) {
  return describe(path, () => {
    before(() => {
      targaryen.setFirebaseData(data);
      targaryen.setFirebaseRules(rules);
    });

    tests(expect, users, server);
  });
}
