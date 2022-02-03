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

AddMap.propTypes = {
  setChangeMaps: PropTypes.func,
  changeMaps: PropTypes.array
};

export default function AddMap({ setChangeMaps, changeMaps }) {
  const [addmaperror, setAddmaperror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newMap, setNewMap] = useState({
    id: 0,
    title: '',
    location: '',
    link: '',
    status: ''
  });
  const addMap = (map) => {
    setChangeMaps((prevState) => [...prevState, map]);
  };
  const onMapChange = (e) => {
    let idPlus = Math.max(...changeMaps.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewMap((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newMap.title !== '' &&
      newMap.location !== '' &&
      newMap.link !== '' &&
      newMap.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };

  const handleSubmit = () => {
    if (
      newMap.title !== '' &&
      newMap.location !== '' &&
      newMap.link !== '' &&
      newMap.status !== ''
    ) {
      setAddmaperror('');
      addMap(newMap);
      setNewMap({
        id: 0,
        title: '',
        location: '',
        link: '',
        status: ''
      });
    } else {
      setAddmaperror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Attendee">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Map
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onMapChange}
                value={newMap.title}
                name="title"
              />
              <Typography>Location</Typography>
              <TextField
                type="text"
                placeholder="Location"
                onChange={onMapChange}
                value={newMap.location}
                name="location"
              />
              <Typography>Link</Typography>
              <TextField
                type="text"
                placeholder="Link"
                onChange={onMapChange}
                value={newMap.link}
                name="link"
              />
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onMapChange} value={newMap.status}>
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
            {addmaperror}
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
