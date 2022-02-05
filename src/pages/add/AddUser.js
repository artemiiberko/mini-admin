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
  FormGroup,
  FormControlLabel,
  Checkbox
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
  const userobj = {
    id: 0,
    name: '',
    email: '',
    createddate: '',
    status: '',
    userrole: '',
    manageattendees: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    manageinformations: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    manageusers: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    manageagenda: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    managepolls: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    managenotification: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    },
    manageworkshop: {
      create: false,
      delete: false,
      edit: false,
      export: false,
      view: false
    }
  };
  function emailExists(email) {
    return changeUsers.some((e) => e.email === email);
  }
  const [newUser, setNewUser] = useState(userobj);
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
    console.log(newUser);
  };
  const onUserChangeCheckbox = (e) => {
    const { name, id, checked } = e.target;
    setNewUser((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: checked
      }
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
        setNewUser(userobj);
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
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Attendees</Typography>
                <FormControlLabel
                  control={
                    <Checkbox id="manageattendees" name="create" onChange={onUserChangeCheckbox} />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageattendees" name="delete" onChange={onUserChangeCheckbox} />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageattendees" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageattendees" name="export" onChange={onUserChangeCheckbox} />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageattendees" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Informations</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="manageinformations"
                      name="create"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="manageinformations"
                      name="delete"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageinformations" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="manageinformations"
                      name="export"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageinformations" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Users</Typography>
                <FormControlLabel
                  control={
                    <Checkbox id="manageusers" name="create" onChange={onUserChangeCheckbox} />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageusers" name="delete" onChange={onUserChangeCheckbox} />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageusers" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageusers" name="export" onChange={onUserChangeCheckbox} />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageusers" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Agenda</Typography>
                <FormControlLabel
                  control={
                    <Checkbox id="manageagenda" name="create" onChange={onUserChangeCheckbox} />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageagenda" name="delete" onChange={onUserChangeCheckbox} />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageagenda" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageagenda" name="export" onChange={onUserChangeCheckbox} />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageagenda" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Polls</Typography>
                <FormControlLabel
                  control={
                    <Checkbox id="managepolls" name="create" onChange={onUserChangeCheckbox} />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managepolls" name="delete" onChange={onUserChangeCheckbox} />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managepolls" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managepolls" name="export" onChange={onUserChangeCheckbox} />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managepolls" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Notification</Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="managenotification"
                      name="create"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="managenotification"
                      name="delete"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managenotification" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="managenotification"
                      name="export"
                      onChange={onUserChangeCheckbox}
                    />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="managenotification" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
              <Stack style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <Typography style={{ flexBasis: '20%' }}>Manage Workshop</Typography>
                <FormControlLabel
                  control={
                    <Checkbox id="manageworkshop" name="create" onChange={onUserChangeCheckbox} />
                  }
                  label="Create"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageworkshop" name="delete" onChange={onUserChangeCheckbox} />
                  }
                  label="Delete"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageworkshop" name="edit" onChange={onUserChangeCheckbox} />
                  }
                  label="Edit"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageworkshop" name="export" onChange={onUserChangeCheckbox} />
                  }
                  label="Export"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="manageworkshop" name="view" onChange={onUserChangeCheckbox} />
                  }
                  label="View"
                />
              </Stack>
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
