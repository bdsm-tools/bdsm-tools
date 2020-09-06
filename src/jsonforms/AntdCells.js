import {
  rankWith,
  isStringControl,
  isBooleanControl,
  isDateControl,
  and,
  schemaTypeIs,
  uiTypeIs,
} from '@jsonforms/core';
import TextFieldCell from './cells/TextFieldCell';
import CheckboxCell from "./cells/CheckboxCell";
import SelectionCell from "./cells/SelectionCell";
import DateCell from "./cells/DateCell";

export default [
  {
    tester: rankWith(3, isDateControl),
    cell: DateCell,
  }, {
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
  },
];