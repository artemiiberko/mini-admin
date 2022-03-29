import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BallTriangle } from 'react-loader-spinner';
// material
import {
  Button,
  FormGroup,
  Stack,
  Typography,
  TextField,
  Card,
  Container,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import Page from '../components/Page';
// ----------------------------------------------------------------------
ViewPage.propTypes = {
  editlist: PropTypes.object,
  editviewRecord: PropTypes.object
};
export default function ViewPage({ editviewRecord, editlist, recordid, pagePath }) {
  const [viewRecord] = useState(editviewRecord);
  const [users, setUsers] = useState([]);
  const space = ' ';
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://wr.raneddo.ml/api/User`).then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Page title="View">
      <Container maxWidth="false">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            View
          </Typography>
        </Stack>
        <Card sx={{ padding: '20px' }}>
          <BallTriangle
            wrapperStyle={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255,255,255,0.5)',
              zIndex: 1
            }}
            height="100"
            width="100"
            color="grey"
            ariaLabel="loading"
            visible={isLoading}
          />
          <FormGroup style={{ display: 'flex', width: '100%' }}>
            <Stack spacing={3} style={{ flexBasis: '100%', padding: '10px', flexShrink: '0' }}>
              {editlist.text.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.select.map((edititem) =>
                edititem.id === 'speakers' ? (
                  <Stack key={edititem.id} spacing={1}>
                    <Typography variant="overline">{edititem.name}</Typography>
                    <TextField
                      multiline
                      name={edititem.id}
                      value={users.length !== 0 ? users[viewRecord[edititem.id][0]].firstName : ''}
                      maxRows={5}
                    />
                  </Stack>
                ) : (
                  <Stack key={edititem.id} spacing={1}>
                    <Typography variant="overline">{edititem.name}</Typography>
                    <TextField
                      multiline
                      name={edititem.id}
                      value={viewRecord[edititem.id]}
                      maxRows={5}
                    />
                  </Stack>
                )
              )}
              {editlist.file.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.date.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.time.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datetime.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.checkbox.map((edititem) => (
                <Stack
                  key={edititem.id}
                  style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
                >
                  <Typography style={{ flexBasis: '20%' }}>{edititem.name}</Typography>
                  {edititem.properties.map((property) => (
                    <FormControlLabel
                      style={{ textTransform: 'capitalize' }}
                      key={property}
                      control={
                        <Checkbox
                          checked={viewRecord[edititem.id][property]}
                          disabled
                          id={edititem.id}
                          name={property}
                        />
                      }
                      label={property}
                    />
                  ))}
                </Stack>
              ))}
              {editlist.textmb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.selectmb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.filemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.timemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={viewRecord[edititem.id]}
                    maxRows={5}
                  />
                </Stack>
              ))}
              {editlist.datetimemb.map((edititem) => (
                <Stack key={edititem.id} spacing={1}>
                  <Typography variant="overline">{edititem.name}</Typography>
                  <TextField
                    multiline
                    name={edititem.id}
                    value={
                      viewRecord[edititem.id].slice(0, 10) +
                      space +
                      viewRecord[edititem.id].slice(11, 16)
                    }
                    maxRows={5}
                  />
                </Stack>
              ))}
            </Stack>
          </FormGroup>
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
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
