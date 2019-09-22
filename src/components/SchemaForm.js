import React, { useContext } from 'react';
import { Formik, Form, Field } from 'formik';
import { Form as UIForm } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import { Query } from "react-apollo";

import SemanticField from '../utils/SemanticField'
import SchemaContext from '../utils/schema_context'
import { GET_SCHEMA_TYPES_BY_SCHEMA } from '../utils/gql_queries_schema'

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

const SchemaForm = ({ schema, onSubmit, onDelete }) => {
  const schemaContext = useContext(SchemaContext)

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          name: schema.name,
          description: schema.description,
          path: schema.path,
          query: schema.query,
          mutation: schema.mutation
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
                label="Schema ID"
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
              <Query query={GET_SCHEMA_TYPES_BY_SCHEMA}
                variables={{ schemaId: schema.id }}>
                {({ loading, error, data }) => {
                  if (loading)
                    return (
                      <React.Fragment>
                        <UIForm.Field
                          label="Query Type"
                          control={Field}
                          name="query"
                          field="text"
                          placeholder="Query Type"
                          error={touched.kind && errors.kind}
                        />
                        <UIForm.Field
                          label="Mutation Type"
                          control={Field}
                          name="mutation"
                          field="text"
                          placeholder="Mutation Type"
                          error={touched.kind && errors.kind}
                        />
                      </React.Fragment>
                    );

                  if (error) return <p>Error Loading Schema Types</p>;
                  const optionsCustomTypes = data.schema[0].types.filter(type =>
                    type.kind === "OBJECT" && type.name.substring(0, 2) !== '__')
                    .map(type => ({ key: type.id, value: type.id, text: type.name }))
                  optionsCustomTypes.push({ key: '', value: '', text: '' })
                  return (<React.Fragment>
                    <SemanticField
                      name="query"
                      label="Query Type"
                      component={UIForm.Select}
                      options={optionsCustomTypes}
                      error={touched.kind && errors.kind}
                    />
                    <SemanticField
                      name="mutation"
                      label="Mutation Type"
                      component={UIForm.Select}
                      options={optionsCustomTypes}
                      error={touched.kind && errors.kind}
                    />
                  </React.Fragment>)
                }}
              </Query>

              <UIForm.Group>
                {schema.id && <UIForm.Button type="submit" disabled={!dirty || isSubmitting} primary>
                  Update
              </UIForm.Button>}
                {!schema.id && <UIForm.Button type="submit" disabled={!dirty || isSubmitting} primary>
                  Save
              </UIForm.Button>}
                <UIForm.Button
                  type="button"
                  disabled={!dirty || isSubmitting}
                  onClick={handleReset}
                  secondary >
                  Clear
              </UIForm.Button>
                {schema.id && <UIForm.Button
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
    </React.Fragment >
  )
};

export default SchemaForm;