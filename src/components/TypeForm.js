import React from 'react';
import { Query } from "react-apollo";
import { Formik, Form, Field } from 'formik';
import { Form as UIForm } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import { GET_ENUM_VALUES_BY_NAME } from '../utils/gql_queries_type'
import SemanticField from '../utils/SemanticField'

import * as Yup from 'yup';

const TypeSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  abapName: Yup.string(),
  kind: Yup.string()
    .required('Required'),
});

const TypeForm = ({ type, onSubmit, onDelete }) => (
  <div>
    <Formik
      initialValues={{
        name: type.name,
        description: type.description,
        abapName: type.abapName,
        kind: type.kind
      }}
      validationType={TypeSchema}
      // validate={values => {
      //   let errors = {};
      //   if (!values.name) {
      //     errors.name = 'Type ID Required';
      //   }
      //   return errors;
      // }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors, isSubmitting, dirty, handleSubmit, handleReset, handleDelete }) => {
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
              label="Type ID"
              control={Field}
              name="name"
              type="text"
              placeholder="Type ID"
              error={touched.name && errors.name}
            />
            <UIForm.Field
              label="Description"
              control={Field}
              name="description"
              type="text"
              placeholder="Type Description"
              error={touched.description && errors.description}
            />
            <UIForm.Field
              label="AbapName"
              control={Field}
              name="abapName"
              type="text"
              placeholder="Type AbapName"
              error={touched.abapName && errors.abapName}
            />

            <Query query={GET_ENUM_VALUES_BY_NAME}
              variables={{
                "enumName": "TypeKindEnum"
              }}>
              {({ loading, error, data }) => {
                if (loading)
                  return <UIForm.Field
                    label="Type Kind"
                    control={Field}
                    name="kind"
                    type="text"
                    placeholder="Type Kind"
                    error={touched.kind && errors.kind}
                  />;
                if (error) return <p>Error Loading Type Kind</p>;
                const options = data.__type.enumValues.map(enumValue =>
                  ({ key: enumValue.name, value: enumValue.name, text: enumValue.name }))
                return <SemanticField
                  name="kind"
                  label="Type Kind"
                  component={UIForm.Select}
                  options={options}
                  error={touched.kind && errors.kind}
                />
              }}
            </Query>

            <UIForm.Group>
              {type.id && <UIForm.Button type="submit" disabled={!dirty || isSubmitting} primary>
                Update
              </UIForm.Button>}
              {!type.id && <UIForm.Button type="submit" disabled={!dirty || isSubmitting} primary>
                Save
              </UIForm.Button>}
              <UIForm.Button
                type="button"
                disabled={!dirty || isSubmitting}
                onClick={handleReset}
                secondary >
                Clear
              </UIForm.Button>
              {type.id && <UIForm.Button
                type="button"
                disabled={isSubmitting}
                onClick={onDelete}
                color='red' >
                Delete
              </UIForm.Button>}
            </UIForm.Group>
          </UIForm>
        )
      }}
    </Formik>
  </div>
);

export default TypeForm;