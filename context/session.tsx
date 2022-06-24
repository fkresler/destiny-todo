import * as React from 'react';
import { useRouter } from 'next/router';

interface SessionProviderProps {
  children: React.ReactNode
}

interface SessionContextDefinition {
  isLoading: boolean;
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  membershipId: string | null;
  login: (code: string) => Promise<void>;
  refresh: () => Promise<void>;
  logout: () => void;
}

interface BungieAuthorizeTokenResponse {
  access_token:string;
  token_type:string;
  expires_in:number;
  refresh_token:string;
  refresh_expires_in: number;
  membership_id: string;
}

interface BungieRefreshTokenResponse {
  refresh_token: string;
}

export const SessionContext = React.createContext<SessionContextDefinition>({
  isLoading: true,
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  membershipId: null,
  login: async () => {},
  refresh: async () => {},
  logout: () => {},
});

const LOCAL_ACCESS_TOKEN_KEY = 'bungie-access-token';
const LOCAL_REFRESH_TOKEN_KEY = 'bungie-refresh-token';
const LOCAL_MEMBERSHIP_ID = 'bungie-membership-id';

export const LOGIN_AUTHORIZE_URL = `https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.BUNGIE_OAUTH_CLIENT_ID}&response_type=code`;

export function SessionProvider({ children }: SessionProviderProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null);
  const [membershipId, setMembershipId] = React.useState<string | null>(null);

  const router = useRouter();

  const redirectToExternalLogin = React.useCallback(() => {
    router.push(LOGIN_AUTHORIZE_URL);
  }, [router]);

  const login = React.useCallback(async (code: string) => {
    setIsLoading(true);
    if (!code) {
      redirectToExternalLogin();
    }
    try {
      const result = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `client_id=${process.env.BUNGIE_OAUTH_CLIENT_ID}&grant_type=authorization_code&code=${code}`,
      });
      if (!result.ok) {
        throw new Error('Login failed');
      }
      const resultJson: BungieAuthorizeTokenResponse = await result.json();
      setAccessToken(resultJson.access_token);
      setRefreshToken(resultJson.refresh_token);
      setMembershipId(resultJson.membership_id);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch {
      redirectToExternalLogin();
    }
  }, [redirectToExternalLogin]);

  const refresh = React.useCallback(async () => {
    setIsLoading(true);
    const localRefreshToken = window.localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY);
    if (!localRefreshToken) {
      redirectToExternalLogin();
    }
    try {
      const result = await fetch('https://www.bungie.net/platform/app/oauth/token/', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `grant_type=refresh_token&refreshToken=${localRefreshToken}`,
      });
      if (!result.ok) {
        throw new Error('Refresh failed');
      }
      const resultJson: BungieRefreshTokenResponse = await result.json();
      setRefreshToken(resultJson.refresh_token);
      setIsLoggedIn(true);
      setIsLoading(false);
    } catch {
      redirectToExternalLogin();
    }
  }, [redirectToExternalLogin]);

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    setRefreshToken(null);
    setMembershipId(null);
  };

  React.useEffect(() => {
    const localAccessToken = window.localStorage.getItem(LOCAL_ACCESS_TOKEN_KEY);
    const localRefreshToken = window.localStorage.getItem(LOCAL_REFRESH_TOKEN_KEY);
    const localMembershipId = window.localStorage.getItem(LOCAL_MEMBERSHIP_ID);
    setAccessToken(localAccessToken);
    setRefreshToken(localRefreshToken);
    setMembershipId(localMembershipId);
    if (localRefreshToken) {
      refresh();
    } else {
      setIsLoading(false);
    }
  }, [refresh]);

  React.useEffect(() => {
    if (accessToken) {
      window.localStorage.setItem(LOCAL_ACCESS_TOKEN_KEY, accessToken);
    }
    if (refreshToken) {
      window.localStorage.setItem(LOCAL_REFRESH_TOKEN_KEY, refreshToken);
    }
    if (membershipId) {
      window.localStorage.setItem(LOCAL_MEMBERSHIP_ID, membershipId);
    }
  }, [accessToken, refreshToken, membershipId]);

  const providerValue = React.useMemo(() => ({
    isLoading,
    isLoggedIn,
    accessToken,
    refreshToken,
    membershipId,
    login,
    refresh,
    logout,
  }), [isLoading, isLoggedIn, accessToken, refreshToken, membershipId, login, refresh]);

  return (
    <SessionContext.Provider value={providerValue}>
      {children}
    </SessionContext.Provider>
  );
}
