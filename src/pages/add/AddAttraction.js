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

AddAttraction.propTypes = {
  setChangeAttractions: PropTypes.func,
  changeAttractions: PropTypes.array
};

export default function AddAttraction({ setChangeAttractions, changeAttractions }) {
  const [addattractionerror, setAddattractionerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newAttraction, setNewAttraction] = useState({
    id: 0,
    title: '',
    location: '',
    status: ''
  });
  const addAttraction = (attraction) => {
    setChangeAttractions((prevState) => [...prevState, attraction]);
  };
  const onAttractionChange = (e) => {
    let idPlus = Math.max(...changeAttractions.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewAttraction((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newAttraction.title !== '' &&
      newAttraction.location !== '' &&
      newAttraction.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newAttraction.title !== '' &&
      newAttraction.location !== '' &&
      newAttraction.status !== ''
    ) {
      setAddattractionerror('');
      addAttraction(newAttraction);
      setNewAttraction({
        id: 0,
        title: '',
        location: '',
        status: ''
      });
    } else {
      setAddattractionerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Attraction">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Attraction
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onAttractionChange}
                value={newAttraction.title}
                name="title"
              />
              <Typography>Location</Typography>
              <TextField
                type="text"
                placeholder="Location"
                onChange={onAttractionChange}
                value={newAttraction.location}
                name="location"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onAttractionChange}
                value={newAttraction.status}
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
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addattractionerror}
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
