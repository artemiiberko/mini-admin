// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//

export default function Changepassword() {
  return (
    <Page title="App version">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Change Password
          </Typography>
        </Stack>
        <Card>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ flex: '15%' }}>
                Old password
              </Typography>
              <TextField
                style={{ padding: '0px 30px', flex: '85%' }}
                type="password"
                placeholder="Old password"
                name="oldpassword"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ flex: '15%' }}>
                Password
              </Typography>
              <TextField
                style={{ padding: '0px 30px', flex: '85%' }}
                type="password"
                placeholder="Password"
                name="password"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6" style={{ flex: '15%' }}>
                Confirm Password
              </Typography>
              <TextField
                style={{ padding: '0px 30px', flex: '85%' }}
                type="password"
                placeholder=" Confirm Password"
                name="confirmpassword"
              />
            </FormGroup>
            <Button variant="contained">Submit</Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
