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

AddNotification.propTypes = {
  setChangeNotifications: PropTypes.func,
  changeNotifications: PropTypes.array
};

export default function AddNotification({ setChangeNotifications, changeNotifications }) {
  const [addnotificationerror, setAddnotificationerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newNotification, setNewNotification] = useState({
    id: 0,
    title: '',
    description: '',
    datefull: '',
    status: ''
  });
  const addNotification = (notification) => {
    setChangeNotifications((prevState) => [...prevState, notification]);
  };
  const onNotificationChange = (e) => {
    let idPlus = Math.max(...changeNotifications.map((e) => e.id));
    idPlus += 1;
    let datestring = newNotification.datefull;
    if (e.target.name === 'datefull') {
      datestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }

    const { name, value } = e.target;
    setNewNotification((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      datefull: datestring
    }));
  };
  const handleLinkAdd = () => {
    if (
      newNotification.title !== '' &&
      newNotification.description !== '' &&
      newNotification.datefull !== '' &&
      newNotification.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newNotification.title !== '' &&
      newNotification.description !== '' &&
      newNotification.datefull !== '' &&
      newNotification.status !== ''
    ) {
      setAddnotificationerror('');
      addNotification(newNotification);
      setNewNotification({
        id: 0,
        title: '',
        description: '',
        datefull: '',
        status: ''
      });
    } else {
      setAddnotificationerror('Please fill all fields');
    }
  };
  return (
    <Page title="Add Notification">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Notification
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onNotificationChange}
                value={newNotification.title}
                name="title"
              />

              <Typography>Date</Typography>
              <TextField
                type="datetime-local"
                placeholder="Date"
                onChange={onNotificationChange}
                name="datefull"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onNotificationChange}
                value={newNotification.status}
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
              <Typography>Description</Typography>
              <TextField
                multiline
                minRows={6}
                maxRows={6}
                type="text"
                placeholder="Description"
                onChange={onNotificationChange}
                value={newNotification.description}
                name="description"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addnotificationerror}
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
