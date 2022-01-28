import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import { Modal } from 'react-bootstrap';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
  FormGroup,
  Stack,
  Typography,
  Select,
  TextField
} from '@mui/material';
import lists from '../../../_mocks_/lists';
// ----------------------------------------------------------------------
UserMoreMenu.propTypes = {
  id: PropTypes.number,
  changeData: PropTypes.array,
  setChangeData: PropTypes.func,
  editlist: PropTypes.object
};
export default function UserMoreMenu({ id, changeData, setChangeData, editlist }) {
  const [show, setShow] = useState(false);
  const [viewShow, setViewShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleViewClose = () => {
    setViewShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleViewShow = () => {
    setViewShow(true);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({});
  const [viewRecord, setViewRecord] = useState({});
  const [editerror, setEditerror] = useState('');
  const ref = useRef(null);
  const handleDeleteItem = () => {
    setChangeData(changeData.filter((el) => el.id !== id));
    setIsOpen(false);
  };
  const handleEditItem = () => {
    handleShow();
    setEditRecord(changeData.find((x) => x.id === id));
    setIsOpen(false);
  };
  const handleViewItem = () => {
    handleViewShow();
    setViewRecord(changeData.find((x) => x.id === id));
    setIsOpen(false);
  };
  const onEditChange = (e) => {
    let starttimestring = editRecord.starttime;
    if (e.target.name === 'starttime') {
      starttimestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let endtimestring = editRecord.endtime;
    if (e.target.name === 'endtime') {
      endtimestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let datefullstring = editRecord.date;
    if (e.target.name === 'datefull') {
      datefullstring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let datestring = editRecord.date;
    if (e.target.name === 'date') {
      datestring = `${e.target.value} UTC`;
    }
    let fromtimestring = editRecord.fromtime;
    if (e.target.name === 'fromtime') {
      fromtimestring = `${e.target.value} UTC`;
    }
    let totimestring = editRecord.totime;
    if (e.target.name === 'totime') {
      totimestring = `${e.target.value} UTC`;
    }
    let sessionstartstring = editRecord.sessionstart;
    if (e.target.name === 'sessionstart') {
      sessionstartstring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let sessionendstring = editRecord.sessionend;
    if (e.target.name === 'sessionend') {
      sessionendstring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let subdatestring = editRecord.subdate;
    if (e.target.name === 'subdate') {
      subdatestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    const { name, value } = e.target;
    setEditRecord((prevState) => ({
      ...prevState,
      [name]: value,
      starttime: starttimestring,
      endtime: endtimestring,
      datefull: datefullstring,
      date: datestring,
      fromtime: fromtimestring,
      totime: totimestring,
      sessionstart: sessionstartstring,
      sessionend: sessionendstring,
      subdate: subdatestring
    }));
  };
  const addEdit = (record) => {
    const objIndex = changeData.findIndex((x) => x.id === id);
    const newArr = [...changeData];
    newArr[objIndex] = record;
    setChangeData(newArr);
  };
  const handleSubmit = () => {
    const asArray = Object.entries(editRecord);
    const asArrayFiltered = asArray.filter(
      ([key, value]) =>
        value === '' &&
        (editlist.text.some((e) => e.id === key) ||
          editlist.select.some((e) => e.id === key) ||
          editlist.time.some((e) => e.id === key) ||
          editlist.datetime.some((e) => e.id === key) ||
          editlist.date.some((e) => e.id === key))
    );
    const emptyFields = Object.fromEntries(asArrayFiltered);

    if (Object.keys(emptyFields).length) {
      setEditerror('Please fill all required fields');
    } else {
      setEditerror('');
      addEdit(editRecord);
      handleClose();
    }
  };
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDeleteItem} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem
          onClick={handleEditItem}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem
          onClick={handleViewItem}
          component={RouterLink}
          to="#"
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>EDIT</Modal.Title>
          <Button style={{ fontSize: '32px' }} onClick={handleClose}>
            <Icon icon={closeFill} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <FormGroup style={{ display: 'flex', width: '100%' }}>
            <Stack spacing={3} style={{ flexBasis: '100%', padding: '10px', flexShrink: '0' }}>
              {editlist.text.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <TextField
                    type="text"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    value={editRecord[edititem.id]}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.select.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <Select
                    displayEmpty
                    onChange={onEditChange}
                    value={editRecord[edititem.id]}
                    name={edititem.id}
                  >
                    <MenuItem key={edititem.id} value="" style={{ color: 'grey' }}>
                      Select...
                    </MenuItem>
                    {lists[edititem.id].map((listitem) => (
                      <MenuItem key={listitem} value={listitem}>
                        {listitem}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ))}
              {editlist.datetime.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <TextField
                    type="datetime-local"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.date.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <TextField
                    type="date"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.time.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <TextField
                    type="time"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.file.map((edititem) => (
                <>
                  <Typography>{`${edititem.name}*`}</Typography>
                  <TextField
                    type="file"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
            </Stack>
            <Stack spacing={3} style={{ flexBasis: '100%', padding: '10px', flexShrink: '0' }}>
              {editlist.selectmb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <Select
                    displayEmpty
                    onChange={onEditChange}
                    value={editRecord[edititem.id]}
                    name={edititem.id}
                  >
                    <MenuItem key={edititem.id} value="" style={{ color: 'grey' }}>
                      Select...
                    </MenuItem>
                    {lists[edititem.id].map((listitem) => (
                      <MenuItem key={listitem} value={listitem}>
                        {listitem}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              ))}
              {editlist.textmb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <TextField
                    type="text"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    value={editRecord[edititem.id]}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.datetimemb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <TextField
                    type="datetime-local"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.datemb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <TextField
                    type="date"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.timemb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <TextField
                    type="time"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
              {editlist.filemb.map((edititem) => (
                <>
                  <Typography>{edititem.name}</Typography>
                  <TextField
                    type="file"
                    placeholder={edititem.name}
                    onChange={onEditChange}
                    name={edititem.id}
                  />
                </>
              ))}
            </Stack>
            <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
              {editerror}
            </Typography>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={viewShow} onHide={handleViewClose} size="lg">
        <Modal.Header>
          <Modal.Title>VIEW</Modal.Title>
          <Button style={{ fontSize: '32px' }} onClick={handleViewClose}>
            <Icon icon={closeFill} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <FormGroup style={{ display: 'flex', width: '100%' }}>
            <Stack spacing={3} style={{ flexBasis: '100%', padding: '10px', flexShrink: '0' }}>
              {editlist.text.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.select.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.file.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.date.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.time.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datetime.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.textmb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.selectmb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.filemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.timemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datetimemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
            </Stack>
            <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
              {editerror}
            </Typography>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outlined" color="error" onClick={handleViewClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
