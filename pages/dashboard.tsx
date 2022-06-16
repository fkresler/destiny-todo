import type { NextPage } from 'next';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Layout from '../components/Layout';

const Dashboard: NextPage = function Dashboard() {
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
    </Layout>
  );
};

export default Dashboard;
