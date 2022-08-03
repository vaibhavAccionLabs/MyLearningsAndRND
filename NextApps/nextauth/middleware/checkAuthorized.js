import jwt from 'next-auth/jwt';

import { db } from '@/lib/db';
const secret = process.env.JWT_SECRET;

export const isAuthorized = (next) => async (req, res) => {
  console.log('REACH TO MIDDLE WARE::');
  const verifyUser = async (users) => {
    const { uid } = (await jwt.getToken({ req, secret })) || {};
    if (users && users.length > 0 && uid) {
      console.log('USERS::', users);
      console.log('USER ID::', uid);
      const authenticatedUser = users.filter(({ _id }) => _id == uid);
      console.log('AUTH::', authenticatedUser);
      if (authenticatedUser && authenticatedUser.length > 0) {
        return next(req, res);
      }
    }
    return res.status(401).json({ error: 'Not Authorized!' });
  };
  await db(verifyUser);

  // return (req, res) =>
  //   new Promise((resolve, reject) => {
  //     return resolve(req, res);
  //   });
};
