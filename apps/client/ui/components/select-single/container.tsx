import * as React from 'react';

import * as Presenter from './presenter';
import * as ApplicationUtils from '~client/application/utils';

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

  const handleClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleClickControlOpen = React.useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);
  const handleClickControlClose = React.useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleKeyDownControlOpen = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      event.keyCode === ApplicationUtils.KeyCode.space && setIsOpen(true);
    },
    [setIsOpen]
  );
  const handleKeyDownControlClose = React.useCallback(
    (event: React.KeyboardEvent<HTMLLIElement>) => {
      event.keyCode === ApplicationUtils.KeyCode.returnAndEnter &&
        setIsOpen(false);
    },
    [setIsOpen]
  );
  return (
    <Presenter.Component
      options={props.options}
      isOpen={isOpen}
      handleClose={handleClose}
      handleClickControlOpen={handleClickControlOpen}
      handleClickControlClose={handleClickControlClose}
      handleKeyDownControlOpen={handleKeyDownControlOpen}
      handleKeyDownControlClose={handleKeyDownControlClose}
    />
  );
};
