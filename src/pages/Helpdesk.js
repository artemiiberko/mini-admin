import { Link, Route, Routes } from 'react-router-dom';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
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
  TablePagination,
  Select,
  MenuItem
} from '@mui/material';

// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
//
import HELPDESKS from '../_mocks_/helpdesk';

import AddHelpdesk from './add/AddHelpdesk';
import EditPage from './EditPage';
import ViewPage from './ViewPage';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Description', id: 'description' }
  ],
  select: [{ name: 'Status', id: 'status' }],
  file: [],
  checkbox: [],
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
      (helpdesks) =>
        (helpdesks.description.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          helpdesks.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          helpdesks.id.toString().indexOf(query.toLowerCase()) !== -1) &&
        helpdesks.status.indexOf(status) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Helpdesks() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [changeHelpdesks, setChangeHelpdesks] = useState(HELPDESKS);
  const [itemId, setItemId] = useState(0);
  const [editviewRecord, setEditviewRecord] = useState({});

  const getItem = (id) => {
    setItemId(id);
    setEditviewRecord(changeHelpdesks.find((x) => x.id === id));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredHelpdesks.map((n) => n.id);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - HELPDESKS.length) : 0;

  const filteredHelpdesks = applySortFilter(
    changeHelpdesks,
    getComparator(order, orderBy),
    filter,
    filterStatus
  );

  const isHelpdeskNotFound = filteredHelpdesks.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeHelpdesks.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeHelpdesks];
    if (changeHelpdesks[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeHelpdesks(newArr);
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <Page title="Helpdesk">
            <Container maxWidth="false">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Helpdesk
                </Typography>
                <Link to="./add">
                  <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                    New Helpdesk
                  </Button>
                </Link>
              </Stack>
              <Card>
                <UserListToolbar
                  numSelected={selected.length}
                  filterName={filter}
                  onFilterName={handleFilter}
                  selectedItems={selected}
                  setSelectedItems={setSelected}
                  setChangeData={setChangeHelpdesks}
                  changeData={changeHelpdesks}
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
                        rowCount={changeHelpdesks.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredHelpdesks
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            const { id, title, status, description } = row;
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

                                <TableCell onClick={() => getItem(id)} align="right">
                                  <UserMoreMenu
                                    id={id}
                                    setChangeData={setChangeHelpdesks}
                                    changeData={changeHelpdesks}
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
                      {isHelpdeskNotFound && (
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
                  count={filteredHelpdesks.length}
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
        element={
          <AddHelpdesk changeHelpdesks={changeHelpdesks} setChangeHelpdesks={setChangeHelpdesks} />
        }
      />
      <Route
        path="/edit"
        element={
          <EditPage
            id={itemId}
            editviewRecord={editviewRecord}
            setChangeData={setChangeHelpdesks}
            changeData={changeHelpdesks}
            editlist={editlist}
          />
        }
      />
      <Route
        path="/view"
        element={<ViewPage editviewRecord={editviewRecord} editlist={editlist} />}
      />
    </Routes>
  );
}
