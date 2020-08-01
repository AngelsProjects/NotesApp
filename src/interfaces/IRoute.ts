import { ComponentType } from 'react';

export interface IRoute {
  component: ComponentType;
  path     : string;
  redirect?: boolean;
  to?      : string;
}
