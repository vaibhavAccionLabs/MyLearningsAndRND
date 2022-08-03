import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';

const options = {
  // Configure one or more authentication providers
  site: process.env.SITE,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   session: async (session, user) => {
  //     console.log('SESSION::', session);
  //     console.log('USER::', user);

  //     // const OBJ = await adapter.Default({}).getAdapter();
  //     // console.log('ADAPTOR::', OBJ);
  //     // const { id } = await OBJ.getUserByEmail(session.user.email);
  //     // session.user.id = id;

  //     return session;
  //   },
  // },

  // A database is optional, but required to persist accounts in a database
  //database: process.env.DATABASE_URL,
  database: process.env.DATABASE_URL,
  // database: {
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   username: '',
  //   password: '',
  //   database: 'customerfeedback',
  //   synchronize: true,
  // },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  // adapter: Adapters.Default({
  //   type: 'mongodb',
  //   host: 'localhost',
  //   port: 27017,
  //   database: 'customerfeedback',
  //   synchronize: true,
  // }),
};

export default (req, res) => {
  // console.log('REQ::', req);
  // console.log('RES::', res);
  return NextAuth(req, res, options);
};
