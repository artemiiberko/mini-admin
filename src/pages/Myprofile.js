// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//

export default function Myprofile() {
  return (
    <Page title="App version">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            My Profile
          </Typography>
        </Stack>
        <Card>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ flex: '15%' }}>
                Username
              </Typography>
              <TextField
                style={{ padding: '0px 30px', flex: '85%' }}
                type="text"
                placeholder="Username"
                defaultValue="user"
                name="username"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ flex: '15%' }}>
                Email
              </Typography>
              <TextField
                style={{ padding: '0px 30px', flex: '85%' }}
                type="text"
                placeholder="Email"
                defaultValue="email"
                name="email"
              />
            </FormGroup>
            <Button variant="contained">Submit</Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
