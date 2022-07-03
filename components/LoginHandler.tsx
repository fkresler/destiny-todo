import * as React from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../context/session';

function LoginHandler() {
  const router = useRouter();
  const sessionContext = React.useContext(SessionContext);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (sessionContext.isLoading) {
      console.log('Not gonna do anything because loading');
      return;
    }

    if (sessionContext.isLoggedIn) {
      console.log('Just redirect because user is logged in');
      router.push('/dashboard');
    }

    const doLogin = async () => {
      const { code } = router.query;

      console.log(`Trying the login login with code ${code}`);
      if (!code) {
        sessionContext.goToExternalLogin();
      }
      try {
        let usedCode: string | undefined;
        if (code) {
          usedCode = typeof code === 'string' ? code : code[0];
        }
        await sessionContext.login(usedCode);
        return;
      } catch {
        setError('We could not log you in. Please try again later.');
      }
    };

    doLogin();
  }, [router, sessionContext]);

  if (sessionContext.isLoading) {
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
