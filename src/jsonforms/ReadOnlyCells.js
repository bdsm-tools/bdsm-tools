import { rankWith, and, uiTypeIs, schemaTypeIs } from '@jsonforms/core';
import GenericReadOnlyCell from './cells/GenericReadOnlyCell';
import LookupListReadOnlyCell from './cells/LookupListReadOnlyCell';

export default [
  {
    tester: rankWith(4, and(uiTypeIs('Control'), schemaTypeIs('lookuplist'))),
    cell: LookupListReadOnlyCell,
  },
  {
    tester: rankWith(3, uiTypeIs('Control')),
    cell: GenericReadOnlyCell,
  },
];
