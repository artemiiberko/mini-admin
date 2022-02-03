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
import POLLS from '../_mocks_/polls';
import AddPoll from './add/AddPoll';
import EditPage from './EditPage';
import ViewPage from './ViewPage';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'question', label: 'Question', alignRight: false },
  { id: 'optiona', label: 'Option A', alignRight: false },
  { id: 'optionb', label: 'Option B', alignRight: false },
  { id: 'optionc', label: 'Option C', alignRight: false },
  { id: 'optiond', label: 'Option D', alignRight: false },
  { id: 'polltype', label: 'Poll Type', alignRight: false },
  { id: 'starttime', label: 'Survey Start Time', alignRight: false },
  { id: 'endtime', label: 'Survey End Time', alignRight: false },
  { id: 'result', label: 'Result', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const polltypelist = ['Optional', 'Subjective'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Question', id: 'question' },
    { name: 'Option A', id: 'optiona' },
    { name: 'Option B', id: 'optionb' },
    { name: 'Option C', id: 'optionc' },
    { name: 'Option D', id: 'optiond' },
    { name: 'Result', id: 'result' }
  ],
  select: [
    { name: 'Status', id: 'status' },
    { name: 'Poll Type', id: 'polltype' }
  ],
  file: [],
  date: [],
  time: [],
  datetime: [
    { name: 'Survey Start Time', id: 'starttime' },
    { name: 'Survey End Time', id: 'endtime' }
  ],
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

function applySortFilter(array, comparator, query, status, polltype) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query || status || polltype) {
    return filter(
      array,
      (polls) =>
        (polls.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          polls.question.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          polls.optiona.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          polls.optionc.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          polls.optiond.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          polls.id.toString().indexOf(query.toLowerCase()) !== -1 ||
          polls.optionb.toLowerCase().indexOf(query.toLowerCase()) !== -1) &&
        polls.status.indexOf(status) !== -1 &&
        polls.polltype.indexOf(polltype) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Polls() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPolltype, setFilterPolltype] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [changePolls, setChangePolls] = useState(POLLS);
  const [itemId, setItemId] = useState(0);
  const [editviewRecord, setEditviewRecord] = useState({});

  const getItem = (id) => {
    setItemId(id);
    setEditviewRecord(changePolls.find((x) => x.id === id));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredPolls.map((n) => n.id);
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
  const handleFilterPolltype = (event) => {
    setFilterPolltype(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - POLLS.length) : 0;

  const filteredPolls = applySortFilter(
    changePolls,
    getComparator(order, orderBy),
    filter,
    filterStatus,
    filterPolltype
  );

  const isPollNotFound = filteredPolls.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changePolls.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changePolls];
    if (changePolls[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangePolls(newArr);
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <Page title="Polls">
            <Container maxWidth="false">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Polls
                </Typography>
                <Link to="./add">
                  <Button variant="contained" startIcon={<Icon icon={plusFill} />}>
                    New Poll
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
                  setChangeData={setChangePolls}
                  changeData={changePolls}
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
                  <Stack sx={{ flexBasis: '25%', padding: '0px 10px' }}>
                    <Select
                      displayEmpty
                      size="small"
                      onChange={handleFilterPolltype}
                      value={filterPolltype}
                      style={{ margin: '5px' }}
                    >
                      <MenuItem key="polltype" value="" style={{ color: 'grey' }}>
                        All Poll Type
                      </MenuItem>
                      {polltypelist.map((polltype) => (
                        <MenuItem key={polltype} value={polltype}>
                          {polltype}
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
                        rowCount={changePolls.length}
                        numSelected={selected.length}
                        onRequestSort={handleRequestSort}
                        onSelectAllClick={handleSelectAllClick}
                      />
                      <TableBody>
                        {filteredPolls
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => {
                            const {
                              id,
                              title,
                              question,
                              status,
                              result,
                              polltype,
                              optiona,
                              optionb,
                              optionc,
                              optiond,
                              starttime,
                              endtime
                            } = row;
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
                                <TableCell align="left">{question}</TableCell>
                                <TableCell align="left">{optiona}</TableCell>
                                <TableCell align="left">{optionb}</TableCell>
                                <TableCell align="left">{optionc}</TableCell>
                                <TableCell align="left">{optiond}</TableCell>
                                <TableCell align="left">{polltype}</TableCell>
                                <TableCell align="left">{starttime}</TableCell>
                                <TableCell align="left">{endtime}</TableCell>
                                <TableCell align="left">{result}</TableCell>
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
                                    setChangeData={setChangePolls}
                                    changeData={changePolls}
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
                      {isPollNotFound && (
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
                  count={filteredPolls.length}
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
        element={<AddPoll changePolls={changePolls} setChangePolls={setChangePolls} />}
      />
      <Route
        path="/edit"
        element={
          <EditPage
            id={itemId}
            editviewRecord={editviewRecord}
            setChangeData={setChangePolls}
            changeData={changePolls}
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
