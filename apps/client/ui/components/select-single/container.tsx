import * as React from 'react';

import * as Presenter from './presenter';
import * as ApplicationUtils from '~client/application/utils';
import * as Shared from '~client/shared';

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  options: {
    value: string;
    label: string;
  }[];
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [values, setValues] = React.useState<string[]>([]);
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
    changeOpenStatus(true);
    focusOptionMenuItem();
  }, [changeOpenStatus, focusOptionMenuItem]);
  const handleClickControlClose = React.useCallback(() => {
    changeOpenStatus(false);
  }, [changeOpenStatus]);

  const handleKeyDownControlOpen = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.keyCode === ApplicationUtils.KeyCode.keyCode.Enter) {
        changeOpenStatus(true);
        focusOptionMenuItem();
      }
    },
    [changeOpenStatus, focusOptionMenuItem]
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
      setValues([event.currentTarget.dataset.value]);
      changeOpenStatus(false);
    },
    [setValues, changeOpenStatus]
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
          setValues([event.currentTarget.dataset.value]);
          changeOpenStatus(false);
          focusControl();
        },
      });
    },
    [setValues, changeOpenStatus, focusControl]
  );

  const handleClickResetValue = React.useCallback(() => {
    setValues([]);
  }, [setValues]);

  const handleEnterResetValue = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      Shared.Utils.Keys.keyDownHandler({
        event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          setValues([]);
        },
      });
    },
    [setValues]
  );

  return (
    <Presenter.Component
      options={props.options}
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
