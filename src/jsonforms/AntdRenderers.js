import { rankWith, scopeEndsWith } from '@jsonforms/core';
import TextFieldControl from './cells/TextFieldCell';

export default [
    {
        tester: rankWith(3, scopeEndsWith('text')),
        renderer: TextFieldControl,
    },
];