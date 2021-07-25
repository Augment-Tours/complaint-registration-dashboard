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
  { id: 'multi-select', name: 'Multi Select' }
];

export default function Museum() {
  const [formName, setFormName] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldList, setFieldList] = useState([]);
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

          {fieldList.map((field) => (
            <FieldChooser key={field.id} field={field} onFieldSaved={onFieldSaved} />
          ))}

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
                  name: 'Field Name',
                  type: fieldType,
                  hint: 'Field Hint',
                  label: 'Field Label',
                  position: '1',
                  data: '{}'
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
