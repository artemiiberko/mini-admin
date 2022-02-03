import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  FormGroup,
  Select,
  MenuItem
} from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------
const statuslist = ['Active', 'Inactive'];
const speakerslist = ['speaker1', 'speaker2', 'speaker3'];
// ----------------------------------------------------------------------

AddAgenda.propTypes = {
  setChangeAgendas: PropTypes.func,
  changeAgendas: PropTypes.array
};

export default function AddAgenda({ setChangeAgendas, changeAgendas }) {
  const [addagendaerror, setAddagendaerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newAgenda, setNewAgenda] = useState({
    id: 0,
    title: '',
    description: '',
    speakers: '',
    rating: '',
    status: ''
  });
  const addAgenda = (agenda) => {
    setChangeAgendas((prevState) => [...prevState, agenda]);
  };
  const onAgendaChange = (e) => {
    let idPlus = Math.max(...changeAgendas.map((e) => e.id));
    idPlus += 1;

    const { name, value } = e.target;
    setNewAgenda((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newAgenda.title !== '' &&
      newAgenda.description !== '' &&
      newAgenda.speakers !== '' &&
      newAgenda.rating !== '' &&
      newAgenda.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newAgenda.title !== '' &&
      newAgenda.description !== '' &&
      newAgenda.speakers !== '' &&
      newAgenda.rating !== '' &&
      newAgenda.status !== ''
    ) {
      setAddagendaerror('');
      addAgenda(newAgenda);
      setNewAgenda({
        id: 0,
        title: '',
        description: '',
        speakers: '',
        rating: '',
        status: ''
      });
    } else {
      setAddagendaerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Attendee">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Agenda
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onAgendaChange}
                value={newAgenda.title}
                name="title"
              />
              <Typography>Description</Typography>
              <TextField
                multiline
                minRows={6}
                maxRows={6}
                type="text"
                placeholder="Description"
                onChange={onAgendaChange}
                value={newAgenda.descripton}
                name="description"
              />
            </Stack>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Speakers</Typography>
              <Select
                displayEmpty
                name="speakers"
                onChange={onAgendaChange}
                value={newAgenda.speakers}
              >
                <MenuItem key="speakers" value="" style={{ color: 'grey' }}>
                  Select Speaker...
                </MenuItem>
                {speakerslist.map((speaker) => (
                  <MenuItem key={speaker} value={speaker}>
                    {speaker}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Rating</Typography>
              <TextField
                type="number"
                placeholder="Rating"
                onChange={onAgendaChange}
                value={newAgenda.rating}
                name="rating"
              />
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onAgendaChange} value={newAgenda.status}>
                <MenuItem key="status" value="" style={{ color: 'grey' }}>
                  Select Status...
                </MenuItem>
                {statuslist.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addagendaerror}
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
