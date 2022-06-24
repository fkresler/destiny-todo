import * as React from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../context/session';

function LoginHandler() {
  const router = useRouter();
  const sessionContext = React.useContext(SessionContext);

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (sessionContext.isLoading) {
      console.log('Not gonna happen');
      return;
    }

    const doLogin = async () => {
      if (router.query.code) {
        console.log('Trying the login login');
        try {
          const usedCode = typeof router.query.code === 'string' ? router.query.code : router.query.code[0];
          await sessionContext.login(usedCode);
          router.push(`${router.asPath}/dashboard`);
        } catch {
          setError('We could not log you in. Please try again later.');
        }
      }
      try {
        console.log('Trying the login refresh');
        await sessionContext.refresh();
        router.push(`${router.asPath}/dashboard`);
      } catch {
        setError('We could not refresh your session. Try logging in again.');
      }
    };

    doLogin();
  }, [router, sessionContext]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>We will try to log you in</div>
  );
}

export default LoginHandler;
