import PropTypes from 'prop-types';
import axios from 'axios';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment
} from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  selectedItems: PropTypes.array,
  setChangeData: PropTypes.func,
  setSelectedItems: PropTypes.func,
  changeData: PropTypes.array
};

export default function UserListToolbar({
  setEditLoading,
  numSelected,
  filterName,
  onFilterName,
  selectedItems,
  changeData,
  setChangeData,
  setSelectedItems,
  pagePath
}) {
  const deleteSelected = () => {
    if (pagePath === 'Agenda') {
      setEditLoading(true);
      selectedItems.map((i) =>
        axios.delete(`https://wr.raneddo.ml/api/Agenda/${i}`).then((res) => {
          console.log(res);
          axios.get(`https://wr.raneddo.ml/api/Agenda`).then((res) => {
            setChangeData(res.data);
            setEditLoading(false);
          });
        })
      );
    }
    /* setChangeData(
      changeData.filter((data) => selectedItems.filter((item) => item === data.id).length === 0)
    ); */
    setSelectedItems([]);
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip onClick={deleteSelected} title="Delete">
          <IconButton>
            <Icon icon={trash2Fill} />
          </IconButton>
        </Tooltip>
      ) : (
        true
      )}
    </RootStyle>
  );
}
