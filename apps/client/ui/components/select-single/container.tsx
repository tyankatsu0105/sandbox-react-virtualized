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
  options: {
    value: string;
    label: string;
  }[];
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  onChange: ChangeHandler;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<Values>([]);
  const menuItemRef = React.useRef<HTMLLIElement>(null);
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
    (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
      props.onChange([event.currentTarget.dataset.value]);
      setValues([event.currentTarget.dataset.value]);
      changeOpenStatus(false);
    },
    [setValues, changeOpenStatus, props]
  );

  const handleKeyDownOptionListItem = React.useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      Shared.Utils.Keys.moveFocus({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowUp,
        element: event.currentTarget.previousElementSibling as HTMLLIElement,
      });

      Shared.Utils.Keys.moveFocus({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowDown,
        element: event.currentTarget.nextElementSibling as HTMLLIElement,
      });

      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.onChange([event.currentTarget.dataset.value]);
          setValues([event.currentTarget.dataset.value]);
          changeOpenStatus(false);
          focusControl();
        },
      });
    },
    [setValues, changeOpenStatus, focusControl, props]
  );

  const handleClickResetValue = React.useCallback(() => {
    props.onChange([]);
    setValues([]);
  }, [setValues, props]);

  const handleEnterResetValue = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.onChange([]);
          setValues([]);
        },
      });
    },
    [setValues, props]
  );

  React.useEffect(() => props.disabled && changeOpenStatus(false), [
    props.disabled,
    changeOpenStatus,
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
      values={values}
      handleClickOptionListItem={handleClickOptionListItem}
      handleKeyDownOptionListItem={handleKeyDownOptionListItem}
      handleClickResetValue={handleClickResetValue}
      handleEnterResetValue={handleEnterResetValue}
      menuItemRef={menuItemRef}
      controlRef={controlRef}
    />
  );
};
