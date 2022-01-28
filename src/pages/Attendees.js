import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Modal } from 'react-bootstrap';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Select,
  MenuItem,
  TextField,
  FormGroup
} from '@mui/material';
import closeFill from '@iconify/icons-eva/close-fill';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import USERLIST from '../_mocks_/user';
// ----------------------------------------------------------------------

const countrylist = ['Africa', 'Germany', 'Ireland', 'USA', 'Poland', 'Russia'];
const citylist = ['Berlin', 'Washington', 'Sydney', 'London'];
const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'name', label: 'First Name', alignRight: false },
  { id: 'lname', label: 'Last Name', alignRight: false },
  { id: 'email', label: 'Email Address', alignRight: false },
  { id: 'appstatus', label: 'Application Status', alignRight: false },
  { id: 'subdate', label: 'Submitted Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];
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
const rolelist = [
  'VIP Guest',
  'Media',
  'Speakers',
  'Moderator',
  'EPC Staff',
  'Volunteers',
  'Security',
  'Administration'
];
const rsvplist = ['Open', 'Attended', 'Not Attended', 'Remind'];
const editlist = {
  text: [
    { name: 'First Name', id: 'name' },
    { name: 'Last Name', id: 'lname' },
    { name: 'Password', id: 'password' },
    { name: 'Email', id: 'email' }
  ],
  select: [
    { name: 'Title', id: 'title' },
    { name: 'Status', id: 'status' },
    { name: 'Application Status', id: 'appstatus' },
    { name: 'Attendee Type', id: 'attendeetype' }
  ],
  file: [],
  date: [],
  time: [],
  datetime: [{ name: 'Submitted Date', id: 'subdate' }],
  textmb: [
    { name: 'First Name (Arabic)', id: 'namearabic' },
    { name: 'Last Name (Arabic)', id: 'lnamearabic' },
    { name: 'Organization Name', id: 'organizationname' },
    { name: 'Job Title', id: 'jobtitle' },
    { name: 'Country Code', id: 'countrycode' },
    { name: 'Contact Number', id: 'contactnumber' },
    { name: 'Full Name', id: 'fullname' },
    { name: 'Bio', id: 'bio' },
    { name: 'Airport Of Departure', id: 'airportofdeparture' },
    { name: 'Preference', id: 'preference' },
    { name: 'Twitter', id: 'twitter' },
    { name: 'RSVP Comments', id: 'rsvpcomments' },
    { name: 'Status Remark', id: 'statusremark' },
    { name: 'Transport Comments', id: 'transportcomments' },
    { name: 'Airline Name', id: 'airlinename' },
    { name: 'Airline BK Number', id: 'airlinebknumber' },
    { name: 'Hotel BK Number', id: 'hotelbknumber' },
    { name: 'Country Of Departure', id: 'countryofdeparture' },
    { name: 'Passport Number', id: 'passportnumber' }
  ],
  selectmb: [
    { name: 'Visa', id: 'visa' },
    { name: 'Nationality', id: 'nationality' },
    { name: 'Resident Country', id: 'country' },
    { name: 'Resident City', id: 'city' },
    { name: 'Role', id: 'role' },
    { name: 'RSVP', id: 'rsvp' },
    { name: 'Invitation Type', id: 'invitationtype' },
    { name: 'Registration Type', id: 'registrationtype' },
    { name: 'Link Expire', id: 'linkexpire' },
    { name: 'Transportation', id: 'transportation' },
    { name: 'Smoking Required', id: 'smokingrequired' }
  ],
  filemb: [
    { name: 'Passport Doc', id: 'passportdoc' },
    { name: 'Passport Photo', id: 'passportphoto' }
  ],
  datemb: [
    { name: 'Date Of Issue', id: 'dateofissue' },
    { name: 'Date Of Expire', id: 'dateofexpire' },
    { name: 'Checkin', id: 'checkin' },
    { name: 'Checkout', id: 'checkout' }
  ],
  timemb: [],
  datetimemb: []
};

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array,
  comparator,
  query,
  status,
  appstatus,
  attendeetype,
  city,
  country,
  role,
  rsvp
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query || status || appstatus || attendeetype || country || city || rsvp || role) {
    return filter(
      array,
      (_user) =>
        (_user.lname.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          _user.id.toString().indexOf(query.toLowerCase()) !== -1 ||
          _user.email.toLowerCase().indexOf(query.toLowerCase()) !== -1) &&
        _user.status.indexOf(status) !== -1 &&
        _user.attendeetype.indexOf(attendeetype) !== -1 &&
        _user.role.indexOf(role) !== -1 &&
        _user.rsvp.indexOf(rsvp) !== -1 &&
        _user.city.indexOf(city) !== -1 &&
        _user.country.indexOf(country) !== -1 &&
        _user.appstatus.indexOf(appstatus) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Attendees() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [filterAppStatus, setFilterAppStatus] = useState('');
  const [filterCity, setFilterCity] = useState('');
  const [filterAttendeeType, setFilterAttendeeType] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterRsvp, setFilterRsvp] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const [changeAttendees, setChangeAttendees] = useState(USERLIST);
  const [addattendeeerror, setAddattendeeerror] = useState('');

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
        handleClose();
      }
    } else {
      setAddattendeeerror('Please fill all fields');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  };
  const handleFilterCountry = (event) => {
    setFilterCountry(event.target.value);
  };
  const handleFilterAppStatus = (event) => {
    setFilterAppStatus(event.target.value);
  };
  const handleFilterCity = (event) => {
    setFilterCity(event.target.value);
  };
  const handleFilterAttendeeType = (event) => {
    setFilterAttendeeType(event.target.value);
  };
  const handleFilterRole = (event) => {
    setFilterRole(event.target.value);
  };
  const handleFilterRsvp = (event) => {
    setFilterRsvp(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    changeAttendees,
    getComparator(order, orderBy),
    filter,
    filterStatus,
    filterAppStatus,
    filterAttendeeType,
    filterCity,
    filterCountry,
    filterRole,
    filterRsvp
  );

  const isUserNotFound = filteredUsers.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeAttendees.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeAttendees];
    if (changeAttendees[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeAttendees(newArr);
  };

  return (
    <Page title="Attendees">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Attendees
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Attendee
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW ATTENDEE</Modal.Title>
            <Button style={{ fontSize: '32px' }} onClick={handleClose}>
              <Icon icon={closeFill} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <FormGroup style={{ display: 'flex', width: '100%' }}>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filter}
            onFilterName={handleFilter}
            filterStatus={filterStatus}
            onfilterStatus={handleFilterStatus}
            selectedItems={selected}
            setSelectedItems={setSelected}
            setChangeData={setChangeAttendees}
            changeData={changeAttendees}
          />
          <div className="filter">
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterCountry}
                value={filterCountry}
                style={{ margin: '5px' }}
              >
                <MenuItem key="country" value="" style={{ color: 'grey' }}>
                  All Countries
                </MenuItem>
                {countrylist.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterAppStatus}
                value={filterAppStatus}
                style={{ margin: '5px' }}
              >
                <MenuItem key="appstatus" value="" style={{ color: 'grey' }}>
                  All Application Status
                </MenuItem>
                {appstatuslist.map((appstatus) => (
                  <MenuItem key={appstatus} value={appstatus}>
                    {appstatus}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterCity}
                value={filterCity}
                style={{ margin: '5px' }}
              >
                <MenuItem key="city" value="" style={{ color: 'grey' }}>
                  All Cities
                </MenuItem>
                {citylist.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterAttendeeType}
                value={filterAttendeeType}
                style={{ margin: '5px' }}
              >
                <MenuItem key="attendeetype" value="" style={{ color: 'grey' }}>
                  All Attendee Types
                </MenuItem>
                {attendeetypelist.map((attendeetype) => (
                  <MenuItem key={attendeetype} value={attendeetype}>
                    {attendeetype}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterRole}
                value={filterRole}
                style={{ margin: '5px' }}
              >
                <MenuItem key="role" value="" style={{ color: 'grey' }}>
                  All Roles
                </MenuItem>
                {rolelist.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterStatus}
                value={filterStatus}
                style={{ margin: '5px' }}
              >
                <MenuItem key="status" value="" style={{ color: 'grey' }}>
                  All Status
                </MenuItem>
                {statuslist.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
              <Select
                displayEmpty
                size="small"
                onChange={handleFilterRsvp}
                value={filterRsvp}
                style={{ margin: '5px' }}
              >
                <MenuItem key="rsvp" value="" style={{ color: 'grey' }}>
                  All RSVP
                </MenuItem>
                {rsvplist.map((rsvp) => (
                  <MenuItem key={rsvp} value={rsvp}>
                    {rsvp}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </div>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, title, lname, status, subdate, appstatus, email } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell align="left">{id}</TableCell>
                          <TableCell align="left">{title}</TableCell>
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{lname}</TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{appstatus}</TableCell>
                          <TableCell align="left">{subdate}</TableCell>
                          <TableCell align="left">
                            <Label
                              id={id}
                              onClick={toggleStatus}
                              variant="ghost"
                              color={status === 'Inactive' ? 'error' : 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              id={id}
                              setChangeData={setChangeAttendees}
                              changeData={changeAttendees}
                              editlist={editlist}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filter} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
