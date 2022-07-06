import * as React from 'react';
import { useRouter } from 'next/router';

interface SessionProviderProps {
  children: React.ReactNode
}

interface SessionContextDefinition {
  isLoading: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  membershipId: string | null;
  login: (code?: string) => Promise<void>;
  logout: () => void;
}

interface BungieAuthorizeTokenResponse {
  access_token:string;
  token_type:string;
  expires_in:number;
  refresh_token?:string;
  refresh_expires_in?: number;
  membership_id: string;
}

export const SessionContext = React.createContext<SessionContextDefinition>({
  isLoading: true,
  isLoggedIn: false,
  accessToken: null,
  membershipId: null,
  login: async () => {},
  logout: () => {},
});

const TIMER_ONE_HOUR = 60 * 60 * 1000;
const DEFAULT_REFRESH_TIMER = TIMER_ONE_HOUR;

const LOCAL_ACCESS_TOKEN_KEY = 'bungie-access-token';
const LOCAL_MEMBERSHIP_ID = 'bungie-membership-id';
const LAST_REFRESH_DATETIME_KEY = 'bungie-refresh-datetime';

export const LOGIN_AUTHORIZE_URL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}&response_type=code`;

export function SessionProvider({ children }: SessionProviderProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [membershipId, setMembershipId] = React.useState<string | null>(null);

  const router = useRouter();

  const isLoginValid = (date: string): boolean => {
    const currentDate = new Date().getTime();
    const comparedDate = new Date(date).getTime();

    return currentDate - comparedDate <= DEFAULT_REFRESH_TIMER;
  };

  const login = React.useCallback(async (code?: string) => {
    if (isLoading) {
      throw new Error('Session data is still loading, no new login will be triggered');
    }
    if (isLoggedIn) {
      throw new Error('User is already logged in, no new login will be triggered');
    }
    if (!code) {
      throw new Error('No code for the login was provided, no login will be triggered');
    }
    const previousRefresh = window.localStorage.getItem(LAST_REFRESH_DATETIME_KEY);
    if (previousRefresh && isLoginValid(previousRefresh)) {
      setIsLoggedIn(true);
      throw new Error(`Last refresh was less than ${DEFAULT_REFRESH_TIMER}ms ago`);
    }

    try {
      setIsLoading(true);
      const result = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `client_id=${process.env.NEXT_PUBLIC_BUNGIE_OAUTH_CLIENT_ID}&grant_type=authorization_code&code=${code}`,
      });
      if (!result.ok) {
        throw new Error('Login was triggered but the call did not succeed');
      }
      const resultJson: BungieAuthorizeTokenResponse = await result.json();
      setAccessToken(resultJson.access_token);
      setMembershipId(resultJson.membership_id);
      setIsLoggedIn(true);
      window.localStorage.setItem(LAST_REFRESH_DATETIME_KEY, new Date().toString());
      setIsLoading(false);
    } catch (e) {
      console.error('Login call failed:', e);
      throw e;
    }
  }, [isLoading, isLoggedIn]);

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(LOCAL_ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(LOCAL_MEMBERSHIP_ID);
    setAccessToken(null);
    setMembershipId(null);
    setIsLoggedIn(false);
    router.push('/');
  }, [router]);

  React.useEffect(() => {
    const initSessionFromLocalStorage = () => {
      const localAccessToken = window.localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY);
      const localMembershipId = window.localStorage.getItem(LOCAL_MEMBERSHIP_ID);
      const previousRefresh = window.localStorage.getItem(LAST_REFRESH_DATETIME_KEY);
      setAccessToken(localAccessToken);
      setMembershipId(localMembershipId);
      if (localAccessToken && previousRefresh && isLoginValid(previousRefresh)) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };

    initSessionFromLocalStorage();
  }, []);

  React.useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken);
    }
  }, [accessToken]);

  React.useEffect(() => {
    if (membershipId) {
      window.localStorage.setItem(LOCAL_MEMBERSHIP_ID, membershipId);
    }
  }, [membershipId]);

  const providerValue = React.useMemo(() => ({
    isLoading,
    isLoggedIn,
    accessToken,
    membershipId,
    login,
    logout,
  }), [
    isLoading,
    isLoggedIn,
    accessToken,
    membershipId,
    login,
    logout,
  ]);

  return (
    <SessionContext.Provider value={providerValue}>
      {children}
    </SessionContext.Provider>
  );
}
