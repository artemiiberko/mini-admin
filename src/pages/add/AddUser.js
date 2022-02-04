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
  Select,
  MenuItem,
  TextField,
  FormGroup
} from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------

const statuslist = ['Active', 'Inactive'];
const userrolelist = [
  'VIP Guest',
  'Guest',
  'Media',
  'Speakers',
  'Moderator',
  'EPC Staff',
  'Volunteers',
  'Security',
  'Administration'
];

// ----------------------------------------------------------------------

AddUser.propTypes = {
  setChangeUsers: PropTypes.func,
  changeUsers: PropTypes.array
};

export default function AddUser({ setChangeUsers, changeUsers }) {
  const [addusererror, setAddusererror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');

  function emailExists(email) {
    return changeUsers.some((e) => e.email === email);
  }
  const [newUser, setNewUser] = useState({
    id: 0,
    name: '',
    email: '',
    createddate: '',
    status: '',
    userrole: ''
  });
  const addUser = (user) => {
    setChangeUsers((prevState) => [...prevState, user]);
  };

  const onUserChange = (e) => {
    let idPlus = Math.max(...changeUsers.map((e) => e.id));
    idPlus += 1;
    let datestring = newUser.createddate;
    if (e.target.name === 'createddate') {
      datestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    const { name, value } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      createddate: datestring
    }));
  };
  const handleLinkAdd = () => {
    if (
      newUser.name !== '' &&
      newUser.email !== '' &&
      newUser.userrole !== '' &&
      newUser.status !== ''
    ) {
      if (!emailExists(newUser.email)) {
        setLinkAdd('..');
      } else {
        setLinkAdd('');
      }
    }
  };
  const handleSubmit = () => {
    if (
      newUser.name !== '' &&
      newUser.email !== '' &&
      newUser.userrole !== '' &&
      newUser.status !== ''
    ) {
      if (emailExists(newUser.email)) {
        setAddusererror('Email is already exists');
      } else {
        setAddusererror('');
        addUser(newUser);
        setNewUser({
          id: 0,
          name: '',
          email: '',
          createddate: '',
          status: '',
          userrole: ''
        });
      }
    } else {
      setAddusererror('Please fill all fields');
    }
  };

  return (
    <Page title="Add User">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New User
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Name</Typography>
              <TextField
                type="text"
                placeholder="Name"
                onChange={onUserChange}
                value={newUser.name}
                name="name"
              />
            </Stack>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Email Address</Typography>
              <TextField
                type="text"
                placeholder="Email Address"
                onChange={onUserChange}
                value={newUser.email}
                name="email"
              />
              <Typography>User Role</Typography>
              <Select displayEmpty name="userrole" onChange={onUserChange} value={newUser.userrole}>
                <MenuItem key="userrole" value="" style={{ color: 'grey' }}>
                  Select User Role...
                </MenuItem>
                {userrolelist.map((userrole) => (
                  <MenuItem key={userrole} value={userrole}>
                    {userrole}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Created Date</Typography>
              <TextField
                type="datetime-local"
                placeholder="Created Date"
                onChange={onUserChange}
                name="createddate"
              />
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onUserChange} value={newUser.status}>
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
            {addusererror}
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
