import { Link, Route, Routes } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import edit2Outline from '@iconify/icons-eva/edit-2-outline';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//
import CONTACTS from '../_mocks_/contacts';

export default function Contacts() {
  const [linkEdit, setLinkEdit] = useState('');
  const [editid, setEditid] = useState('');
  const [newEdit, setNewEdit] = useState({});
  const [changeEdits, setChangeEdits] = useState(CONTACTS);
  const [addediterror, setAddediterror] = useState('');
  const handleId = (e) => {
    setEditid(e.target.id);
    setNewEdit(changeEdits.find((x) => x.id === e.target.id));
  };
  const onEditChange = (e) => {
    const { name, value } = e.target;
    setNewEdit((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLinkEdit = () => {
    if (newEdit.title !== '' && newEdit.description !== '') {
      setLinkEdit('../');
    } else {
      setLinkEdit('');
    }
  };
  const handleSubmit = () => {
    if (newEdit.title !== '' && newEdit.description !== '') {
      setAddediterror('');
      const newarray = [...changeEdits];
      newarray.find((x) => x.id === editid).title = newEdit.title;
      newarray.find((x) => x.id === editid).description = newEdit.description;
      setChangeEdits(newarray);
      setNewEdit({});
    } else {
      setAddediterror('Please fill all fields');
    }
  };

  return (
    <Routes>
      <Route
        path=""
        element={
          <Page title="About ADSD">
            <Container maxWidth="false">
              <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4" gutterBottom>
                  Contacts
                </Typography>
              </Stack>
              <Card>
                <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
                  <Typography variant="h5">{changeEdits[0].title}</Typography>
                  <Card variant="outlined" style={{ padding: '30px' }}>
                    <Typography>{changeEdits[0].description}</Typography>
                  </Card>
                  <Link onClick={handleId} to="./edit">
                    <Button
                      id="1"
                      variant="contained"
                      startIcon={<Icon icon={edit2Outline} />}
                      style={{ width: '100%' }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Stack>
                <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
                  <Typography variant="h5">{changeEdits[1].title}</Typography>
                  <Card variant="outlined" style={{ padding: '30px' }}>
                    <Typography>{changeEdits[1].description}</Typography>
                  </Card>
                  <Link onClick={handleId} to="./edit">
                    <Button
                      id="2"
                      variant="contained"
                      startIcon={<Icon icon={edit2Outline} />}
                      style={{ width: '100%' }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Stack>
                <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
                  <Typography variant="h5">{changeEdits[2].title}</Typography>
                  <Card variant="outlined" style={{ padding: '30px' }}>
                    <Typography>{changeEdits[2].description}</Typography>
                  </Card>
                  <Link onClick={handleId} to="./edit">
                    <Button
                      id="3"
                      variant="contained"
                      startIcon={<Icon icon={edit2Outline} />}
                      style={{ width: '100%' }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Stack>
                <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
                  <Typography variant="h5">{changeEdits[3].title}</Typography>
                  <Card variant="outlined" style={{ padding: '30px' }}>
                    <Typography>{changeEdits[3].description}</Typography>
                  </Card>
                  <Link onClick={handleId} to="./edit">
                    <Button
                      id="4"
                      variant="contained"
                      startIcon={<Icon icon={edit2Outline} />}
                      style={{ width: '100%' }}
                    >
                      Edit
                    </Button>
                  </Link>
                </Stack>
              </Card>
            </Container>
          </Page>
        }
      />
      <Route
        path="/edit"
        element={
          <Page title='Edit "EPC Contacts"'>
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
