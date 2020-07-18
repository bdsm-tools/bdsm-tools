import { rankWith, isStringControl } from '@jsonforms/core';
import TextFieldCell from './cells/TextFieldCell';

export default [
    {
        tester: rankWith(3, isStringControl),
        cell: TextFieldCell,
    },
];