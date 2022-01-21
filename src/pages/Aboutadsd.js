import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Modal } from 'react-bootstrap';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';

// components
import Page from '../components/Page';
import Label from '../components/Label';
//

export default function Aboutadsd() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changeEdits, setChangeEdits] = useState({
    logo: 'logo',
    title: '8th Abu Dhabi Strategic Debate',
    year: '2021',
    location: 'Emirates Palace Hotel, Abu Dhabi, UAE',
    fromdate: '2019/11/09',
    todate: '2019/11/11',
    description:
      'In cooperation with the UAE Ministry of Foreign Affairs, the Emirates Policy Center (EPC) convenes the Sixth Annual “Abu Dhabi Strategic Debate” (ADSD). The event is scheduled to take place from 09-11 November 2019, at the Emirates Palace in Abu Dhabi, under the patronage of H.H. Sheikh Abdullah bin Zayed Al Nahyan, the UAE’s Minister of Foreign Affairs.'
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
    if (
      newEdit.title !== '' &&
      newEdit.logo !== '' &&
      newEdit.year !== '' &&
      newEdit.fromdate !== '' &&
      newEdit.todate !== '' &&
      newEdit.description !== '' &&
      newEdit.location !== ''
    ) {
      setAddediterror('');
      setChangeEdits(newEdit);
      setShow(false);
    } else {
      setAddediterror('Please fill all fields');
    }
  };

  return (
    <Page title="About ADSD">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            About ADSD
          </Typography>
          <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleShow}>
            Edit
          </Button>
        </Stack>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>EDIT</Modal.Title>
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
                <Typography>Year</Typography>
                <TextField
                  type="text"
                  placeholder="Year"
                  onChange={onEditChange}
                  value={newEdit.year}
                  name="year"
                />
                <Typography>Location</Typography>
                <TextField
                  type="text"
                  placeholder="Location"
                  onChange={onEditChange}
                  value={newEdit.location}
                  name="location"
                />
                <Typography>From Date</Typography>
                <TextField
                  type="text"
                  placeholder="From Date"
                  onChange={onEditChange}
                  value={newEdit.fromdate}
                  name="fromdate"
                />
                <Typography>To Date</Typography>
                <TextField
                  type="text"
                  placeholder="To Date"
                  onChange={onEditChange}
                  value={newEdit.todate}
                  name="todate"
                />
                <Typography>Description</Typography>
                <TextField
                  type="text"
                  placeholder="Description"
                  onChange={onEditChange}
                  value={newEdit.description}
                  name="description"
                />
                <Typography>Logo</Typography>
                <TextField
                  type="text"
                  placeholder="Logo"
                  onChange={onEditChange}
                  value={newEdit.logo}
                  name="logo"
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
            <Label>{changeEdits.logo}</Label>
            <Typography variant="h5">{changeEdits.title}</Typography>
            <Typography>{changeEdits.year}</Typography>
            <Typography>{changeEdits.location}</Typography>
            <Typography variant="subtitle2">
              {changeEdits.fromdate} - {changeEdits.todate}
            </Typography>
            <Card variant="outlined" style={{ padding: '30px' }}>
              <Typography>{changeEdits.description}</Typography>
            </Card>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
