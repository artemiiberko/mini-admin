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

AddPartner.propTypes = {
  setChangePartners: PropTypes.func,
  changePartners: PropTypes.array
};

export default function AddPartner({ setChangePartners, changePartners }) {
  const [addpartnererror, setAddpartnererror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newPartner, setNewPartner] = useState({
    id: 0,
    title: '',
    logo: '',
    link: '',
    status: ''
  });
  const addPartner = (partner) => {
    setChangePartners((prevState) => [...prevState, partner]);
  };
  const onPartnerChange = (e) => {
    let idPlus = Math.max(...changePartners.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewPartner((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newPartner.title !== '' &&
      newPartner.logo !== '' &&
      newPartner.link !== '' &&
      newPartner.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newPartner.title !== '' &&
      newPartner.logo !== '' &&
      newPartner.link !== '' &&
      newPartner.status !== ''
    ) {
      setAddpartnererror('');
      addPartner(newPartner);
      setNewPartner({
        id: 0,
        title: '',
        logo: '',
        link: '',
        status: ''
      });
    } else {
      setAddpartnererror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Partner">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Partner
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onPartnerChange}
                value={newPartner.title}
                name="title"
              />
              <Typography>Logo</Typography>
              <TextField
                type="file"
                placeholder="Logo"
                onChange={onPartnerChange}
                value={newPartner.logo}
                name="logo"
              />
              <Typography>Link</Typography>
              <TextField
                type="text"
                placeholder="Link"
                onChange={onPartnerChange}
                value={newPartner.link}
                name="link"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onPartnerChange}
                value={newPartner.status}
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
            {addpartnererror}
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
