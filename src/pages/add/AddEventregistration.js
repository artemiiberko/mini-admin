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
// ----------------------------------------------------------------------

AddEventregistration.propTypes = {
  setChangeEventregistrations: PropTypes.func,
  changeEventregistrations: PropTypes.array
};

export default function AddEventregistration({
  setChangeEventregistrations,
  changeEventregistrations
}) {
  const [addeventregistrationerror, setAddeventregistrationerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newEventregistration, setNewEventregistration] = useState({
    id: 0,
    title: '',
    location: '',
    description: '',
    date: '',
    fromtime: '',
    totime: '',
    status: ''
  });
  const addEventregistration = (eventregistration) => {
    setChangeEventregistrations((prevState) => [...prevState, eventregistration]);
  };
  const onEventregistrationChange = (e) => {
    let idPlus = Math.max(...changeEventregistrations.map((e) => e.id));
    idPlus += 1;
    let datestring = newEventregistration.date;
    if (e.target.name === 'date') {
      datestring = `${e.target.value} UTC`;
    }
    let fromtimestring = newEventregistration.fromtime;
    if (e.target.name === 'fromtime') {
      fromtimestring = `${e.target.value} UTC`;
    }
    let totimestring = newEventregistration.totime;
    if (e.target.name === 'totime') {
      totimestring = `${e.target.value} UTC`;
    }
    const { name, value } = e.target;
    setNewEventregistration((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      date: datestring,
      fromtime: fromtimestring,
      totime: totimestring
    }));
  };
  const handleLinkAdd = () => {
    if (
      newEventregistration.title !== '' &&
      newEventregistration.location !== '' &&
      newEventregistration.description !== '' &&
      newEventregistration.date !== '' &&
      newEventregistration.fromtime !== '' &&
      newEventregistration.totime !== '' &&
      newEventregistration.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };

  const handleSubmit = () => {
    if (
      newEventregistration.title !== '' &&
      newEventregistration.location !== '' &&
      newEventregistration.description !== '' &&
      newEventregistration.date !== '' &&
      newEventregistration.fromtime !== '' &&
      newEventregistration.totime !== '' &&
      newEventregistration.status !== ''
    ) {
      setAddeventregistrationerror('');
      addEventregistration(newEventregistration);
      setNewEventregistration({
        id: 0,
        title: '',
        location: '',
        description: '',
        date: '',
        fromtime: '',
        totime: '',
        status: ''
      });
    } else {
      setAddeventregistrationerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Event">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Event
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onEventregistrationChange}
                value={newEventregistration.title}
                name="title"
              />
              <Typography>Location</Typography>
              <TextField
                type="text"
                placeholder="Location"
                onChange={onEventregistrationChange}
                value={newEventregistration.location}
                name="location"
              />
              <Typography>Description</Typography>
              <TextField
                type="text"
                placeholder="Description"
                onChange={onEventregistrationChange}
                value={newEventregistration.description}
                name="description"
              />
              <Typography>Date</Typography>
              <TextField
                type="date"
                placeholder="Date"
                onChange={onEventregistrationChange}
                name="date"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onEventregistrationChange}
                value={newEventregistration.status}
              >
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
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>From Time</Typography>
              <TextField
                type="time"
                placeholder="From Time"
                onChange={onEventregistrationChange}
                name="fromtime"
              />
              <Typography>To Time</Typography>
              <TextField
                type="time"
                placeholder="To Time"
                onChange={onEventregistrationChange}
                name="totime"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addeventregistrationerror}
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
