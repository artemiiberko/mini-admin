import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import closeFill from '@iconify/icons-eva/close-fill';
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editRecord, setEditRecord] = useState({});
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
    const { name, value } = e.target;
    setEditRecord((prevState) => ({
      ...prevState,
      [name]: value,
      starttime: starttimestring,
      endtime: endtimestring,
      datefull: datefullstring,
      date: datestring,
      fromtime: fromtimestring,
      totime: totimestring
    }));
  };
  const addEdit = (record) => {
    const objIndex = changeData.findIndex((x) => x.id === id);
    const newArr = [...changeData];
    newArr[objIndex] = record;
    setChangeData(newArr);
  };
  const handleSubmit = () => {
    addEdit(editRecord);
    setShow(false);
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
              {editlist.select.map((edititem) => (
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
              {editlist.datetime.map((edititem) => (
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
              {editlist.date.map((edititem) => (
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
              {editlist.time.map((edititem) => (
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
              {editlist.file.map((edititem) => (
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
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
