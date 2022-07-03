import type { NextPage } from 'next';
import Layout from '../components/Layout';
import LoginHandler from '../components/LoginHandler';

const Login: NextPage = function Login() {
  return (
    <Layout>
      <LoginHandler />
    </Layout>
  );
};

export default Login;
