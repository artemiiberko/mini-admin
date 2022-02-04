import { Routes, Route, Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import edit2Outline from '@iconify/icons-eva/edit-2-outline';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
//

export default function Aboutadsd() {
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
  const [linkEdit, setLinkEdit] = useState('');

  const onEditChange = (e) => {
    const { name, value } = e.target;
    setNewEdit((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleLinkEdit = () => {
    if (
      newEdit.title !== '' &&
      newEdit.logo !== '' &&
      newEdit.year !== '' &&
      newEdit.fromdate !== '' &&
      newEdit.todate !== '' &&
      newEdit.description !== '' &&
      newEdit.location !== ''
    ) {
      setLinkEdit('../');
    } else {
      setLinkEdit('');
    }
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
                  About ADSD
                </Typography>
                <Link to="./edit">
                  <Button variant="contained" startIcon={<Icon icon={edit2Outline} />}>
                    Edit
                  </Button>
                </Link>
              </Stack>
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
                    <TextField type="file" placeholder="Logo" onChange={onEditChange} name="logo" />
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
