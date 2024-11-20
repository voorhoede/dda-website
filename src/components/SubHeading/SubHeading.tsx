import type { ReactNode } from 'react';
import './SubHeading.css';

interface Props {
  children: ReactNode;
}

export const SubHeading = ({ children }: Props) => { 
  return <p className='sub-heading'>{children}</p>;
};
