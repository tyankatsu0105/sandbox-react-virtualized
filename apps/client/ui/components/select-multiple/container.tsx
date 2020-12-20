import * as React from 'react';

import * as Presenter from './presenter';
import * as ApplicationUtils from '~client/application/utils';
import * as Shared from '~client/shared';

// ----------------------------------------
// types
// ----------------------------------------
export type Option = {
  value: string;
  label: string;
};
export type ChangeHandler = (options: Option[]) => void;

// ----------------------------------------
// props
// ----------------------------------------
type Props = {
  /**
   * props to input element
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;

  /**
   * options
   * @example options = [{label: 'label-1', value: '1'}]
   */
  options: Option[];

  /**
   * Error message when isError is true
   */
  errorMessage?: string;
  isError?: boolean;
  disabled?: boolean;
  /**
   * Handler for selecting option item
   */
  onChange: ChangeHandler;

  /**
   * Handler for Removing selected option item
   */
  onChangeRemove: ChangeHandler;
};

// ----------------------------------------
// component
// ----------------------------------------

export const Component: React.VFC<Props> = (props) => {
  const { componentWrapRef, isClickOutside } = Shared.Hooks.useClickOutSide();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = React.useState<
    Map<string, Option>
  >(new Map());

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
      if (event.key === ApplicationUtils.Key.key.Enter) {
        changeOpenStatus(true);
        focusOptionMenuItem();
      }
    },
    [changeOpenStatus, focusOptionMenuItem, props.disabled]
  );
  const handleKeyDownControlClose = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === ApplicationUtils.Key.key.Enter) {
        changeOpenStatus(false);
        focusControl();
      }
    },
    [changeOpenStatus, focusControl]
  );

  const handleClickOptionListItem = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const option = JSON.parse(event.currentTarget.dataset.option) as Option;

      props.onChange([option]);
      if (selectedOptions.has(option.value)) {
        setSelectedOptions((prev) => {
          prev.delete(option.value);
          return prev;
        });
      } else {
        setSelectedOptions((prev) => {
          prev.set(option.value, option);
          return prev;
        });
      }
    },
    [props, selectedOptions, setSelectedOptions]
  );

  const handleKeyDownOptionListItem = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const option = JSON.parse(event.currentTarget.dataset.option) as Option;

      Shared.Utils.Keys.moveFocus({
        event,
        key: ApplicationUtils.Key.key.ArrowUp,
        element: event.currentTarget.previousElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.moveFocus({
        event,
        key: ApplicationUtils.Key.key.ArrowDown,
        element: event.currentTarget.nextElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.keyDownHandler({
        event,
        key: ApplicationUtils.Key.key.Enter,
        callback: () => {
          props.onChange([option]);
          if (selectedOptions.has(option.value)) {
            setSelectedOptions((prev) => {
              prev.delete(option.value);
              return prev;
            });
          } else {
            setSelectedOptions((prev) => {
              prev.set(option.value, option);
              return prev;
            });
          }
        },
      });
    },
    [props, selectedOptions, setSelectedOptions]
  );

  const handleClickRemoveItemButton = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const option = JSON.parse(event.currentTarget.dataset.option) as Option;

      props.onChangeRemove([option]);
      setSelectedOptions((prev) => {
        prev.delete(option.value);
        return prev;
      });
    },
    [props]
  );

  const handleKeyDownRemoveItemButton = React.useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      const option = JSON.parse(event.currentTarget.dataset.option) as Option;

      Shared.Utils.Keys.keyDownHandler({
        event: event,
        key: ApplicationUtils.Key.key.Enter,
        callback: () => {
          props.onChangeRemove([option]);
          setSelectedOptions((prev) => {
            prev.delete(option.value);
            return prev;
          });
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

  const handleKeyDownEscape = React.useCallback(
    (event: KeyboardEvent) => {
      if (isOpen && event.key === ApplicationUtils.Key.key.Escape) {
        setIsOpen(false);
        focusControl();
      }
    },
    [isOpen, focusControl]
  );

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDownEscape, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDownEscape, true);
    };
  }, [handleKeyDownEscape]);

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
      selectedOptions={selectedOptions}
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
