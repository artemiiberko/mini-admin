import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
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
  FormLabel
} from '@mui/material';
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

function applySortFilter(array, comparator, query, status, appstatus) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query || status || appstatus) {
    return filter(
      array,
      (_user) =>
        _user.lname.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
        _user.status.indexOf(status) !== -1 &&
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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
    USERLIST,
    getComparator(order, orderBy),
    filter,
    filterStatus,
    filterAppStatus
  );

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Attendees">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Attendees
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
          >
            New Attendee
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filter}
            onFilterName={handleFilter}
            filterStatus={filterStatus}
            onfilterStatus={handleFilterStatus}
          />
          <div className="filter">
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
              <FormLabel>Country</FormLabel>
              <Select
                size="small"
                onChange={handleFilterCountry}
                value={filterCountry}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="country" value="">
                  All Countries
                </MenuItem>
                {countrylist.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <FormLabel>Application Status</FormLabel>
              <Select
                size="small"
                onChange={handleFilterAppStatus}
                value={filterAppStatus}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="appstatus" value="">
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
              <FormLabel>City</FormLabel>
              <Select
                size="small"
                onChange={handleFilterCity}
                value={filterCity}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="city" value="">
                  All Cities
                </MenuItem>
                {citylist.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              <FormLabel>Attendee Type</FormLabel>
              <Select
                size="small"
                onChange={handleFilterAttendeeType}
                value={filterAttendeeType}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="attendeetype" value="">
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
              <FormLabel>Role</FormLabel>
              <Select
                size="small"
                onChange={handleFilterRole}
                value={filterRole}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="role" value="">
                  All Roles
                </MenuItem>
                {rolelist.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              <FormLabel>Status</FormLabel>
              <Select
                size="small"
                onChange={handleFilterStatus}
                value={filterStatus}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="status" value="">
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
              <FormLabel>RSVP</FormLabel>
              <Select
                size="small"
                onChange={handleFilterRsvp}
                value={filterRsvp}
                style={{ flexBasis: '25%' }}
              >
                <MenuItem key="rsvp" value="">
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
                              variant="ghost"
                              color={status === 'Inactive' ? 'error' : 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
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
            count={USERLIST.length}
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
