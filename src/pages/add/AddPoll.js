import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
  FormGroup,
  Select,
  MenuItem
} from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------
const statuslist = ['Active', 'Inactive'];
const polltypelist = ['Optional', 'Subjective'];
// ----------------------------------------------------------------------

AddPoll.propTypes = {
  setChangePolls: PropTypes.func,
  changePolls: PropTypes.array
};

export default function AddPoll({ setChangePolls, changePolls }) {
  const [addpollerror, setAddpollerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newPoll, setNewPoll] = useState({
    id: 0,
    title: '',
    question: '',
    optiona: '',
    optionb: '',
    optionc: '',
    optiond: '',
    polltype: '',
    starttime: '',
    endtime: '',
    result: '',
    status: ''
  });
  const addPoll = (poll) => {
    setChangePolls((prevState) => [...prevState, poll]);
  };
  const onPollChange = (e) => {
    let idPlus = Math.max(...changePolls.map((e) => e.id));
    idPlus += 1;
    let starttimestring = newPoll.starttime;
    if (e.target.name === 'starttime') {
      starttimestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    let endtimestring = newPoll.endtime;
    if (e.target.name === 'endtime') {
      endtimestring = `${e.target.value.slice(0, 10)} ${e.target.value.slice(11, 16)} UTC`;
    }
    const { name, value } = e.target;
    setNewPoll((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus,
      starttime: starttimestring,
      endtime: endtimestring
    }));
  };
  const handleLinkAdd = () => {
    if (
      newPoll.title !== '' &&
      newPoll.question !== '' &&
      newPoll.optiona !== '' &&
      newPoll.optionb !== '' &&
      newPoll.optionc !== '' &&
      newPoll.optiond !== '' &&
      newPoll.polltype !== '' &&
      newPoll.starttime !== '' &&
      newPoll.endtime !== '' &&
      newPoll.result !== '' &&
      newPoll.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newPoll.title !== '' &&
      newPoll.question !== '' &&
      newPoll.optiona !== '' &&
      newPoll.optionb !== '' &&
      newPoll.optionc !== '' &&
      newPoll.optiond !== '' &&
      newPoll.polltype !== '' &&
      newPoll.starttime !== '' &&
      newPoll.endtime !== '' &&
      newPoll.result !== '' &&
      newPoll.status !== ''
    ) {
      setAddpollerror('');
      addPoll(newPoll);
      setNewPoll({
        id: 0,
        title: '',
        question: '',
        optiona: '',
        optionb: '',
        optionc: '',
        optiond: '',
        polltype: '',
        starttime: '',
        endtime: '',
        result: '',
        status: ''
      });
    } else {
      setAddpollerror('Please fill all fields');
    }
  };
  return (
    <Page title="Add Poll">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Poll
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', width: '100%' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onPollChange}
                value={newPoll.title}
                name="title"
              />
              <Typography>Question</Typography>
              <TextField
                type="text"
                placeholder="Question"
                onChange={onPollChange}
                value={newPoll.question}
                name="question"
              />
              <Typography>Option A</Typography>
              <TextField
                type="text"
                placeholder="Option A"
                onChange={onPollChange}
                value={newPoll.optiona}
                name="optiona"
              />
              <Typography>Option B</Typography>
              <TextField
                type="text"
                placeholder="Option B"
                onChange={onPollChange}
                value={newPoll.optionb}
                name="optionb"
              />
              <Typography>Option C</Typography>
              <TextField
                type="text"
                placeholder="Option C"
                onChange={onPollChange}
                value={newPoll.optionc}
                name="optionc"
              />
              <Typography>Option D</Typography>
              <TextField
                type="text"
                placeholder="Option D"
                onChange={onPollChange}
                value={newPoll.optiond}
                name="optiond"
              />

              <Typography>Poll Type</Typography>
              <Select displayEmpty name="polltype" onChange={onPollChange} value={newPoll.polltype}>
                <MenuItem key="polltype" value="" style={{ color: 'grey' }}>
                  Select Poll Type...
                </MenuItem>
                {polltypelist.map((polltype) => (
                  <MenuItem key={polltype} value={polltype}>
                    {polltype}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onPollChange} value={newPoll.status}>
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
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Survey Start Time</Typography>
              <TextField
                type="datetime-local"
                placeholder="Start Time"
                onChange={onPollChange}
                name="starttime"
              />
              <Typography>Survey End Time</Typography>
              <TextField
                type="datetime-local"
                placeholder="End Time"
                onChange={onPollChange}
                name="endtime"
              />
              <Typography>Result</Typography>
              <TextField
                type="number"
                placeholder="Result"
                onChange={onPollChange}
                value={newPoll.result}
                name="result"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addpollerror}
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
            <Link to={linkAdd} onMouseEnter={handleLinkAdd}>
              <Button variant="contained" onClick={handleSubmit}>
                Add
              </Button>
            </Link>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
