import { withAuth } from 'next-auth/middleware';

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: '/auth/signin',
  },
});
