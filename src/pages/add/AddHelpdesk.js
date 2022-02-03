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
// ----------------------------------------------------------------------

AddHelpdesk.propTypes = {
  setChangeHelpdesks: PropTypes.func,
  changeHelpdesks: PropTypes.array
};

export default function AddHelpdesk({ setChangeHelpdesks, changeHelpdesks }) {
  const [addhelpdeskerror, setAddhelpdeskerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newHelpdesk, setNewHelpdesk] = useState({
    id: 0,
    title: '',
    description: '',
    status: ''
  });
  const addHelpdesk = (helpdesk) => {
    setChangeHelpdesks((prevState) => [...prevState, helpdesk]);
  };
  const onHelpdeskChange = (e) => {
    let idPlus = Math.max(...changeHelpdesks.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewHelpdesk((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (newHelpdesk.title !== '' && newHelpdesk.description !== '' && newHelpdesk.status !== '') {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };

  const handleSubmit = () => {
    if (newHelpdesk.title !== '' && newHelpdesk.description !== '' && newHelpdesk.status !== '') {
      setAddhelpdeskerror('');
      addHelpdesk(newHelpdesk);
      setNewHelpdesk({
        id: 0,
        title: '',
        description: '',
        status: ''
      });
    } else {
      setAddhelpdeskerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Helpdesk">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Helpdesk
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onHelpdeskChange}
                value={newHelpdesk.title}
                name="title"
              />
              <Typography>Description</Typography>
              <TextField
                type="text"
                placeholder="Description"
                onChange={onHelpdeskChange}
                value={newHelpdesk.description}
                name="description"
              />
              <Typography>Status</Typography>
              <Select
                displayEmpty
                name="status"
                onChange={onHelpdeskChange}
                value={newHelpdesk.status}
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
            {addhelpdeskerror}
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
