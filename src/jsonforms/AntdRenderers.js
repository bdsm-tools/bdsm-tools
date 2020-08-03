import {isCategorization, isControl, rankWith} from '@jsonforms/core';
import ControlRenderer from "./renderer/ControlRenderer";
import CatagorizationRenderer from "./renderer/CatagorizationRenderer";

export default [
  {
    tester: rankWith(3, isControl),
    renderer: ControlRenderer,
  }, {
    tester: rankWith(3, isCategorization),
    renderer: CatagorizationRenderer,
  },
];