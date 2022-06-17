import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Layout from '../components/Layout';
import AchievementBacklog from '../components/AchievementBacklog';
import { AchievementResponse } from '../types/achievements';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Dashboard: NextPage = function Dashboard() {
  const { data, error } = useSWR<AchievementResponse>('/api/achievements', fetcher);

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
        <div>{error}</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Typography variant="h4" gutterBottom component="h1">
        My Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom component="h2">
        Focused achievements
      </Typography>
      <Divider variant="middle" />
      <Typography variant="h5" gutterBottom component="h2">
        Backlog
      </Typography>
      <AchievementBacklog data={data.data} />
    </Layout>
  );
};

export default Dashboard;
