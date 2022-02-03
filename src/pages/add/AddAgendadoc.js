import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

AddAgendadoc.propTypes = {
  setChangeAgendadocs: PropTypes.func,
  changeAgendadocs: PropTypes.array
};

export default function AddAgendadoc({ setChangeAgendadocs, changeAgendadocs }) {
  const [addagendadocerror, setAddagendadocerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newAgendadoc, setNewAgendadoc] = useState({
    id: 0,
    detailfile: '',
    speechfile: '',
    title: ''
  });
  const addAgendadoc = (agendadoc) => {
    setChangeAgendadocs((prevState) => [...prevState, agendadoc]);
  };
  const onAgendadocChange = (e) => {
    let idPlus = Math.max(...changeAgendadocs.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewAgendadoc((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newAgendadoc.title !== '' &&
      newAgendadoc.detailfile !== '' &&
      newAgendadoc.speechfile !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newAgendadoc.title !== '' &&
      newAgendadoc.detailfile !== '' &&
      newAgendadoc.speechfile !== ''
    ) {
      setAddagendadocerror('');
      addAgendadoc(newAgendadoc);
      setNewAgendadoc({
        id: 0,
        title: '',
        detailfile: '',
        speechfile: ''
      });
    } else {
      setAddagendadocerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Attendee">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Agenda Doc
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '100%', padding: '10px', flexShrink: '0' }}>
              <Typography>Agenda Title</Typography>
              <TextField
                type="text"
                placeholder="Agenda Title"
                onChange={onAgendadocChange}
                value={newAgendadoc.title}
                name="title"
              />
              <Typography>Agenda Detail File</Typography>
              <TextField
                type="file"
                placeholder="Agenda Detail File"
                onChange={onAgendadocChange}
                value={newAgendadoc.detailfile}
                name="detailfile"
              />
              <Typography>Agenda Speech File</Typography>
              <TextField
                type="file"
                placeholder="Agenda Speech File"
                onChange={onAgendadocChange}
                value={newAgendadoc.speechfile}
                name="speechfile"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addagendadocerror}
          </Typography>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="flex-end"
            maxWidth="1000px"
            margin="auto"
          >
            <Link to="../">
              <Button variant="outlined" color="error">
                Close
              </Button>
            </Link>
            <Link to={linkAdd} onMouseEnter={handleLinkAdd}>
              <Button variant="contained" onClick={handleSubmit}>
                Add
              </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
