import * as React from 'react';
import { useRouter } from 'next/router';
import { SessionContext, LOGIN_AUTHORIZE_URL } from '../context/session';

function LoginHandler() {
  const router = useRouter();
  const { isLoading, isLoggedIn, login } = React.useContext(SessionContext);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const goToDashboard = () => {
      router.push('/dashboard');
    };

    const doLogin = async (authCode: string | string[]) => {
      try {
        const usedCode = typeof authCode === 'string' ? authCode : authCode[0];
        await login(usedCode);
        goToDashboard();
      } catch (e) {
        setError('We could not log you in. Please try again later.');
      }
    };

    if (isLoading) {
      return;
    }
    if (isLoggedIn) {
      goToDashboard();
      return;
    }

    const { code } = router.query;
    if (!code) {
      if (router.isReady) {
        router.push(LOGIN_AUTHORIZE_URL);
      }
      return;
    }

    doLogin(code);
  }, [router, isLoading, isLoggedIn, login]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>We will try to log you in</div>
  );
}

export default LoginHandler;
