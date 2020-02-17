const app = require('../app');
const supertest = require('supertest');

const User = require('../model/user');
const generateToken = require('../utils/generate-token-by-id.js');

const req = supertest(app);

describe('/api/users routes tests', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      googleId: 123,
      name: 'shahzaib sarwar',
      firstName: 'shahzaib',
      lastName: 'sarwar',
      email: 'imshahzayb@gmail.com',
      profilePic: 'some.url'
    });
  });

  describe('user is logged in', () => {
    let jwtToken;
    beforeEach(() => {
      jwtToken = generateToken(user._id);
    });

    test('/api/users/me - should get profile of logged in user', async done => {
      const res = await req
        .get('/api/users/me')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200);
      expect(res.body.name).toEqual(user.name);
      done();
    });
  });
  describe('user is not logged in', () => {
    test('/api/users/me - user cannot get his/her profile with unauthenticated jwt', async done => {
      const res = await req
        .get('/api/users/me')
        .set('Authorization', 'Bearer dfdggdf')
        .expect(401);
      done();
    });

    test('/api/users/:id - get existing user by id', async done => {
      const res = await req.get('/api/users/' + user._id).expect(200);

      expect(res.body._id.toString()).toEqual(user._id.toString());
      done();
    });
  });
});
