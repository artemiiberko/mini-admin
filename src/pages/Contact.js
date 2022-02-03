import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Modal } from 'react-bootstrap';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
//
import CONTACTS from '../_mocks_/contacts';

export default function Contacts() {
  const [show, setShow] = useState(false);
  const [editid, setEditid] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setEditid(e.target.id);
    setShow(true);
  };
  const [changeEdits, setChangeEdits] = useState(CONTACTS);

  const [addediterror, setAddediterror] = useState('');
  const [newEdit, setNewEdit] = useState({});
  const onEditChange = (e) => {
    const { name, value } = e.target;
    setNewEdit((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = () => {
    if (newEdit.title !== '' && newEdit.description !== '') {
      setAddediterror('');
      const newarray = [...changeEdits];
      newarray.find((x) => x.id === editid).title = newEdit.title;
      newarray.find((x) => x.id === editid).description = newEdit.description;
      setChangeEdits(newarray);
      setShow(false);
      setNewEdit({});
    } else {
      setAddediterror('Please fill all fields');
    }
  };

  return (
    <Page title="About ADSD">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Contacts
          </Typography>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>EDIT</Modal.Title>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
        <Card>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
            <Typography variant="h5">{changeEdits[0].title}</Typography>
            <Card variant="outlined" style={{ padding: '30px' }}>
              <Typography>{changeEdits[0].description}</Typography>
            </Card>
            <Button
              id="1"
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleShow}
            >
              Edit
            </Button>
          </Stack>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
            <Typography variant="h5">{changeEdits[1].title}</Typography>
            <Card variant="outlined" style={{ padding: '30px' }}>
              <Typography>{changeEdits[1].description}</Typography>
            </Card>
            <Button
              id="2"
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleShow}
            >
              Edit
            </Button>
          </Stack>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
            <Typography variant="h5">{changeEdits[2].title}</Typography>
            <Card variant="outlined" style={{ padding: '30px' }}>
              <Typography>{changeEdits[2].description}</Typography>
            </Card>
            <Button
              id="3"
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleShow}
            >
              Edit
            </Button>
          </Stack>
          <Stack spacing={4} style={{ padding: '20px', maxWidth: '700px' }}>
            <Typography variant="h5">{changeEdits[3].title}</Typography>
            <Card variant="outlined" style={{ padding: '30px' }}>
              <Typography>{changeEdits[3].description}</Typography>
            </Card>
            <Button
              id="4"
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleShow}
            >
              Edit
            </Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
