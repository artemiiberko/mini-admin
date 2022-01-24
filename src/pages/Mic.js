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

export default function Mic() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeEdits, setChangeEdits] = useState({
    title: 'How to use mic?',
    description: 'Description'
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
  const handleSubmit = () => {
    if (newEdit.title !== '' && newEdit.year !== '' && newEdit.description !== '') {
      setAddediterror('');
      setChangeEdits(newEdit);
      setShow(false);
    } else {
      setAddediterror('Please fill all fields');
    }
  };

  return (
    <Page title="How to use mic">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            How to use the mic
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            Edit
          </Button>
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
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
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
  );
}
