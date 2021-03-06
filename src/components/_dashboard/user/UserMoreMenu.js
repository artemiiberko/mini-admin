import { Icon } from '@iconify/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
// ----------------------------------------------------------------------
/* UserMoreMenu.propTypes = {
  id: PropTypes.number
  changeData: PropTypes.array,
  setChangeData: PropTypes.func 
}; */
export default function UserMoreMenu({ id, setChangeData, pagePath, setEditLoading }) {
  /* {
     id,  changeData, setChangeData 
  } */
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  const handleDeleteItem = () => {
    setEditLoading(true);
    axios.delete(`https://wr.raneddo.ml/api/${pagePath}/${id}`).then((res) => {
      console.log(res);
      axios.get(`https://wr.raneddo.ml/api/${pagePath}`).then((res) => {
        setChangeData(res.data);
        setEditLoading(false);
      });
    });

    /* setChangeData(changeData.filter((el) => el.id !== id)); */
    setIsOpen(false);
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDeleteItem} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="./edit" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem component={RouterLink} to="./view" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={eyeFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
