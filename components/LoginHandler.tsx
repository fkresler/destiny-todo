import * as React from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../context/session';

function LoginHandler() {
  const { query, push } = useRouter();
  const {
    isLoading, isLoggedIn, login, goToExternalLogin,
  } = React.useContext(SessionContext);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const goToDashboard = () => {
      push('/dashboard');
    };

    const doLogin = async (authCode: string | string[]) => {
      console.log(`Handler: Trying the login login with code ${authCode}`);
      try {
        const usedCode = typeof authCode === 'string' ? authCode : authCode[0];
        await login(usedCode);
        goToDashboard();
      } catch (e) {
        console.log('Handler: Error happened during login:', e);
        setError('We could not log you in. Please try again later.');
      }
    };

    if (isLoading) {
      console.log('Handler: Not gonna do anything because loading');
      return;
    }

    if (isLoggedIn) {
      console.log('Handler: Just redirect because user is logged in');
      goToDashboard();
    }

    const { code } = query;

    if (!code) {
      console.log('Handler: No code was provided');
      goToExternalLogin();
      return;
    }

    doLogin(code);
  }, [query, push, isLoading, isLoggedIn, login, goToExternalLogin]);

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
