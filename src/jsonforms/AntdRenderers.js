import {
  isCategorization,
  isControl,
  rankWith,
  uiTypeIs,
} from '@jsonforms/core';
import ControlRenderer from './renderer/ControlRenderer';
import CatagorizationRenderer from './renderer/CatagorizationRenderer';
import VerticalLayoutRenderer from './renderer/VerticalLayoutRenderer';
import ParagraphRenderer from './renderer/ParagraphRenderer';

export default [
  {
    tester: rankWith(3, isControl),
    renderer: ControlRenderer,
  },
  {
    tester: rankWith(3, isCategorization),
    renderer: CatagorizationRenderer,
  },
  {
    tester: rankWith(3, uiTypeIs('VerticalLayout')),
    renderer: VerticalLayoutRenderer,
  },
  {
    tester: rankWith(3, uiTypeIs('Typography')),
    renderer: ParagraphRenderer,
  },
];
