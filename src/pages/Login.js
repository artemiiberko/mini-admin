// material
import { styled } from '@mui/material/styles';
import { Stack, Container, Typography } from '@mui/material';
// layouts
// components
import Page from '../components/Page';
import { LoginForm } from '../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login({ setLogin, login, tokenRequest }) {
  return (
    <RootStyle title="Login | Minimal-UI">
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in to ADSD
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <LoginForm setLogin={setLogin} login={login} tokenRequest={tokenRequest} />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
