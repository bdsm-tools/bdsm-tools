import {isControl, rankWith } from '@jsonforms/core';
import ControlRenderer from "./renderer/ControlRenderer";

export default [
    {
        tester: rankWith(3, isControl),
        renderer: ControlRenderer,
    },
];