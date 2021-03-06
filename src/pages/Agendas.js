import { Routes, Route, Link } from 'react-router-dom';
import { filter } from 'lodash';
import { BallTriangle } from 'react-loader-spinner';
import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
import plusFill from '@iconify/icons-eva/plus-fill';
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
  TablePagination
  // Select,
  // MenuItem
} from '@mui/material';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
// import AGENDAS from '../_mocks_/agendas';
import AddAgenda from './add/AddAgenda';
import EditPage from './EditPage';
import ViewPage from './ViewPage';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'speakers', label: 'Speakers', alignRight: false },
  /* { id: 'rating', label: 'Rating', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }, */
  { id: '' }
];
// const statuslist = ['Active', 'Inactive'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Description', id: 'description' }
    /* { name: 'Rating', id: 'rating' } */
  ],
  select: [
    /* { name: 'Status', id: 'status' }, */
    { name: 'Speakers', id: 'speakers' }
  ],
  file: [],
  date: [],
  time: [],
  checkbox: [],
  datetime: [],
  textmb: [],
  selectmb: [],
  filemb: [
    /* { name: 'Upload Agenda Details', id: 'agendadetailsfile' },
    { name: 'Upload Agenda Speech', id: 'agendaspeechfile' } */
  ],
  datemb: [],
  timemb: [],
  datetimemb: [
    { name: 'Session Start', id: 'start_date' },
    { name: 'Session End', id: 'end_date' }
  ]
};
const pagePath = 'Agenda';
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
  if (query /* || status */) {
    console.log(query);
    return filter(
      array,
      (agenda) =>
        agenda.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        agenda.id.toString().indexOf(query.toLowerCase()) !== -1 ||
        agenda.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 /* && 
         agenda.status.indexOf(status)  !== -1 */
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
  /* const [filterStatus, setFilterStatus] = useState(''); */
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [changeAgendas, setChangeAgendas] = useState([]);
  const [itemId, setItemId] = useState(0);
  const [editviewRecord, setEditviewRecord] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isEditLoading, setEditLoading] = useState(false);

  useEffect(() => {
    axios.get(`https://wr.raneddo.ml/api/User`).then((res) => {
      setUsers(res.data);
      axios.get(`https://wr.raneddo.ml/api/Agenda`).then((res) => {
        setChangeAgendas(res.data);
        setLoading(false);
      });
    });
  }, []);

  const getItem = (id) => {
    setItemId(id);
    setEditviewRecord(changeAgendas.find((x) => x.id === id));
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
  /* const handleFilterStatus = (event) => {
    setFilterStatus(event.target.value);
  }; */

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - changeAgendas.length) : 0;

  const filteredAgendas = applySortFilter(
    changeAgendas,
    getComparator(order, orderBy),
    filter
    /* filterStatus */
  );

  const isAgendaNotFound = filteredAgendas.length === 0;

  /* const toggleStatus = (e) => {
    const objIndex = changeAgendas.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeAgendas];
    if (changeAgendas[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeAgendas(newArr);
  }; */

  return (
    <Routes>
      <Route
        path=""
        element={
          <Page title="Agendas">
            <Container maxWidth="false">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Agendas
                </Typography>
                <Link to="./add">
                  <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                    New Agenda
                  </Button>
                </Link>
              </Stack>
              <BallTriangle
                wrapperStyle={{
                  position: 'absolute',
                  width: 'calc(100% - 279px)',
                  height: '100%',
                  justifyContent: 'center',
                  paddingTop: '100px',
                  backgroundColor: 'white',
                  zIndex: 1
                }}
                height="100"
                width="100"
                color="grey"
                ariaLabel="loading"
                visible={isLoading}
              />
              <Card>
                <UserListToolbar
                  pagePath={pagePath}
                  setEditLoading={setEditLoading}
                  numSelected={selected.length}
                  filterName={filter}
                  onFilterName={handleFilter}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  setChangeData={setChangeAgendas}
                  changeData={changeAgendas}
                />
                {/* }<div className="filter">
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
                </div> { */}
                <Scrollbar>
                  <BallTriangle
                    wrapperStyle={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      zIndex: 1
                    }}
                    height="100"
                    width="100"
                    color="grey"
                    ariaLabel="loading"
                    visible={isEditLoading}
                  />
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
                            const { id, title, description, /* status, rating, */ speakers } = row;
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
                                <TableCell
                                  sx={speakers[0] ? {} : { fontStyle: 'italic' }}
                                  align="left"
                                >
                                  {speakers[0]
                                    ? users.find((x) => x.id === speakers[0]).firstName
                                    : 'No speakers'}
                                </TableCell>
                                {/* } <TableCell align="left">{rating}</TableCell> 
                                <TableCell align="left">
                                  <Label
                                    id={id}
                                    variant="ghost"
                                    color={status === 'Inactive' ? 'error' : 'success'}
                                    onClick={toggleStatus}
                                  >
                                    {sentenceCase(status)}
                                  </Label>
                                </TableCell> { */}

                                <TableCell onClick={() => getItem(id)} align="right">
                                  <UserMoreMenu
                                    setEditLoading={setEditLoading}
                                    pagePath={pagePath}
                                    id={id}
                                    setChangeData={setChangeAgendas}
                                    changeData={changeAgendas}
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
        }
      />
      <Route
        path="/add"
        element={<AddAgenda changeAgendas={changeAgendas} setChangeAgendas={setChangeAgendas} />}
      />
      <Route
        path="/edit"
        element={
          <EditPage
            setEditLoading={setEditLoading}
            id={itemId}
            editviewRecord={editviewRecord}
            setChangeData={setChangeAgendas}
            changeData={changeAgendas}
            editlist={editlist}
            pagePath={pagePath}
          />
        }
      />
      <Route
        path="/view"
        element={
          <ViewPage
            recordid={itemId}
            pagePath={pagePath}
            editviewRecord={editviewRecord}
            editlist={editlist}
          />
        }
      />
    </Routes>
  );
}
