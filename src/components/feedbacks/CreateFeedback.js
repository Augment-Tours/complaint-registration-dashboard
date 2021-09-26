import * as Yup from 'yup';
import React, { useState } from 'react';

import { Stack, TextField, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { useFormik, FormikProvider } from 'formik';

import { createFeedback } from '../../request/feedback';

const CreateFeedback = ({ isOpenFilter, toggleDrawer, fetchFeedbacks }) => {
  const [file, setFile] = useState(null);

  const FeedbackSchema = Yup.object().shape({
    subject: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Subject is required!'),
    feedback: Yup.string().min(10, 'Too short').required('Feedback is Required')
    // file: Yup.mixed().test('fileSize', 'The file is too large', (value) => {
    //   if (!value.length) return true; // attachment is optional
    //   console.log(value[0].size);
    //   return value[0].size <= 2000000;
    // })
    // file: Yup.object().shape({
    //   file: Yup.mixed().required()
    // })
  });

  const formik = useFormik({
    initialValues: {
      subject: '',
      feedback: ''
    },
    validationSchema: FeedbackSchema,
    onSubmit: (values) => {
      // create an object of form data
      const formData = new FormData();
      // append the values
      formData.append('subject', values.subject);
      formData.append('feedback', values.feedback);
      formData.append('file', file);

      createFeedback(formData)
        .then((res) => {
          console.log(res);
          fetchFeedbacks();
          toggleDrawer();
        })
        .catch((err) => {
          // convert django errors to formik
          if (err.response.status === 400) {
            const errors = {};
            Object.entries(err.response.data).forEach(([key, value]) => {
              // eslint-disable-next-line prefer-destructuring
              errors[key] = value[0];
            });
            formik.setErrors(errors);
          }
        })
        .finally(() => {
          formik.setSubmitting(false);
        });
    }
  });

  // console.log(formik.values.file);

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const createDrawer = (
    <Dialog
      anchor="middle"
      open={isOpenFilter}
      onClose={toggleDrawer}
      PaperProps={{
        sx: { width: 500, border: 'none', overflow: 'hidden', padding: '20px 20px' }
      }}
    >
      <DialogTitle>Add Feedback</DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Stack>
            <TextField
              {...getFieldProps('subject')}
              sx={{ mb: 2, mt: 1 }}
              fullwidth
              label="Subject"
              error={Boolean(touched.subject && errors.subject)}
              helperText={touched.subject && errors.subject}
            />
            <TextField
              {...getFieldProps('feedback')}
              fullwidth
              label="Feedback Content"
              maxRows={10}
              rows={10}
              multiline
              error={Boolean(touched.feedback && errors.feedback)}
              helperText={touched.feedback && errors.feedback}
            />
            <input
              type="file"
              accept="application/pdf"
              secondary
              component="label"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
            <LoadingButton
              variant="contained"
              type="submit"
              onClick={handleSubmit}
              loading={isSubmitting}
              style={{ marginTop: '20px', padding: '10px 0' }}
            >
              Creating Feedback
            </LoadingButton>
          </Stack>
        </FormikProvider>
      </DialogContent>
    </Dialog>
  );

  return createDrawer;
};

export default CreateFeedback;
