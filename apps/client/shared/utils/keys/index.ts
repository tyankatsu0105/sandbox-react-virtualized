import * as ApplicationUtils from '~client/application/utils';

type MoveFocusParams<E> = {
  event: React.KeyboardEvent;
  key: ApplicationUtils.Key.Key;
  element: E;
};
/**
 * keyCodeが入力されるとelementに向けてfocusをあわせる
 */
export const moveFocus = <E extends HTMLOrSVGElement>(
  params: MoveFocusParams<E>
) => {
  if (params.event.key === params.key && params.element) {
    params.event.preventDefault();
    params.element.focus();
  }
};

type KeyDownHandlerParams = {
  event: React.KeyboardEvent;
  key: ApplicationUtils.Key.Key;
  callback: () => void;
};
export const keyDownHandler = (params: KeyDownHandlerParams) => {
  params.event.key === params.key && params.callback();
};
