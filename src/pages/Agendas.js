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
import AGENDAS from '../_mocks_/agendas';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'speakers', label: 'Speakers', alignRight: false },
  { id: 'rating', label: 'Rating', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const speakerslist = ['speaker1', 'speaker2', 'speaker3'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Description', id: 'description' },
    { name: 'Rating', id: 'rating' }
  ],
  select: [
    { name: 'Status', id: 'status' },
    { name: 'Speakers', id: 'speakers' }
  ],
  file: [],
  date: [],
  time: [],
  datetime: [],
  textmb: [],
  selectmb: [],
  filemb: [
    { name: 'Upload Agenda Details', id: 'agendadetailsfile' },
    { name: 'Upload Agenda Speech', id: 'agendaspeechfile' }
  ],
  datemb: [],
  timemb: [],
  datetimemb: [
    { name: 'Session Start', id: 'sessionstart' },
    { name: 'Session End', id: 'sessionend' }
  ]
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
      (agenda) =>
        (agenda.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          agenda.id.toString().indexOf(query.toLowerCase()) !== -1 ||
          agenda.description.toLowerCase().indexOf(query.toLowerCase()) !== -1) &&
        agenda.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Agendas() {
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
  const [changeAgendas, setChangeAgendas] = useState(AGENDAS);
  const [addagendaerror, setAddagendaerror] = useState('');

  const [newAgenda, setNewAgenda] = useState({
    id: 0,
    title: '',
    description: '',
    speakers: '',
    rating: '',
    status: ''
  });
  const addAgenda = (agenda) => {
    setChangeAgendas((prevState) => [...prevState, agenda]);
  };
  const onAgendaChange = (e) => {
    let idPlus = Math.max(...changeAgendas.map((e) => e.id));
    idPlus += 1;

    const { name, value } = e.target;
    setNewAgenda((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleSubmit = () => {
    if (
      newAgenda.title !== '' &&
      newAgenda.description !== '' &&
      newAgenda.speakers !== '' &&
      newAgenda.rating !== '' &&
      newAgenda.status !== ''
    ) {
      setAddagendaerror('');
      addAgenda(newAgenda);
      setNewAgenda({
        id: 0,
        title: '',
        description: '',
        speakers: '',
        rating: '',
        status: ''
      });
      handleClose();
    } else {
      setAddagendaerror('Please fill all fields');
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredAgendas.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - AGENDAS.length) : 0;

  const filteredAgendas = applySortFilter(
    changeAgendas,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isAgendaNotFound = filteredAgendas.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeAgendas.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeAgendas];
    if (changeAgendas[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeAgendas(newArr);
  };

  return (
    <Page title="Agendas">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Agendas
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Agenda
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW AGENDA</Modal.Title>
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
                  onChange={onAgendaChange}
                  value={newAgenda.title}
                  name="title"
                />
                <Typography>Description</Typography>
                <TextField
                  multiline
                  minRows={6}
                  maxRows={6}
                  type="text"
                  placeholder="Description"
                  onChange={onAgendaChange}
                  value={newAgenda.descripton}
                  name="description"
                />
              </Stack>
              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>Speakers</Typography>
                <Select
                  displayEmpty
                  name="speakers"
                  onChange={onAgendaChange}
                  value={newAgenda.speakers}
                >
                  <MenuItem key="speakers" value="" style={{ color: 'grey' }}>
                    Select Speaker...
                  </MenuItem>
                  {speakerslist.map((speaker) => (
                    <MenuItem key={speaker} value={speaker}>
                      {speaker}
                    </MenuItem>
                  ))}
                </Select>
                <Typography>Rating</Typography>
                <TextField
                  type="number"
                  placeholder="Rating"
                  onChange={onAgendaChange}
                  value={newAgenda.rating}
                  name="rating"
                />
                <Typography>Status</Typography>
                <Select
                  displayEmpty
                  name="status"
                  onChange={onAgendaChange}
                  value={newAgenda.status}
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
              {addagendaerror}
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
            setChangeData={setChangeAgendas}
            changeData={changeAgendas}
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
                  rowCount={changeAgendas.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredAgendas
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, description, status, rating, speakers } = row;
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
                          <TableCell align="left">{description}</TableCell>
                          <TableCell align="left">{speakers}</TableCell>
                          <TableCell align="left">{rating}</TableCell>
                          <TableCell align="left">
                            <Label
                              id={id}
                              variant="ghost"
                              color={status === 'Inactive' ? 'error' : 'success'}
                              onClick={toggleStatus}
                            >
                              {sentenceCase(status)}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu
                              id={id}
                              setChangeData={setChangeAgendas}
                              changeData={changeAgendas}
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
                {isAgendaNotFound && (
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
            count={filteredAgendas.length}
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
