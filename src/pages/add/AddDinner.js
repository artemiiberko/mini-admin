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

AddDinner.propTypes = {
  setChangeDinners: PropTypes.func,
  changeDinners: PropTypes.array
};

export default function AddDinner({ setChangeDinners, changeDinners }) {
  const [adddinnererror, setAdddinnererror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newDinner, setNewDinner] = useState({
    id: 0,
    title: '',
    location: '',
    description: '',
    date: '',
    fromtime: '',
    totime: '',
    status: ''
  });
  const addDinner = (dinner) => {
    setChangeDinners((prevState) => [...prevState, dinner]);
  };
  const onDinnerChange = (e) => {
    let idPlus = Math.max(...changeDinners.map((e) => e.id));
    idPlus += 1;
    let datestring = newDinner.date;
    if (e.target.name === 'date') {
      datestring = `${e.target.value} UTC`;
    }
    let fromtimestring = newDinner.fromtime;
    if (e.target.name === 'fromtime') {
      fromtimestring = `${e.target.value} UTC`;
    }
    let totimestring = newDinner.totime;
    if (e.target.name === 'totime') {
      totimestring = `${e.target.value} UTC`;
    }
    const { name, value } = e.target;
    setNewDinner((prevState) => ({
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
      newDinner.title !== '' &&
      newDinner.location !== '' &&
      newDinner.description !== '' &&
      newDinner.date !== '' &&
      newDinner.fromtime !== '' &&
      newDinner.totime !== '' &&
      newDinner.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };

  const handleSubmit = () => {
    if (
      newDinner.title !== '' &&
      newDinner.location !== '' &&
      newDinner.description !== '' &&
      newDinner.date !== '' &&
      newDinner.fromtime !== '' &&
      newDinner.totime !== '' &&
      newDinner.status !== ''
    ) {
      setAdddinnererror('');
      addDinner(newDinner);
      setNewDinner({
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
      setAdddinnererror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Dinner">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Dinner
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onDinnerChange}
                value={newDinner.title}
                name="title"
              />
              <Typography>Location</Typography>
              <TextField
                type="text"
                placeholder="Location"
                onChange={onDinnerChange}
                value={newDinner.location}
                name="location"
              />
              <Typography>Description</Typography>
              <TextField
                type="text"
                placeholder="Description"
                onChange={onDinnerChange}
                value={newDinner.description}
                name="description"
              />
              <Typography>Date</Typography>
              <TextField type="date" placeholder="Date" onChange={onDinnerChange} name="date" />
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onDinnerChange} value={newDinner.status}>
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
                onChange={onDinnerChange}
                name="fromtime"
              />
              <Typography>To Time</Typography>
              <TextField
                type="time"
                placeholder="To Time"
                onChange={onDinnerChange}
                name="totime"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {adddinnererror}
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
