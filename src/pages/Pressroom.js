import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Pressroom() {
  return (
    <Page title="Press Room">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Press Room
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Press Room
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
