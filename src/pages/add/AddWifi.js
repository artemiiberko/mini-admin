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

AddWifi.propTypes = {
  setChangeWifis: PropTypes.func,
  changeWifis: PropTypes.array
};

export default function AddWifi({ setChangeWifis, changeWifis }) {
  const [addwifierror, setAddwifierror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newWifi, setNewWifi] = useState({
    id: 0,
    wifiname: '',
    password: '',
    description: '',
    status: ''
  });
  const addWifi = (wifi) => {
    setChangeWifis((prevState) => [...prevState, wifi]);
  };
  const onWifiChange = (e) => {
    let idPlus = Math.max(...changeWifis.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewWifi((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newWifi.wifiname !== '' &&
      newWifi.password !== '' &&
      newWifi.description !== '' &&
      newWifi.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newWifi.wifiname !== '' &&
      newWifi.password !== '' &&
      newWifi.description !== '' &&
      newWifi.status !== ''
    ) {
      setAddwifierror('');
      addWifi(newWifi);
      setNewWifi({
        id: 0,
        wifiname: '',
        password: '',
        description: '',
        status: ''
      });
    } else {
      setAddwifierror('Please fill all fields');
    }
  };
  return (
    <Page title="Add WiFi">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New WiFi
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>WiFi Name</Typography>
              <TextField
                type="text"
                placeholder="WiFi Name"
                onChange={onWifiChange}
                value={newWifi.wifiname}
                name="wifiname"
              />
              <Typography>Password</Typography>
              <TextField
                type="text"
                placeholder="Password"
                onChange={onWifiChange}
                value={newWifi.password}
                name="password"
              />
              <Typography>Description</Typography>
              <TextField
                type="text"
                placeholder="Description"
                onChange={onWifiChange}
                value={newWifi.description}
                name="description"
              />
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onWifiChange} value={newWifi.status}>
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
            {addwifierror}
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
