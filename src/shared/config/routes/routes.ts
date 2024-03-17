import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
  HOME_PAGE = '/',
  INSTRUCTION_PAGE = '/instruction',
}

export interface RouteDescription {
  path: RouteName;
  component: ComponentType;
  layout?: ComponentType<PropsWithChildren>;
}
