import * as R from 'ramda';
import { SuperTest, Test } from 'supertest';
import * as supertest from 'supertest-as-promised';

import conf from '../../config';
import IBApi from '../../index';


const app: IBApi = new IBApi(conf);
const request: SuperTest<Test> = supertest.agent(app.listen());

describe('Hello API', () => {

  it('lists hellos', () =>
    request
      .get('/api/hellos')
      .expect(200)
      .then(R.props(['body']))
      .then(R.head)
      .should.eventually.be.fulfilled
      .and.have.length.of.at.least(1));
});
