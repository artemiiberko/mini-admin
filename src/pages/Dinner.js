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
import DINERS from '../_mocks_/dinner';
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
      (dinners) =>
        (dinners.location.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          dinners.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          dinners.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          dinners.id.toString().indexOf(query.toLowerCase()) !== -1) &&
        dinners.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Dinner() {
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
  const [changeDinners, setChangeDinners] = useState(DINERS);
  const [adddinnererror, setAdddinnererror] = useState('');

  const [newDinner, setNewDinner] = useState({
    id: 0,
    title: '',
    location: '',
    description: '',
    date: '',
    fromtime: '',
    totime: '',
    status: ''
  });
  const addDinner = (dinner) => {
    setChangeDinners((prevState) => [...prevState, dinner]);
  };
  const onDinnerChange = (e) => {
    let idPlus = Math.max(...changeDinners.map((e) => e.id));
    idPlus += 1;
    let datestring = newDinner.date;
    if (e.target.name === 'date') {
      datestring = `${e.target.value} UTC`;
    }
    let fromtimestring = newDinner.fromtime;
    if (e.target.name === 'fromtime') {
      fromtimestring = `${e.target.value} UTC`;
    }
    let totimestring = newDinner.totime;
    if (e.target.name === 'totime') {
      totimestring = `${e.target.value} UTC`;
    }
    const { name, value } = e.target;
    setNewDinner((prevState) => ({
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
      newDinner.title !== '' &&
      newDinner.location !== '' &&
      newDinner.description !== '' &&
      newDinner.date !== '' &&
      newDinner.fromtime !== '' &&
      newDinner.totime !== '' &&
      newDinner.status !== ''
    ) {
      setAdddinnererror('');
      addDinner(newDinner);
      setNewDinner({
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
      setAdddinnererror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = changeDinners.map((n) => n.id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - DINERS.length) : 0;

  const filteredDinners = applySortFilter(
    changeDinners,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isDinnerNotFound = filteredDinners.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeDinners.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeDinners];
    if (changeDinners[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeDinners(newArr);
  };

  return (
    <Page title="Dinner">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dinner
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Dinner
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW DINNER</Modal.Title>
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
                  onChange={onDinnerChange}
                  value={newDinner.title}
                  name="title"
                />
                <Typography>Location</Typography>
                <TextField
                  type="text"
                  placeholder="Location"
                  onChange={onDinnerChange}
                  value={newDinner.location}
                  name="location"
                />
                <Typography>Description</Typography>
                <TextField
                  type="text"
                  placeholder="Description"
                  onChange={onDinnerChange}
                  value={newDinner.description}
                  name="description"
                />
                <Typography>Date</Typography>
                <TextField type="date" placeholder="Date" onChange={onDinnerChange} name="date" />
                <Typography>Status</Typography>
                <Select
                  displayEmpty
                  name="status"
                  onChange={onDinnerChange}
                  value={newDinner.status}
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
                  onChange={onDinnerChange}
                  name="fromtime"
                />
                <Typography>To Time</Typography>
                <TextField
                  type="time"
                  placeholder="To Time"
                  onChange={onDinnerChange}
                  name="totime"
                />
              </Stack>
            </FormGroup>
            <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
              {adddinnererror}
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
            setChangeData={setChangeDinners}
            changeData={changeDinners}
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
                  rowCount={changeDinners.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredDinners
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
                              setChangeData={setChangeDinners}
                              changeData={changeDinners}
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
                {isDinnerNotFound && (
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
            count={filteredDinners.length}
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
