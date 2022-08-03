import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  site: process.env.SITE,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    // encryption: true,
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    session: async (session, user) => {
      // if (user.name === 'vaibhavAccionLabs') {
      session.user.userId = user.id;
      return Promise.resolve(session);
      // }
      //return Promise.reject(null);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.uid = user.id;
      }
      return Promise.resolve(token);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
