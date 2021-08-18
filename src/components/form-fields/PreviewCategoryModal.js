/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';
import { getAllFieldsByCategory } from '../../request/formFields';

const CategoryPreview = ({ categoryId, isPreviewOpen, toggleDialog }) => {
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    if (categoryId !== null) {
      getAllFieldsByCategory(categoryId).then((res) => {
        setFieldList(res);
        console.log(res);
      });
    }
  }, [categoryId]);

  return (
    <PreviewFormModal
      categoryId={categoryId}
      fieldList={fieldList}
      isPreviewOpen={isPreviewOpen}
      toggleDialog={toggleDialog}
    />
  );
};

const PreviewFormModal = ({ categoryId, fieldList, isPreviewOpen, toggleDialog }) => {
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
        <Button
          onClick={() => toggleDialog(categoryId)}
          sx={{ my: 0, px: 5, py: 1 }}
          color="primary"
          autoFocus
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { CategoryPreview };

export default PreviewFormModal;
