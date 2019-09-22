import React from 'react';
import { Query } from "react-apollo";
import { Formik, Form, Field } from 'formik';
import { Form as UIForm } from 'semantic-ui-react'
import { toast } from 'react-semantic-toasts';
import _ from 'lodash'
import { GET_SCHEMA_TYPES } from '../utils/gql_queries_schema'
import SemanticField from '../utils/SemanticField'
import { SchemaConsumer } from '../utils/schema_context'

import * as Yup from 'yup';

const FieldSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  description: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  abapName: Yup.string(),
  type: Yup.string().when('customType', {
    is: (value) => _.isEmpty(value),
    then: Yup.string().required()
  }),
  customType: Yup.string(),
  // customType: Yup.string().when('type', {
  //   is: (value) => _.isEmpty(value),
  //   then: Yup.string().required()
  // }),
});

const FieldForm = ({ field, onSubmit, onDelete }) => (
  <div>
    <Formik
      initialValues={{
        ...field
      }}
      validationField={FieldSchema}
      validate={values => {
        let errors = {};
        if (_.isEmpty(values.customType) && _.isEmpty(values.type)) {
          errors.customType = 'Field customType or type Required';
          errors.type = 'Field customType or type Required';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ touched, errors, isSubmitting, dirty, handleSubmit, handleReset, handleDelete }) => {
        console.log(field)
        const renderMessages = () => (
          Object.keys(errors).map((key, index) => (
            toast({
              field: 'error',
              title: errors[key]
            }))
          ))
        return (
          <UIForm as={Form} className="ui form" onSubmit={handleSubmit}>
            {errors.length !== 0 && renderMessages()}
            <UIForm.Group widths="equal">
              <UIForm.Field
                label="Field ID"
                control={Field}
                name="name"
                field="text"
                placeholder="Field ID"
                error={touched.name && errors.name}
              />
              <UIForm.Field
                label="AbapName"
                control={Field}
                name="abapName"
                field="text"
                placeholder="Field AbapName"
                error={touched.abapName && errors.abapName}
              />
            </UIForm.Group>
            <UIForm.Group widths="equal">
              <UIForm.Field
                label="Resolver"
                control={Field}
                name="resolver"
                field="text"
                placeholder="Resolver"
                error={touched.resolver && errors.resolver}
              />
              <UIForm.Field
                label="Default Value"
                control={Field}
                name="defaultValue"
                field="text"
                placeholder="Default Value"
                error={touched.defaultValue && errors.defaultValue}
              />
            </UIForm.Group>

            <SemanticField
              name="description"
              label="Description"
              component={UIForm.TextArea}
              placeholder="Field Description"
              error={touched.description && errors.description}
            />
            <UIForm.Group widths="equal">
              <SchemaConsumer>
                {({ client }) => (
                  <Query query={GET_SCHEMA_TYPES}
                    variables={{ schemaId: field.rootSchema }}
                    client={client}>
                    {({ loading, error, data }) => {
                      if (loading)
                        return (
                          <React.Fragment>
                            <UIForm.Field
                              label="Field Type (Scalar)"
                              control={Field}
                              name="type"
                              field="text"
                              placeholder="Field Type (Scalar)"
                              error={touched.kind && errors.kind}
                            />
                            <UIForm.Field
                              label="Field Type (Custom)"
                              control={Field}
                              name="customType"
                              field="text"
                              placeholder="Field Type (Custom)"
                              error={touched.kind && errors.kind}
                            />
                          </React.Fragment>
                        );

                      if (error) return <p>Error Loading Field Type</p>;
                      const optionsScalar = data.__schema.types.filter(type => type.kind === "SCALAR")
                        .map(type => ({ key: type.name, value: type.name, text: type.name }))
                      optionsScalar.push({ key: '', value: '', text: '' })
                      const optionsCustomTypes = data.__schema.types.filter(type =>
                        type.kind === "OBJECT" && type.name.substring(0, 2) !== '__')
                        .map(type => ({ key: type.name, value: type.name, text: type.name }))
                      optionsCustomTypes.push({ key: '', value: '', text: '' })
                      return (<React.Fragment>
                        <SemanticField
                          name="type"
                          label="Field Type (Scalar)"
                          component={UIForm.Select}
                          options={optionsScalar}
                          error={touched.kind && errors.kind}
                        />
                        <SemanticField
                          name="customType"
                          label="Field Type (Custom)"
                          component={UIForm.Select}
                          options={optionsCustomTypes}
                          error={touched.kind && errors.kind}
                        />
                      </React.Fragment>)
                    }}
                  </Query>
                )}
              </SchemaConsumer>
              <UIForm.Group>
                <SemanticField
                  name="isNonNull"
                  toggle
                  label='!'
                  component={UIForm.Checkbox}
                  error={touched.isNonNull && errors.isNonNull}
                />
                <SemanticField
                  name="isList"
                  toggle
                  label='[&nbsp;]'
                  component={UIForm.Checkbox}
                  error={touched.isList && errors.isList}
                />
                <SemanticField
                  name="isNonNullList"
                  toggle
                  label='[&nbsp;]!'
                  component={UIForm.Checkbox}
                  error={touched.isNonNullList && errors.isNonNullList}
                />
              </UIForm.Group>
            </UIForm.Group>

            <UIForm.Group>
              {field.id && <UIForm.Button field="submit" disabled={!dirty || isSubmitting} primary>
                Update
              </UIForm.Button>}
              {!field.id && <UIForm.Button field="submit" disabled={!dirty || isSubmitting} primary>
                Save
              </UIForm.Button>}
              <UIForm.Button
                field="button"
                disabled={!dirty || isSubmitting}
                onClick={handleReset}
                secondary >
                Clear
              </UIForm.Button>
              {field.id && <UIForm.Button
                field="button"
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
  </div >
);

export default FieldForm;