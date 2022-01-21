// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//

export default function Appversion() {
  return (
    <Page title="App version">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            App version
          </Typography>
        </Stack>
        <Card>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">App Version</Typography>
              <TextField
                style={{ padding: '0px 30px', flex: 1 }}
                type="text"
                placeholder="app version"
                defaultValue="1"
                name="appversion"
              />
            </FormGroup>
            <Button variant="contained">Update</Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
