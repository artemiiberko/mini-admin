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
const titlelist = ['Mr.', 'Mrs.'];
const appstatuslist = [
  'Entered',
  'Link Sent',
  'Form Submitted',
  'Hold Incomplete Details',
  'Under Process',
  'Hotel Booked',
  'Completed',
  'Cancelled',
  'No Reply'
];
const attendeetypelist = ['Local', 'International', 'VIP Local', 'VIP International'];

// ----------------------------------------------------------------------

AddAttendee.propTypes = {
  setChangeAttendees: PropTypes.func,
  changeAttendees: PropTypes.array
};

export default function AddAttendee({ setChangeAttendees, changeAttendees }) {
  const [addattendeeerror, setAddattendeeerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');

  function emailExists(email) {
    return changeAttendees.some((e) => e.email === email);
  }
  const [newAttendee, setNewAttendee] = useState({
    id: 0,
    title: '',
    name: '',
    lname: '',
    attendeetype: '',
    email: '',
    subdate: '',
    status: '',
    appstatus: '',
    namearabic: '',
    lnamearabic: '',
    organizationname: '',
    jobtitle: '',
    countrycode: '',
    contactnumber: '',
    fullname: '',
    bio: '',
    nationality: '',
    passportnumber: '',
    dateofissue: '',
    dateofexpire: '',
    passportdoc: '',
    passportphoto: '',
    airportofdeparture: '',
    countryofdeparture: '',
    preference: '',
    visa: '',
    smokingrequired: '',
    twitter: '',
    country: '',
    city: '',
    role: '',
    rsvp: '',
    rsvpcomments: '',
    statusremark: '',
    invitationtype: '',
    registrationtype: '',
    transportation: '',
    transportcomments: '',
    airlinename: '',
    airlinebknumber: '',
    hotelbknumber: '',
    chekin: '',
    checkout: '',
    linkexpire: ''
  });
  const addAttendee = (attendee) => {
    setChangeAttendees((prevState) => [...prevState, attendee]);
  };

  const onAttendeeChange = (e) => {
    let idPlus = Math.max(...changeAttendees.map((e) => e.id));
    idPlus += 1;
    const nowdate = new Date(Date.now());
    const nowdateyear = nowdate.getUTCFullYear();
    const nowdatemonth = nowdate.getUTCMonth() + 1;
    const nowdateday = nowdate.getUTCDate();
    const nowdatehours = nowdate.getUTCHours() + 1;
    const nowdateminutes = nowdate.getUTCMinutes() + 1;

    const nowdatestring = `${nowdateyear.toString()}-${
      nowdatemonth > 9 ? nowdatemonth.toString() : `0${nowdatemonth.toString()}`
    }-${nowdateday > 9 ? nowdateday.toString() : `0${nowdateday.toString()}`} ${
      nowdatehours > 9 ? nowdatehours.toString() : `0${nowdatehours.toString()}`
    }:${nowdateminutes > 9 ? nowdateminutes.toString() : `0${nowdateminutes.toString()}`}
     UTC`;
    const { name, value } = e.target;
    setNewAttendee((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      subdate: nowdatestring
    }));
  };
  const handleLinkAdd = () => {
    if (
      newAttendee.name !== '' &&
      newAttendee.lname !== '' &&
      newAttendee.email !== '' &&
      newAttendee.attendeetype !== '' &&
      newAttendee.title !== '' &&
      newAttendee.status !== '' &&
      newAttendee.appstatus !== ''
    ) {
      if (!emailExists(newAttendee.email)) {
        setLinkAdd('..');
      } else {
        setLinkAdd('');
      }
    }
  };
  const handleSubmit = () => {
    if (
      newAttendee.name !== '' &&
      newAttendee.lname !== '' &&
      newAttendee.email !== '' &&
      newAttendee.attendeetype !== '' &&
      newAttendee.title !== '' &&
      newAttendee.status !== '' &&
      newAttendee.appstatus !== ''
    ) {
      if (emailExists(newAttendee.email)) {
        setAddattendeeerror('Email is already exists');
      } else {
        setAddattendeeerror('');
        addAttendee(newAttendee);
        setNewAttendee({
          id: 0,
          title: '',
          name: '',
          lname: '',
          attendeetype: '',
          email: '',
          subdate: '',
          status: '',
          appstatus: '',
          namearabic: '',
          lnamearabic: '',
          organizationname: '',
          jobtitle: '',
          countrycode: '',
          contactnumber: '',
          fullname: '',
          bio: '',
          nationality: '',
          passportnumber: '',
          dateofissue: '',
          dateofexpire: '',
          passportdoc: '',
          passportphoto: '',
          airportofdeparture: '',
          countryofdeparture: '',
          preference: '',
          visa: '',
          smokingrequired: '',
          twitter: '',
          country: '',
          city: '',
          role: '',
          rsvp: '',
          rsvpcomments: '',
          statusremark: '',
          invitationtype: '',
          registrationtype: '',
          transportation: '',
          transportcomments: '',
          airlinename: '',
          airlinebknumber: '',
          hotelbknumber: '',
          chekin: '',
          checkout: '',
          linkexpire: ''
        });
      }
    } else {
      setAddattendeeerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Attendee">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Attendee
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <Select
                displayEmpty
                onChange={onAttendeeChange}
                value={newAttendee.title}
                name="title"
              >
                <MenuItem key="title" value="" style={{ color: 'grey' }}>
                  Select title...
                </MenuItem>
                {titlelist.map((title) => (
                  <MenuItem key={title} value={title}>
                    {title}
                  </MenuItem>
                ))}
              </Select>
              <Typography>First Name</Typography>
              <TextField
                type="text"
                placeholder="First Name"
                onChange={onAttendeeChange}
                value={newAttendee.name}
                name="name"
              />
              <Typography>Last Name</Typography>
              <TextField
                type="text"
                placeholder="Last Name"
                onChange={onAttendeeChange}
                value={newAttendee.lname}
                name="lname"
              />
            </Stack>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Email Address</Typography>
              <TextField
                type="text"
                placeholder="Email Address"
                onChange={onAttendeeChange}
                value={newAttendee.email}
                name="email"
              />
              <Typography>Attendee Type</Typography>
              <Select
                displayEmpty
                name="attendeetype"
                onChange={onAttendeeChange}
                value={newAttendee.attendeetype}
              >
                <MenuItem key="attendeetype" value="" style={{ color: 'grey' }}>
                  Select Attendee Type...
                </MenuItem>
                {attendeetypelist.map((attendeetype) => (
                  <MenuItem key={attendeetype} value={attendeetype}>
                    {attendeetype}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Application Status</Typography>
              <Select
                displayEmpty
                name="appstatus"
                onChange={onAttendeeChange}
                value={newAttendee.appstatus}
              >
                <MenuItem key="appstatus" value="" style={{ color: 'grey' }}>
                  Select Application Status...
                </MenuItem>
                {appstatuslist.map((appstatus) => (
                  <MenuItem key={appstatus} value={appstatus}>
                    {appstatus}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onAttendeeChange}
                value={newAttendee.status}
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
            {addattendeeerror}
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
