import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
import { Icon } from '@iconify/react';
// components
import Page from '../components/Page';
// ----------------------------------------------------------------------

export default function Agendas() {
  return (
    <Page title="Agendas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agendas
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Agenda
          </Button>
        </Stack>
      </Container>
    </Page>
  );
}
