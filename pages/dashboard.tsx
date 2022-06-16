import type { NextPage } from 'next';
import Header from '../components/Header';

const Dashboard: NextPage = function Dashboard() {
  return (
    <div>
      <Header />
      <div>This will be the main page</div>
    </div>
  );
};

export default Dashboard;
