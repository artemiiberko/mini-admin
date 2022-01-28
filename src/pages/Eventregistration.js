import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Modal } from 'react-bootstrap';
import closeFill from '@iconify/icons-eva/close-fill';
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

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import EVENTREGISTRATIONS from '../_mocks_/eventregistration';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'fromtime', label: 'From Time', alignRight: false },
  { id: 'totime', label: 'To Time', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Location', id: 'location' },
    { name: 'Description', id: 'description' }
  ],
  select: [{ name: 'Status', id: 'status' }],
  file: [],
  date: [{ name: 'Date', id: 'date' }],
  time: [
    { name: 'From Time', id: 'fromtime' },
    { name: 'To Time', id: 'totime' }
  ],
  datetime: [],
  textmb: [],
  selectmb: [],
  filemb: [],
  datemb: [],
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

function applySortFilter(array, comparator, query, status) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query || status) {
    return filter(
      array,
      (eventregistrations) =>
        (eventregistrations.location.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          eventregistrations.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          eventregistrations.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          eventregistrations.id.toString().indexOf(query.toLowerCase()) !== -1) &&
        eventregistrations.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Eventregistration() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeEventregistrations, setChangeEventregistrations] = useState(EVENTREGISTRATIONS);
  const [addeventregistrationerror, setAddeventregistrationerror] = useState('');

  const [newEventregistration, setNewEventregistration] = useState({
    id: 0,
    title: '',
    location: '',
    description: '',
    date: '',
    fromtime: '',
    totime: '',
    status: ''
  });
  const addEventregistration = (eventregistration) => {
    setChangeEventregistrations((prevState) => [...prevState, eventregistration]);
  };
  const onEventregistrationChange = (e) => {
    let idPlus = Math.max(...changeEventregistrations.map((e) => e.id));
    idPlus += 1;
    let datestring = newEventregistration.date;
    if (e.target.name === 'date') {
      datestring = `${e.target.value} UTC`;
    }
    let fromtimestring = newEventregistration.fromtime;
    if (e.target.name === 'fromtime') {
      fromtimestring = `${e.target.value} UTC`;
    }
    let totimestring = newEventregistration.totime;
    if (e.target.name === 'totime') {
      totimestring = `${e.target.value} UTC`;
    }
    const { name, value } = e.target;
    setNewEventregistration((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      date: datestring,
      fromtime: fromtimestring,
      totime: totimestring
    }));
  };
  const handleSubmit = () => {
    if (
      newEventregistration.title !== '' &&
      newEventregistration.location !== '' &&
      newEventregistration.description !== '' &&
      newEventregistration.date !== '' &&
      newEventregistration.fromtime !== '' &&
      newEventregistration.totime !== '' &&
      newEventregistration.status !== ''
    ) {
      setAddeventregistrationerror('');
      addEventregistration(newEventregistration);
      setNewEventregistration({
        id: 0,
        title: '',
        location: '',
        description: '',
        date: '',
        fromtime: '',
        totime: '',
        status: ''
      });
      setShow(false);
    } else {
      setAddeventregistrationerror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredEventregistrations.map((n) => n.id);
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
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - EVENTREGISTRATIONS.length) : 0;

  const filteredEventregistrations = applySortFilter(
    changeEventregistrations,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isEventregistrationNotFound = filteredEventregistrations.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeEventregistrations.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeEventregistrations];
    if (changeEventregistrations[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeEventregistrations(newArr);
  };

  return (
    <Page title="Event Registration">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Event Registration
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Event
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW EVENT</Modal.Title>
            <Button style={{ fontSize: '32px' }} onClick={handleClose}>
              <Icon icon={closeFill} />
            </Button>
          </Modal.Header>
          <Modal.Body>
            <FormGroup style={{ display: 'flex', width: '100%' }}>
              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>Title</Typography>
                <TextField
                  type="text"
                  placeholder="Title"
                  onChange={onEventregistrationChange}
                  value={newEventregistration.title}
                  name="title"
                />
                <Typography>Location</Typography>
                <TextField
                  type="text"
                  placeholder="Location"
                  onChange={onEventregistrationChange}
                  value={newEventregistration.location}
                  name="location"
                />
                <Typography>Description</Typography>
                <TextField
                  type="text"
                  placeholder="Description"
                  onChange={onEventregistrationChange}
                  value={newEventregistration.description}
                  name="description"
                />
                <Typography>Date</Typography>
                <TextField
                  type="date"
                  placeholder="Date"
                  onChange={onEventregistrationChange}
                  name="date"
                />
                <Typography>Status</Typography>
                <Select
                  displayEmpty
                  name="status"
                  onChange={onEventregistrationChange}
                  value={newEventregistration.status}
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
              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>From Time</Typography>
                <TextField
                  type="time"
                  placeholder="From Time"
                  onChange={onEventregistrationChange}
                  name="fromtime"
                />
                <Typography>To Time</Typography>
                <TextField
                  type="time"
                  placeholder="To Time"
                  onChange={onEventregistrationChange}
                  name="totime"
                />
              </Stack>
            </FormGroup>
            <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
              {addeventregistrationerror}
            </Typography>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filter}
            onFilterName={handleFilter}
            selectedItems={selected}
            setSelectedItems={setSelected}
            setChangeData={setChangeEventregistrations}
            changeData={changeEventregistrations}
          />
          <div className="filter">
            <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
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
          </div>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={changeEventregistrations.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredEventregistrations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, description, location, date, fromtime, totime, status } =
                        row;
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
                          <TableCell align="left">{location}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{date}</TableCell>
                          <TableCell align="left">{fromtime}</TableCell>
                          <TableCell align="left">{totime}</TableCell>
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
                              setChangeData={setChangeEventregistrations}
                              changeData={changeEventregistrations}
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
                {isEventregistrationNotFound && (
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
            count={filteredEventregistrations.length}
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
