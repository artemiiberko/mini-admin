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
const videotypelist = ['EPC Video', 'Live Video Webcost'];
// ----------------------------------------------------------------------

AddVideo.propTypes = {
  setChangeVideos: PropTypes.func,
  changeVideos: PropTypes.array
};

export default function AddVideo({ setChangeVideos, changeVideos }) {
  const [addvideoerror, setAddvideoerror] = useState('');
  const [linkAdd, setLinkAdd] = useState('');
  const [newVideo, setNewVideo] = useState({
    id: 0,
    title: '',
    videourl: '',
    videotype: '',
    status: ''
  });
  const addVideo = (video) => {
    setChangeVideos((prevState) => [...prevState, video]);
  };
  const onVideoChange = (e) => {
    let idPlus = Math.max(...changeVideos.map((e) => e.id));
    idPlus += 1;
    const { name, value } = e.target;
    setNewVideo((prevState) => ({
      ...prevState,
      [name]: value,
      id: idPlus
    }));
  };
  const handleLinkAdd = () => {
    if (
      newVideo.title !== '' &&
      newVideo.videourl !== '' &&
      newVideo.videotype !== '' &&
      newVideo.status !== ''
    ) {
      setLinkAdd('../');
    } else {
      setLinkAdd('');
    }
  };
  const handleSubmit = () => {
    if (
      newVideo.title !== '' &&
      newVideo.videourl !== '' &&
      newVideo.videotype !== '' &&
      newVideo.status !== ''
    ) {
      setAddvideoerror('');
      addVideo(newVideo);
      setNewVideo({
        id: 0,
        title: '',
        videourl: '',
        videotype: '',
        status: ''
      });
    } else {
      setAddvideoerror('Please fill all fields');
    }
  };

  return (
    <Page title="Add Video">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            New Video
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <FormGroup style={{ display: 'flex', maxWidth: '1000px', margin: 'auto' }}>
            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Title</Typography>
              <TextField
                type="text"
                placeholder="Title"
                onChange={onVideoChange}
                value={newVideo.title}
                name="title"
              />
              <Typography>Video URL</Typography>
              <TextField
                type="text"
                placeholder="Video URL"
                onChange={onVideoChange}
                value={newVideo.question}
                name="videourl"
              />
            </Stack>

            <Stack spacing={3} style={{ flexBasis: '50%', padding: '10px', flexShrink: '0' }}>
              <Typography>Video Type</Typography>
              <Select
                displayEmpty
                name="videotype"
                onChange={onVideoChange}
                value={newVideo.videotype}
              >
                <MenuItem key="videotype" value="" style={{ color: 'grey' }}>
                  Select Video Type...
                </MenuItem>
                {videotypelist.map((videotype) => (
                  <MenuItem key={videotype} value={videotype}>
                    {videotype}
                  </MenuItem>
                ))}
              </Select>
              <Typography>Status</Typography>
              <Select displayEmpty name="status" onChange={onVideoChange} value={newVideo.status}>
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
            {addvideoerror}
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
