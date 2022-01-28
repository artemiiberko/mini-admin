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
import MEDIAPARTNERS from '../_mocks_/mediapartners';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'logo', label: 'Logo', alignRight: false },
  { id: 'link', label: 'Link', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Link', id: 'link' }
  ],
  select: [{ name: 'Status', id: 'status' }],
  file: [],
  date: [],
  time: [],
  datetime: [],
  textmb: [],
  selectmb: [],
  filemb: [{ name: 'Logo', id: 'logo' }],
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
      (mediapartners) =>
        (mediapartners.link.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          mediapartners.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          mediapartners.id.toString().indexOf(query.toLowerCase()) !== -1) &&
        mediapartners.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Mediapartners() {
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
  const [changeMediapartners, setChangeMediapartners] = useState(MEDIAPARTNERS);
  const [addmediapartnererror, setAddmediapartnererror] = useState('');

  const [newMediapartner, setNewMediapartner] = useState({
    id: 0,
    title: '',
    logo: '',
    link: '',
    status: ''
  });
  const addMediapartner = (mediapartner) => {
    setChangeMediapartners((prevState) => [...prevState, mediapartner]);
  };
  const onMediapartnerChange = (e) => {
    let idPlus = Math.max(...changeMediapartners.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewMediapartner((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleSubmit = () => {
    if (
      newMediapartner.title !== '' &&
      newMediapartner.link !== '' &&
      newMediapartner.status !== ''
    ) {
      setAddmediapartnererror('');
      addMediapartner(newMediapartner);
      setNewMediapartner({
        id: 0,
        title: '',
        logo: '',
        link: '',
        status: ''
      });
      handleClose();
    } else {
      setAddmediapartnererror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredMediapartners.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MEDIAPARTNERS.length) : 0;

  const filteredMediapartners = applySortFilter(
    changeMediapartners,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isMediapartnerNotFound = filteredMediapartners.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeMediapartners.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeMediapartners];
    if (changeMediapartners[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeMediapartners(newArr);
  };

  return (
    <Page title="Mediapartners">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Media Partners
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Media Partner
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW MEDIA PARTNER</Modal.Title>
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
                  onChange={onMediapartnerChange}
                  value={newMediapartner.title}
                  name="title"
                />
                <Typography>Logo</Typography>
                <TextField
                  type="file"
                  placeholder="Logo"
                  onChange={onMediapartnerChange}
                  value={newMediapartner.logo}
                  name="logo"
                />
              </Stack>

              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>Link</Typography>
                <TextField
                  type="text"
                  placeholder="Link"
                  onChange={onMediapartnerChange}
                  value={newMediapartner.link}
                  name="link"
                />
                <Typography>Status</Typography>
                <Select
                  displayEmpty
                  name="status"
                  onChange={onMediapartnerChange}
                  value={newMediapartner.status}
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
              {addmediapartnererror}
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
            selectedItems={selected}
            setSelectedItems={setSelected}
            setChangeData={setChangeMediapartners}
            changeData={changeMediapartners}
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
                  rowCount={changeMediapartners.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredMediapartners
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, logo, link, status } = row;
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
                          <TableCell align="left">{logo}</TableCell>
                          <TableCell align="left">{link}</TableCell>
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
                              setChangeData={setChangeMediapartners}
                              changeData={changeMediapartners}
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
                {isMediapartnerNotFound && (
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
            count={filteredMediapartners.length}
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
