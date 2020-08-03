import React from 'react';
import {DispatchCell, withJsonFormsControlProps} from '@jsonforms/react';
import {computeLabel, isDescriptionHidden, isPlainLabel, NOT_APPLICABLE} from "@jsonforms/core";
import _ from 'lodash';

function ControlRenderer(props) {
  const {
    classNames,
    description,
    id,
    errors,
    label,
    uischema,
    schema,
    visible,
    required,
    path,
    cells,
    config
  } = props;

  const [isFocused, setIsFocused] = React.useState(false);
  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const isValid = (errors || {}).length === 0;
  const divClassNames = `validation  ${
    isValid ? classNames.description : 'validation_error'
  }`;

  const appliedUiSchemaOptions = _.merge({}, config, uischema.options);
  const showDescription = !isDescriptionHidden(
    visible,
    description,
    isFocused,
    appliedUiSchemaOptions.showUnfocusedDescription
  );
  const labelText = computeLabel(
    isPlainLabel(label) ? label : (label || {}).default,
    required,
    appliedUiSchemaOptions.hideRequiredAsterisk
  );
  const cell = _.maxBy(cells, r => r.tester(uischema, schema));
  if (cell === undefined || cell.tester(uischema, schema) === NOT_APPLICABLE) {
    console.warn('No applicable cell found.', uischema, schema);
    return null;
  }
  console.log(props);
  return (
    <div
      className={(classNames || {}).wrapper}
      hidden={!visible}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
    >
      <DispatchCell
        uischema={{
          ...uischema,
          label: labelText,
        }}
        schema={schema}
        path={path}
        id={id + '-input'}
      />
      <div className={divClassNames}>
        {!isValid ? errors : showDescription ? description : null}
      </div>
    </div>
  );
}

export default withJsonFormsControlProps(ControlRenderer);
