import Head from 'next/head';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

function Header() {
  return (
    <AppBar position="fixed">
      <Head>
        <title>Destiny Achievement Tracker</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toolbar>
        <Link href="/">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="Go to start"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Destiny Achievement Tracker
        </Typography>
        <Link href="/login">
          <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
