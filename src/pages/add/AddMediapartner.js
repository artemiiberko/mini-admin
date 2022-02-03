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

AddMediapartner.propTypes = {
  setChangeMediapartners: PropTypes.func,
  changeMediapartners: PropTypes.array
};

export default function AddMediapartner({ setChangeMediapartners, changeMediapartners }) {
  const [addmediapartnererror, setAddmediapartnererror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newMediapartner, setNewMediapartner] = useState({
    id: 0,
    title: '',
    logo: '',
    link: '',
    status: ''
  });
  const addMediapartner = (mediapartner) => {
    setChangeMediapartners((prevState) => [...prevState, mediapartner]);
  };
  const onMediapartnerChange = (e) => {
    let idPlus = Math.max(...changeMediapartners.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewMediapartner((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newMediapartner.title !== '' &&
      newMediapartner.link !== '' &&
      newMediapartner.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newMediapartner.title !== '' &&
      newMediapartner.link !== '' &&
      newMediapartner.status !== ''
    ) {
      setAddmediapartnererror('');
      addMediapartner(newMediapartner);
      setNewMediapartner({
        id: 0,
        title: '',
        logo: '',
        link: '',
        status: ''
      });
    } else {
      setAddmediapartnererror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Media Partner">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Media Partner
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onMediapartnerChange}
                value={newMediapartner.title}
                name="title"
              />
              <Typography>Logo</Typography>
              <TextField
                type="file"
                placeholder="Logo"
                onChange={onMediapartnerChange}
                value={newMediapartner.logo}
                name="logo"
              />
            </Stack>

            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Link</Typography>
              <TextField
                type="text"
                placeholder="Link"
                onChange={onMediapartnerChange}
                value={newMediapartner.link}
                name="link"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onMediapartnerChange}
                value={newMediapartner.status}
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
            {addmediapartnererror}
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
