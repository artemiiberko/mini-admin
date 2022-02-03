import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
// material
import { Card, Stack, Button, Container, Typography, TextField, FormGroup } from '@mui/material';
// components
import Page from '../../components/Page';
//

// ----------------------------------------------------------------------

AddGuestspeechdoc.propTypes = {
  setChangeGuestspeechdocs: PropTypes.func,
  changeGuestspeechdocs: PropTypes.array
};

export default function AddGuestspeechdoc({ setChangeGuestspeechdocs, changeGuestspeechdocs }) {
  const [addguestspeechdocerror, setAddguestspeechdocerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newGuestspeechdoc, setNewGuestspeechdoc] = useState({
    id: 0,
    title: '',
    speechfile: ''
  });
  const addGuestspeechdoc = (guestspeechdoc) => {
    setChangeGuestspeechdocs((prevState) => [...prevState, guestspeechdoc]);
  };
  const onGuestspeechdocChange = (e) => {
    let idPlus = Math.max(...changeGuestspeechdocs.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewGuestspeechdoc((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (newGuestspeechdoc.speechfile !== '' && newGuestspeechdoc.title !== '') {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };

  const handleSubmit = () => {
    if (newGuestspeechdoc.speechfile !== '' && newGuestspeechdoc.title !== '') {
      setAddguestspeechdocerror('');
      addGuestspeechdoc(newGuestspeechdoc);
      setNewGuestspeechdoc({
        id: 0,
        title: '',
        speechfile: ''
      });
    } else {
      setAddguestspeechdocerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Speech Doc">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Speech Doc
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onGuestspeechdocChange}
                value={newGuestspeechdoc.title}
                name="title"
              />
              <Typography>Guest Speech File</Typography>
              <TextField
                type="file"
                placeholder="Guest Speech File"
                onChange={onGuestspeechdocChange}
                value={newGuestspeechdoc.speechfile}
                name="speechfile"
              />
            </Stack>
          </FormGroup>
          <Typography style={{ color: 'red', fontWeight: '700', padding: '10px' }}>
            {addguestspeechdocerror}
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
