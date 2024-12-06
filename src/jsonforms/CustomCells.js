import { and, rankWith, schemaTypeIs, uiTypeIs } from '@jsonforms/core';
import LookupListCell from './cells/LookupListCell';

export default [
  {
    tester: rankWith(3, and(uiTypeIs('Control'), schemaTypeIs('lookuplist'))),
    cell: LookupListCell,
  },
];
