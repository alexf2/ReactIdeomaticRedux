import * as R from 'ramda';
import { SuperTest, Test } from 'supertest';
import * as supertest from 'supertest-as-promised';

import conf from '../../config';
import IBApi from '../../index';


const app: IBApi = new IBApi(conf);
const request: SuperTest<Test> = supertest.agent(app.listen());

describe('Hello API', () => {

  it('lists hellos', () => {
     expect(request
      .get('/api/hellos')
      .expect(200)
      .then(R.props(['text']))
      .then(R.head))
      .resolves.toBe('Hello')
    }
  )
})
