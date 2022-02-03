// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//

export default function Socialmedia() {
  return (
    <Page title="Social media">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Social media
          </Typography>
        </Stack>
        <Card>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px', margin: 'auto' }}>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">Twitter</Typography>
              <TextField
                style={{ padding: '0px 30px' }}
                type="text"
                placeholder="twitter link"
                defaultValue="https://twitter.com/EmiratesPolicy"
                name="twitter1"
              />
              <TextField
                style={{ padding: '0px 30px' }}
                type="text"
                placeholder="twitter link"
                defaultValue="https://twitter.com/EmiratesPolicy"
                name="twitter2"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">Youtube</Typography>
              <TextField
                style={{ padding: '0px 30px', flex: 1 }}
                type="text"
                placeholder="youtube link"
                defaultValue="https://www.youtube.com/channel/UCGOoBKNJ2ChDn8i31QqKw9Q?"
                name="youtube"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">Facebook</Typography>
              <TextField
                style={{ padding: '0px 30px', flex: 1 }}
                type="text"
                placeholder="facebook link"
                defaultValue="https://www.facebook.com/emiratespolicycenter"
                name="facebook"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">Linkedin</Typography>
              <TextField
                style={{ padding: '0px 30px', flex: 1 }}
                type="text"
                placeholder="linkedin link"
                defaultValue="http://www.linkedin.com/company/emirates-policy-center"
                name="linkedin"
              />
            </FormGroup>
            <FormGroup style={{ display: 'flex', flexDirection: 'row' }}>
              <Typography variant="h6">Instagram</Typography>
              <TextField
                style={{ padding: '0px 30px', flex: 1 }}
                type="text"
                placeholder="instagram link"
                defaultValue="https://www.instagram.com/emiratespolicycenter/"
                name="instagram"
              />
            </FormGroup>
            <Button variant="contained">Update</Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
