import React from 'react';
import { Button, ButtonProps } from '@mantine/core';

/**
 * Extended Mantine Button with some defaults set
 */
const CtdGenButton = (props: IProps): JSX.Element => {
  const color = props.color || 'orange';
  const variant = props.variant || 'light';
  return (
    <Button color={color} variant={variant} {...props}>
      {props.children}
    </Button>
  );
};

export default CtdGenButton;

interface IProps extends ButtonProps<React.ElementType> {
  children: React.ReactNode;
}
