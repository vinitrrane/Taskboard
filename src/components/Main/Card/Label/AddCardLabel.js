import React from 'react';
import { Chip } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const AddCardLabel = ({ labelItem, removeLabelHandler }) => {
  return (
    <>
      <Chip
        className='add-card-label'
        color='success'
        sx={{ backgroundColor: `${labelItem.color}`, p: 0, color: '#fff', borderRadius: '4px' }}
        size='small'
        deleteIcon={<HighlightOffIcon className='delete-label-btn' />}
        label={labelItem.text}
        onDelete={() => removeLabelHandler(labelItem.id)}
      />
    </>
  );
};

export default AddCardLabel;
