import React from 'react';
import { Field } from 'formik';

const SemanticField = ({ component, ...fieldProps }) => (
  <Field
    {...fieldProps}
    render={({
      field: { value, onBlur, ...field },
      form: { setFieldValue, setFieldTouched },
      ...props
    }) =>
      React.createElement(component, {
        ...fieldProps,
        ...field,
        ...props,
        ...(typeof value === 'boolean'
          ? {
            checked: value
          }
          : {
            value
          }),
        onChange: (e, { value: newValue, checked }) =>
          setFieldValue(fieldProps.name, newValue || checked),
        onBlur: (e, blurProps) =>
          blurProps ? setFieldTouched(fieldProps.name, blurProps.value) : onBlur(e)
      })
    }
  />
);

export default SemanticField;