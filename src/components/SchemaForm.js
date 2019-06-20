import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as UIForm, Message } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';

import * as Yup from 'yup';

const SchemaSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  path: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
});

const SchemaForm = ({ schema, onSubmit }) => (
  <div>
    <h1>Schema:</h1>
    <Formik
      initialValues={{
        name: schema.name,
        description: schema.description,
        path: schema.path
      }}
      validationSchema={SchemaSchema}
      // validate={values => {
      //   let errors = {};
      //   if (!values.name) {
      //     errors.name = 'Schema ID Required';
      //   }
      //   return errors;
      // }}
      onSubmit={async (values, { setSubmitting }) => {
        // setTimeout(() => {
        // alert(JSON.stringify(values, null, 2));
        await onSubmit(values);
        setSubmitting(false);
        // }, 400);
      }}
    >
      {({ touched, errors, isSubmitting, dirty, handleSubmit, handleReset }) => {
        const renderMessages = () => (
          Object.keys(errors).map((key, index) => (
            toast({
              type: 'error',
              title: errors[key]
            }))
          ))
        return (
          <UIForm as={Form} className="ui form" onSubmit={handleSubmit}>
            {errors.length !== 0 && renderMessages()}
            <UIForm.Field
              label="ID"
              control={Field}
              name="name"
              type="text"
              placeholder="Schema ID"
              error={touched.name && errors.name}
            />
            <UIForm.Field
              label="Description"
              control={Field}
              name="description"
              type="text"
              placeholder="Schema Description"
              error={touched.description && errors.description}
            />
            <UIForm.Field
              label="Path"
              control={Field}
              name="path"
              type="text"
              placeholder="Schema Path"
              error={touched.path && errors.path}
            />
            <UIForm.Group>
              <UIForm.Button type="submit" disabled={!dirty || isSubmitting} primary>
                Update
              </UIForm.Button>
              <UIForm.Button
                type="button"
                disabled={!dirty || isSubmitting}
                onClick={handleReset}
                secondary >
                Clear
          </UIForm.Button>
            </UIForm.Group>
          </UIForm>
        )
      }}
    </Formik>
  </div>
);

export default SchemaForm;