import { Link, Route, Routes } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import edit2Outline from '@iconify/icons-eva/edit-2-outline';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//

export default function Code() {
  const [linkEdit, setLinkEdit] = useState('');
  const [changeEdits, setChangeEdits] = useState({
    title: '.',
    description: ''
  });
  const [addediterror, setAddediterror] = useState('');
  const [newEdit, setNewEdit] = useState(changeEdits);

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setNewEdit((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLinkEdit = () => {
    if (newEdit.title !== '' && newEdit.year !== '' && newEdit.description !== '') {
      setLinkEdit('../');
    } else {
      setLinkEdit('');
    }
  };
  const handleSubmit = () => {
    if (newEdit.title !== '' && newEdit.year !== '' && newEdit.description !== '') {
      setAddediterror('');
      setChangeEdits(newEdit);
    } else {
      setAddediterror('Please fill all fields');
    }
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <Page title="Code of Conduct">
            <Container maxWidth="false">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Code of Conduct
                </Typography>
                <Link to="./edit">
                  <Button variant="contained" startIcon={<Icon icon={edit2Outline} />}>
                    Edit
                  </Button>
                </Link>
              </Stack>
              <Card>
                <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
                  <Typography variant="h5">{changeEdits.title}</Typography>
                  <Card variant="outlined" style={{ padding: '20px' }}>
                    <Typography>{changeEdits.description}</Typography>
                  </Card>
                </Stack>
              </Card>
            </Container>
          </Page>
        }
      />
      <Route
        path="/edit"
        element={
          <Page title='Edit "About ADSD"'>
            <Container maxWidth="false">
              <Card sx={{ padding: '20px' }}>
                <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
                  <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
                    <Typography>Title</Typography>
                    <TextField
                      type="text"
                      placeholder="Title"
                      onChange={onEditChange}
                      value={newEdit.title}
                      name="title"
                    />
                    <Typography>Description</Typography>
                    <TextField
                      type="text"
                      placeholder="Description"
                      onChange={onEditChange}
                      value={newEdit.description}
                      name="description"
                    />
                  </Stack>
                </FormGroup>
                <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
                  {addediterror}
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
        }
      />
    </Routes>
  );
}
