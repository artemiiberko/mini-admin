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

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import WIFIS from '../_mocks_/wifi';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'wifiname', label: 'WiFi Name', alignRight: false },
  { id: 'password', label: 'Location', alignRight: false },
  { id: 'description', label: 'Link', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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
      (wifis) =>
        wifis.wifiname.toLowerCase().indexOf(query.toLowerCase()) !== -1 &&
        wifis.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Wifis() {
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
  const [changeWifis, setChangeWifis] = useState(WIFIS);
  const [addwifierror, setAddwifierror] = useState('');

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
    console.log(newWifi);
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
      setShow(false);
    } else {
      setAddwifierror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = changeWifis.map((n) => n.id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - WIFIS.length) : 0;

  const filteredWifis = applySortFilter(
    changeWifis,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isWifiNotFound = filteredWifis.length === 0;

  return (
    <Page wifiname="Wifi">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Wifi
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Wifi
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>NEW WIFI</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup style={{ display: 'flex', width: '100%' }}>
              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>WiFi Name</Typography>
                <TextField
                  type="text"
                  placeholder="WiFi Name"
                  onChange={onWifiChange}
                  value={newWifi.wifiname}
                  name="wifiname"
                />
                <Typography>Location</Typography>
                <TextField
                  type="text"
                  placeholder="Location"
                  onChange={onWifiChange}
                  value={newWifi.password}
                  name="password"
                />
                <Typography>Link</Typography>
                <TextField
                  type="text"
                  placeholder="Link"
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
                  rowCount={changeWifis.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredWifis
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, wifiname, description, status } = row;
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
                          <TableCell align="left">{wifiname}</TableCell>
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={status === 'Inactive' ? 'error' : 'success'}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              id={id}
                              setChangeData={setChangeWifis}
                              changeData={changeWifis}
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
                {isWifiNotFound && (
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
            count={filteredWifis.length}
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