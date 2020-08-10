import {
  rankWith,
  isStringControl,
  isBooleanControl,
  isEnabled,
  and,
  schemaTypeIs,
  uiTypeIs,
  isEnumControl
} from '@jsonforms/core';
import TextFieldCell from './cells/TextFieldCell';
import CheckboxCell from "./cells/CheckboxCell";
import SelectionCell from "./cells/SelectionCell";

export default [
  {
    tester: rankWith(3, isStringControl),
    cell: TextFieldCell,
  }, {
    tester: rankWith(3, isBooleanControl),
    cell: CheckboxCell,
  }, {
    tester: rankWith(3, and(
      uiTypeIs('Control'),
      schemaTypeIs('enum'),
    )),
    cell: SelectionCell,
  }
];