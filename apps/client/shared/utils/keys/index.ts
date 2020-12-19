import * as ApplicationUtils from '~client/application/utils';

type MoveFocusParams<E> = {
  event: React.KeyboardEvent;
  keyCode: ApplicationUtils.KeyCode.KeyCode;
  element: E;
};
/**
 * keyCodeが入力されるとelementに向けてfocusをあわせる
 */
export const moveFocus = <E extends HTMLOrSVGElement>(
  params: MoveFocusParams<E>
) => {
  if (params.event.keyCode === params.keyCode && params.element) {
    params.event.preventDefault();
    params.element.focus();
  }
};

type KeyDownHandlerParams = {
  event: React.KeyboardEvent;
  keyCode: ApplicationUtils.KeyCode.KeyCode;
  callback: () => void;
};
export const keyDownHandler = (params: KeyDownHandlerParams) => {
  params.event.keyCode === params.keyCode && params.callback();
};
