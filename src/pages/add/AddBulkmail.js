import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------

AddBulkmail.propTypes = {
  setChangeBulkmails: PropTypes.func,
  changeBulkmails: PropTypes.array
};

export default function AddBulkmail({ setChangeBulkmails, changeBulkmails }) {
  const [addbulkmailerror, setAddbulkmailerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newBulkmail, setNewBulkmail] = useState({
    id: 0,
    name: '',
    email: ''
  });
  const addBulkmail = (bulkmail) => {
    setChangeBulkmails((prevState) => [...prevState, bulkmail]);
  };
  const onBulkmailChange = (e) => {
    let idPlus = Math.max(...changeBulkmails.map((e) => e.id));
    idPlus += 1;

    const { name, value } = e.target;
    setNewBulkmail((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (newBulkmail.name !== '' && newBulkmail.email !== '') {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (newBulkmail.name !== '' && newBulkmail.email !== '') {
      setAddbulkmailerror('');
      addBulkmail(newBulkmail);
      setNewBulkmail({
        id: 0,
        name: '',
        email: ''
      });
    } else {
      setAddbulkmailerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Bulkmail">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Send Mail
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Name</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onBulkmailChange}
                value={newBulkmail.name}
                name="name"
              />

              <Typography>Email</Typography>
              <TextField
                type="text"
                placeholder="Email"
                onChange={onBulkmailChange}
                value={newBulkmail.emal}
                name="email"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addbulkmailerror}
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
