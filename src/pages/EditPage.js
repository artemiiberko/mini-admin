import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
// material
import {
  MenuItem,
  Button,
  FormGroup,
  Stack,
  Typography,
  Select,
  TextField,
  Card,
  Container,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import lists from '../_mocks_/lists';
import Page from '../components/Page';
// ----------------------------------------------------------------------
EditPage.propTypes = {
  id: PropTypes.number,
  /* changeData: PropTypes.array,
  setChangeData: PropTypes.func, */
  editlist: PropTypes.object,
  editviewRecord: PropTypes.object
};
export default function EditPage({
  id,
  editviewRecord,
  /* changeData, */ setChangeData,
  editlist,
  pagePath
}) {
  const [editRecord, setEditRecord] = useState(editviewRecord);
  const [editerror, setEditerror] = useState('');
  const [linkEdit, setLinkEdit] = useState('');

  const onEditChange = (e) => {
    /* let starttimestring = editRecord.starttime;
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
    let createddatestring = editRecord.createddate;
    if (e.target.name === 'createddate') {
      createddatestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }  */
    let speakersarray = editRecord.speakers;
    if (e.target.name === 'speakers') {
      speakersarray = [parseInt(e.target.value, 10)];
    }
    let enddate = editRecord.endDate;
    if (e.target.name === 'end_date') {
      enddate = e.target.value;
    }
    let startdate = editRecord.startDate;
    if (e.target.name === 'start_date') {
      startdate = e.target.value;
    }
    const { name, value } = e.target;
    setEditRecord((prevState) => ({
      ...prevState,
      [name]: value,
      test: 'test',
      speakers: speakersarray,
      endDate: enddate,
      startDate: startdate
      /* starttime: starttimestring,
      endtime: endtimestring,
      datefull: datefullstring,
      date: datestring,
      fromtime: fromtimestring,
      totime: totimestring,
      sessionstart: sessionstartstring,
      sessionend: sessionendstring, 
      subdate: subdatestring,
      createddate: createddatestring */
    }));
  };
  const onEditChangeCheckbox = (e) => {
    const { name, id, checked } = e.target;
    setEditRecord((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [name]: checked
      }
    }));
    console.log(editRecord.manageattendees.create);
  };
  const addEdit = (record) => {
    axios
      .put(`https://wr.raneddo.ml/api/${pagePath}/${id}`, record, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then((res) => {
        axios.get(`https://wr.raneddo.ml/api/${pagePath}`).then((res) => {
          setChangeData(res.data);
        });
        console.log(res);
      });

    /* const objIndex = changeData.findIndex((x) => x.id === id);
    const newArr = [...changeData];
    newArr[objIndex] = record;
    setChangeData(newArr); */
  };
  const handleLinkEdit = () => {
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
      setLinkEdit('');
    } else {
      setLinkEdit('../');
    }
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
      console.log(editRecord);
    }
  };
  return (
    <Page title="Edit">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Edit
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
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
                    value={editRecord[edititem.id]}
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
                    value={editRecord[edititem.id]}
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
                    value={editRecord[edititem.id]}
                  />
                </>
              ))}
              {editlist.checkbox.map((edititem) => (
                <Stack
                  key={edititem.id}
                  style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <Typography style={{ flexBasis: '20%' }}>{edititem.name}</Typography>
                  {edititem.properties.map((property) => (
                    <FormControlLabel
                      style={{ textTransform: 'capitalize' }}
                      key={property}
                      control={
                        <Checkbox
                          checked={editRecord[edititem.id][property]}
                          id={edititem.id}
                          name={property}
                          onChange={onEditChangeCheckbox}
                        />
                      }
                      label={property}
                    />
                  ))}
                </Stack>
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
                    value={editRecord[edititem.id].slice(0, 19)}
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
                    value={editRecord[edititem.id]}
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
                    value={editRecord[edititem.id]}
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
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {editerror}
          </Typography>
          <Stack
            spacing={3}
            direction="row"
            justifyContent="flex-end"
            maxWidth="1000px"
            margin="auto"
          >
            <Link to="../">
              <Button variant="outlined" color="error">
                Close
              </Button>
            </Link>
            <Link to={linkEdit} onMouseEnter={handleLinkEdit}>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
