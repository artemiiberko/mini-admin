import { useState } from 'react';
// import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
/* const statuslist = ['Active', 'Inactive']; */
const speakerslist = [1, 2, 3, 4, 5];
// ----------------------------------------------------------------------

/* AddAgenda.propTypes = {
  setChangeAgendas: PropTypes.func
   changeAgendas: PropTypes.array 
}; */

export default function AddAgenda() {
  /* {
     setChangeAgendas
    changeAgendas 
  } */
  const [addagendaerror, setAddagendaerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newAgenda, setNewAgenda] = useState({
    id: 0,
    title: '',
    description: '',
    speakers: [],
    polls: [],
    startDate: '2022-01-01T00:00',
    endDate: '2022-01-01T00:00'
    /*    rating: '',
    status: '' */
  });
  const addAgenda = (agenda) => {
    const agendajson = JSON.stringify(agenda);
    axios
      .post(`https://wr.raneddo.ml/api/Agenda`, agendajson, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then((res) => {
        console.log(res);
      });
  };
  const onAgendaChange = (e) => {
    /*  let idPlus = Math.max(...changeAgendas.map((e) => e.id));
    idPlus += 1; */
    let speakersarray = newAgenda.speakers;
    if (e.target.name === 'speakers') {
      speakersarray = [parseInt(e.target.value, 10)];
    }
    const { name, value } = e.target;
    setNewAgenda((prevState) => ({
      ...prevState,
      [name]: value,
      speakers: speakersarray
      /* id: idPlus */
    }));
  };
  const handleLinkAdd = () => {
    if (
      newAgenda.title !== '' &&
      newAgenda.description !== '' &&
      newAgenda.speakers.length !== 0 /* &&
      newAgenda.rating !== '' &&
      newAgenda.status !== '' */
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
      newAgenda.speakers.length !== 0 /* &&
      newAgenda.rating !== '' &&
      newAgenda.status !== '' */
    ) {
      setAddagendaerror('');
      console.log(newAgenda);
      addAgenda(newAgenda);
      setNewAgenda({
        id: 0,
        title: '',
        description: '',
        speakers: [],
        polls: [],
        startDate: '2022-01-01T00:00',
        endDate: '2022-01-01T00:00'
        /*    rating: '',
        status: '' */
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
              {/* }<Typography>Rating</Typography>
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
                </Select> { */}
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
