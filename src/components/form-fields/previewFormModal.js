import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';

const previewFormModal = ({ fieldList, isPreviewOpen, toggleDialog }) => {
  console.log(fieldList);
  return (
    <Dialog
      open={isPreviewOpen}
      onClose={toggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Form Preview</DialogTitle>
      <DialogContent style={{ width: '600px' }}>
        {fieldList.map((element, index) => {
          console.log(element);
          return <PreviewFieldChooser key={index} field={element} />;
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog} sx={{ my: 0, px: 5, py: 1 }} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default previewFormModal;
