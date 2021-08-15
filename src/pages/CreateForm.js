// import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { DragHandleOutlined } from '@material-ui/icons';
import arrayMove from 'array-move';
import { Container as DraggableContainer, Draggable } from 'react-smooth-dnd';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import FieldChooser from '../components/form-fields/FieldChooser';
//
// import USERLIST from '../_mocks_/user';
import { createForm } from '../request/form';

const FIELD_TYPES_LIST = [
  { id: 'textbox', name: 'Text Field' },
  { id: 'multiline_textbox', name: 'Multi Line TextBox' },
  { id: 'dropdown', name: 'Dropdown' },
  { id: 'radio', name: 'Radio Button' },
  { id: 'multi-select', name: 'Multi Select' },
  { id: 'image', name: 'Image' },
  { id: 'file', name: 'File' },
  { id: 'date', name: 'Date' },
  { id: 'range', name: 'Range' },
  { id: 'date-range', name: 'Date Range' }
];

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    // eslint-disable-next-line prefer-destructuring
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export default function Museum() {
  const [formName, setFormName] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldList, setFieldList] = useState([]);

  const [items, setItems] = useState([
    { id: '1', text: 'Item 1' },
    { id: '2', text: 'Item 2' },
    { id: '3', text: 'Item 3' },
    { id: '4', text: 'Item 4' }
  ]);

  const onDrop = (dropResult) => {
    // setItems(applyDrag(items, dropResult));
    // console.log(dropResult);
    setFieldList(applyDrag(fieldList, dropResult));
    // setFieldList({ applyDrag(fieldList, dropResult)});
  };

  const handleFieldChange = (e) => {
    setFieldType(e.target.value);
  };

  const onFieldSaved = (fieldData) => {
    const newFieldList = fieldList;
    newFieldList.pop();
    newFieldList.push(fieldData);
    setFieldList(newFieldList);
    console.table(fieldList);
  };

  const onCancelClicked = (index) => {
    const newFieldList = fieldList;
    newFieldList.splice(index);
    // console.log('->', newFieldList);
    setFieldList(newFieldList);
  };

  // console.log('-->', fieldList);

  return (
    <Page title="Create Form | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Form
          </Typography>
        </Stack>
        <Stack
          direction="column"
          alignItems="left"
          justifyContent="space-between"
          mb={5}
          style={{ width: '50%' }}
        >
          <TextField
            label="Form Name"
            onChange={(e) => {
              setFormName(e.target.value);
            }}
            value={formName}
            width="50%"
          />

          <DraggableContainer dragClass=".drag-handle" lockAxis="y" onDrop={onDrop}>
            {fieldList.map((field, index) => (
              <Draggable key={index}>
                <FieldChooser
                  index={index}
                  field={field}
                  onFieldSaved={onFieldSaved}
                  onCancel={onCancelClicked}
                />
                <p>{field.saved} </p>
              </Draggable>
            ))}
          </DraggableContainer>

          <Stack direction="row" justifyContent="space-between" style={{ marginTop: '20px' }}>
            <FormControl variant="outlined" style={{ width: '60%' }}>
              <InputLabel>Field Type</InputLabel>
              <Select onChange={handleFieldChange} label="Field Type">
                {FIELD_TYPES_LIST.map((field) => (
                  <MenuItem key={field.id} value={field.id}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              fullWidth={false}
              // disabled={isCreating}
              style={{ padding: '10px 20px' }}
              onClick={() => {
                const newFieldList = fieldList;
                newFieldList.push({
                  name: `item ${fieldList.length + 1}`,
                  type: fieldType,
                  hint: 'Field Hint',
                  label: 'Field Label',
                  position: fieldList.length + 1,
                  data: '{}',
                  saved: false
                });
                setFieldList(newFieldList);
              }}
            >
              Add Field
            </Button>
          </Stack>
        </Stack>

        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          // disabled={isCreating}
          style={{ padding: '10px 20px' }}
          onClick={() => {
            createForm({ name: formName, form_fields: fieldList })
              .then((res) => {
                console.log('create form success', res.data);
              })
              .catch((err) => {
                console.error('create form error', err);
              });
          }}
        >
          Create Form
        </Button>
      </Container>
    </Page>
  );
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
