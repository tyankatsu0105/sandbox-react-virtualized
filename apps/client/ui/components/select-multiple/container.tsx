import * as React from 'react';

import * as Presenter from './presenter';
import * as ApplicationUtils from '~client/application/utils';
import * as Shared from '~client/shared';

// ----------------------------------------
// types
// ----------------------------------------
export type Values = string[];
export type ChangeHandler = (values: Values) => void;

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  options: {
    value: string;
    label: string;
  }[];
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  onChange: ChangeHandler;
  values: string[];
  /**
   * ex) useState hooks setter
   */
  valuesUpdateHandler: (values: Props['values']) => void;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const { componentWrapRef, isClickOutside } = Shared.Hooks.useClickOutSide();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const menuItemRef = React.useRef<HTMLDivElement>(null);
  const controlRef = React.useRef<HTMLDivElement>(null);

  const focusOptionMenuItem = React.useCallback(() => {
    menuItemRef.current && menuItemRef.current.focus();
  }, [menuItemRef]);

  const focusControl = React.useCallback(() => {
    controlRef.current && controlRef.current.focus();
  }, [controlRef]);

  const changeOpenStatus = React.useCallback(
    (openStatus: typeof isOpen) => {
      setIsOpen(openStatus);
    },
    [setIsOpen]
  );

  const handleClickControlOpen = React.useCallback(() => {
    if (props.disabled) return;

    changeOpenStatus(true);
    focusOptionMenuItem();
  }, [changeOpenStatus, focusOptionMenuItem, props.disabled]);
  const handleClickControlClose = React.useCallback(() => {
    changeOpenStatus(false);
  }, [changeOpenStatus]);

  const handleKeyDownControlOpen = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (props.disabled) return;
      if (event.keyCode === ApplicationUtils.KeyCode.keyCode.Enter) {
        changeOpenStatus(true);
        focusOptionMenuItem();
      }
    },
    [changeOpenStatus, focusOptionMenuItem, props.disabled]
  );
  const handleKeyDownControlClose = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === ApplicationUtils.KeyCode.keyCode.Enter) {
        changeOpenStatus(false);
        focusControl();
      }
    },
    [changeOpenStatus, focusControl]
  );

  const handleClickOptionListItem = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      props.onChange([event.currentTarget.dataset.value]);
      if (props.values.includes(event.currentTarget.dataset.value)) {
        props.valuesUpdateHandler(
          props.values.filter(
            (value) => value !== event.currentTarget.dataset.value
          )
        );
      } else {
        props.valuesUpdateHandler([
          ...props.values,
          event.currentTarget.dataset.value,
        ]);
      }
    },
    [props]
  );

  const handleKeyDownOptionListItem = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      Shared.Utils.Keys.moveFocus({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowUp,
        element: event.currentTarget.previousElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.moveFocus({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowDown,
        element: event.currentTarget.nextElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.onChange([event.currentTarget.dataset.value]);
          if (props.values.includes(event.currentTarget.dataset.value)) {
            props.valuesUpdateHandler(
              props.values.filter(
                (value) => value !== event.currentTarget.dataset.value
              )
            );
          } else {
            props.valuesUpdateHandler([
              ...props.values,
              event.currentTarget.dataset.value,
            ]);
          }
        },
      });
    },
    [props]
  );

  const handleClickRemoveItemButton = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      props.valuesUpdateHandler(
        props.values.filter(
          (value) => value !== event.currentTarget.dataset.value
        )
      );
    },
    [props]
  );

  const handleKeyDownRemoveItemButton = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.valuesUpdateHandler(
            props.values.filter(
              (value) => value !== event.currentTarget.dataset.value
            )
          );
        },
      });
    },
    [props]
  );

  React.useEffect(() => props.disabled && changeOpenStatus(false), [
    props.disabled,
    changeOpenStatus,
  ]);

  React.useEffect(() => isClickOutside && setIsOpen(false), [
    isClickOutside,
    setIsOpen,
  ]);

  return (
    <Presenter.Component
      options={props.options}
      errorMessage={props.errorMessage}
      isError={props.isError}
      disabled={props.disabled}
      isOpen={isOpen}
      handleClickControlOpen={handleClickControlOpen}
      handleClickControlClose={handleClickControlClose}
      handleKeyDownControlOpen={handleKeyDownControlOpen}
      handleKeyDownControlClose={handleKeyDownControlClose}
      values={props.values}
      handleClickOptionListItem={handleClickOptionListItem}
      handleKeyDownOptionListItem={handleKeyDownOptionListItem}
      menuItemRef={menuItemRef}
      controlRef={controlRef}
      inputProps={props.inputProps}
      componentWrapRef={componentWrapRef}
      handleClickRemoveItemButton={handleClickRemoveItemButton}
      handleKeyDownRemoveItemButton={handleKeyDownRemoveItemButton}
    />
  );
};
