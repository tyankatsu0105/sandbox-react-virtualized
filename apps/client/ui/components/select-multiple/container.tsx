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
  onChange: ChangeHandler;
  selectedOptions: Option[];
  /**
   * ex) useState hooks setter
   */
  selectedOptionsUpdateHandler: (options: Props['selectedOptions']) => void;
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
    (params: {
      event: React.MouseEvent<HTMLDivElement, MouseEvent>;
      option: Props['options'][number];
    }) => {
      props.onChange([params.option]);

      if (
        props.selectedOptions.some(
          (selectedOption) => selectedOption.value === params.option.value
        )
      ) {
        props.selectedOptionsUpdateHandler(
          props.selectedOptions.filter(
            (selectedOption) => selectedOption.value !== params.option.value
          )
        );
      } else {
        props.selectedOptionsUpdateHandler([
          ...props.selectedOptions,
          params.option,
        ]);
      }
    },
    [props]
  );

  const handleKeyDownOptionListItem = React.useCallback(
    (params: {
      event: React.KeyboardEvent<HTMLDivElement>;
      option: Props['options'][number];
    }) => {
      Shared.Utils.Keys.moveFocus({
        event: params.event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowUp,
        element: params.event.currentTarget
          .previousElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.moveFocus({
        event: params.event,
        keyCode: ApplicationUtils.KeyCode.keyCode.ArrowDown,
        element: params.event.currentTarget
          .nextElementSibling as HTMLDivElement,
      });

      Shared.Utils.Keys.keyDownHandler({
        event: params.event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.onChange([params.option]);
          if (
            props.selectedOptions.some(
              (selectedOption) => selectedOption.value === params.option.value
            )
          ) {
            props.selectedOptionsUpdateHandler(
              props.selectedOptions.filter(
                (selectedOption) => selectedOption.value !== params.option.value
              )
            );
          } else {
            props.selectedOptionsUpdateHandler([
              ...props.selectedOptions,
              params.option,
            ]);
          }
        },
      });
    },
    [props]
  );

  const handleClickRemoveItemButton = React.useCallback(
    (params: {
      event: React.MouseEvent<HTMLButtonElement, MouseEvent>;
      option: Props['options'][number];
    }) => {
      props.selectedOptionsUpdateHandler(
        props.selectedOptions.filter(
          (selectedOption) => selectedOption.value !== params.option.value
        )
      );
    },
    [props]
  );

  const handleKeyDownRemoveItemButton = React.useCallback(
    (params: {
      event: React.KeyboardEvent<HTMLButtonElement>;
      option: Props['options'][number];
    }) => {
      Shared.Utils.Keys.keyDownHandler({
        event: params.event,
        keyCode: ApplicationUtils.KeyCode.keyCode.Enter,
        callback: () => {
          props.selectedOptionsUpdateHandler(
            props.selectedOptions.filter(
              (selectedOption) => selectedOption.value !== params.option.value
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
      selectedOptions={props.selectedOptions}
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
