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
import VIDEOS from '../_mocks_/videos';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'videourl', label: 'Video URL', alignRight: false },
  { id: 'videotype', label: 'Video Type', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
  { id: '' }
];
const statuslist = ['Active', 'Inactive'];
const videotypelist = ['EPC Video', 'Live Video Webcost'];
const editlist = {
  text: [
    { name: 'Title', id: 'title' },
    { name: 'Video URL', id: 'videourl' }
  ],
  select: [
    { name: 'Status', id: 'status' },
    { name: 'Video Type', id: 'videotype' }
  ],
  file: [],
  date: [],
  time: [],
  datetime: []
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

function applySortFilter(array, comparator, query, status, videotype) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query || status || videotype) {
    return filter(
      array,
      (videos) =>
        (videos.videourl.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          videos.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
          videos.id.toString().indexOf(query.toLowerCase()) !== -1) &&
        videos.status.indexOf(status) !== -1 &&
        videos.videotype.indexOf(videotype) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Videos() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filter, setFilter] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterVideotype, setFilterVideotype] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeVideos, setChangeVideos] = useState(VIDEOS);
  const [addvideoerror, setAddvideoerror] = useState('');

  const [newVideo, setNewVideo] = useState({
    id: 0,
    title: '',
    videourl: '',
    videotype: '',
    status: ''
  });
  const addVideo = (video) => {
    setChangeVideos((prevState) => [...prevState, video]);
  };
  const onVideoChange = (e) => {
    let idPlus = Math.max(...changeVideos.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewVideo((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleSubmit = () => {
    if (
      newVideo.title !== '' &&
      newVideo.videourl !== '' &&
      newVideo.videotype !== '' &&
      newVideo.status !== ''
    ) {
      setAddvideoerror('');
      addVideo(newVideo);
      setNewVideo({
        id: 0,
        title: '',
        videourl: '',
        videotype: '',
        status: ''
      });
      setShow(false);
    } else {
      setAddvideoerror('Please fill all fields');
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredVideos.map((n) => n.id);
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
  const handleFilterVideotype = (event) => {
    setFilterVideotype(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - VIDEOS.length) : 0;

  const filteredVideos = applySortFilter(
    changeVideos,
    getComparator(order, orderBy),
    filter,
    filterStatus,
    filterVideotype
  );

  const isVideoNotFound = filteredVideos.length === 0;

  const toggleStatus = (e) => {
    const objIndex = changeVideos.findIndex((x) => x.id === parseInt(e.target.id, 10));
    const newArr = [...changeVideos];
    if (changeVideos[objIndex].status === 'Active') {
      newArr[objIndex].status = 'Inactive';
    } else {
      newArr[objIndex].status = 'Active';
    }
    setChangeVideos(newArr);
  };

  return (
    <Page title="Videos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Videos
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            New Video
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>NEW VIDEO</Modal.Title>
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
                  onChange={onVideoChange}
                  value={newVideo.title}
                  name="title"
                />
                <Typography>Video URL</Typography>
                <TextField
                  type="text"
                  placeholder="Video URL"
                  onChange={onVideoChange}
                  value={newVideo.question}
                  name="videourl"
                />
              </Stack>

              <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                <Typography>Video Type</Typography>
                <Select
                  displayEmpty
                  name="videotype"
                  onChange={onVideoChange}
                  value={newVideo.videotype}
                >
                  <MenuItem key="videotype" value="" style={{ color: 'grey' }}>
                    Select Video Type...
                  </MenuItem>
                  {videotypelist.map((videotype) => (
                    <MenuItem key={videotype} value={videotype}>
                      {videotype}
                    </MenuItem>
                  ))}
                </Select>
                <Typography>Status</Typography>
                <Select displayEmpty name="status" onChange={onVideoChange} value={newVideo.status}>
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
              {addvideoerror}
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
            setChangeData={setChangeVideos}
            changeData={changeVideos}
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
                onChange={handleFilterVideotype}
                value={filterVideotype}
                style={{ margin: '5px' }}
              >
                <MenuItem key="videotype" value="" style={{ color: 'grey' }}>
                  All Video Type
                </MenuItem>
                {videotypelist.map((videotype) => (
                  <MenuItem key={videotype} value={videotype}>
                    {videotype}
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
                  rowCount={changeVideos.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredVideos
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, title, videourl, videotype, status } = row;
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
                          <TableCell align="left">{videourl}</TableCell>
                          <TableCell align="left">{videotype}</TableCell>
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
                              setChangeData={setChangeVideos}
                              changeData={changeVideos}
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
                {isVideoNotFound && (
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
            count={filteredVideos.length}
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
