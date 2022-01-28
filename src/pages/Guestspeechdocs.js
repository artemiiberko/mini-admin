import { filter } from 'lodash';
import { Icon } from '@iconify/react';
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
  TextField,
  FormGroup
} from '@mui/material';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import GUESTSPEECHDOCS from '../_mocks_/guestspeechdocs';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'speechfile', label: 'Guest Speach File', alignRight: false },
  { id: '' }
];
const editlist = {
  text: [{ name: 'Title', id: 'title' }],
  select: [],
  file: [{ name: 'Guest Speach File', id: 'speechfile' }],
  date: [],
  time: [],
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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (guestspeechdocs) => guestspeechdocs.id.toString().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Guestspeechdocs() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeGuestspeechdocs, setChangeGuestspeechdocs] = useState(GUESTSPEECHDOCS);
  const [addguestspeechdocerror, setAddguestspeechdocerror] = useState('');

  const [newGuestspeechdoc, setNewGuestspeechdoc] = useState({
    id: 0,
    title: '',
    speechfile: ''
  });
  const addGuestspeechdoc = (guestspeechdoc) => {
    setChangeGuestspeechdocs((prevState) => [...prevState, guestspeechdoc]);
  };
  const onGuestspeechdocChange = (e) => {
    let idPlus = Math.max(...changeGuestspeechdocs.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewGuestspeechdoc((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleSubmit = () => {
    if (newGuestspeechdoc.speechfile !== '' && newGuestspeechdoc.title !== '') {
      setAddguestspeechdocerror('');
      addGuestspeechdoc(newGuestspeechdoc);
      setNewGuestspeechdoc({
        id: 0,
        title: '',
        speechfile: ''
      });
      handleClose();
    } else {
      setAddguestspeechdocerror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredGuestspeechdocs.map((n) => n.id);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - GUESTSPEECHDOCS.length) : 0;

  const filteredGuestspeechdocs = applySortFilter(
    changeGuestspeechdocs,
    getComparator(order, orderBy),
    filter
  );

  const isGuestspeechdocNotFound = filteredGuestspeechdocs.length === 0;

  return (
    <Page title="Guest Speech Docs">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Guest Speech Docs
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            Add Doc
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW DOC</Modal.Title>
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
                  onChange={onGuestspeechdocChange}
                  value={newGuestspeechdoc.title}
                  name="title"
                />
                <Typography>Guest Speech File</Typography>
                <TextField
                  type="file"
                  placeholder="Guest Speech File"
                  onChange={onGuestspeechdocChange}
                  value={newGuestspeechdoc.speechfile}
                  name="speechfile"
                />
              </Stack>
            </FormGroup>
            <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
              {addguestspeechdocerror}
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
            setChangeData={setChangeGuestspeechdocs}
            changeData={changeGuestspeechdocs}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={changeGuestspeechdocs.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredGuestspeechdocs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, speechfile } = row;
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
                          <TableCell align="left">{speechfile}</TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              id={id}
                              setChangeData={setChangeGuestspeechdocs}
                              changeData={changeGuestspeechdocs}
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
                {isGuestspeechdocNotFound && (
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
            count={filteredGuestspeechdocs.length}
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
