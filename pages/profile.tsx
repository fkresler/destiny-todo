import type { NextPage } from 'next';
import * as React from 'react';
import useSWR from 'swr';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { UserErrorResponse, UserResponse } from '../types/users';
import { SessionContext } from '../context/session';
import Layout from '../components/Layout';

const Profile: NextPage = function Profile() {
  const { membershipId } = React.useContext(SessionContext);
  const { data, error } = useSWR<UserResponse, UserErrorResponse>(
    `/api/users/${membershipId}`,
    (apiUrl: string) => fetch(apiUrl).then((res) => res.json()),
  );

  if (!data) {
    return (
      <Layout>
        <Stack spacing={4}>
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" width="100%" height={120} />
          <Skeleton variant="rectangular" width="100%" height={360} />
        </Stack>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div>{error.error}</div>
      </Layout>
    );
  }

  const { bungieNetUser } = data.data;

  return (
    <Layout>
      <Card>
        <CardHeader
          title={bungieNetUser.displayName}
          subheader={bungieNetUser.about}
          avatar={<Avatar alt="Profile" src={bungieNetUser.profilePicturePath} />}
        />
        <CardContent>
          <Typography color="text.secondary">
            Your settings
          </Typography>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Profile;
