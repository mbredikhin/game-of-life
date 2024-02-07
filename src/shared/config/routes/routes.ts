import { ComponentType, PropsWithChildren } from 'react';

export enum RouteName {
  HOME_PAGE = '/',
}

export interface RouteDescription {
  path: RouteName;
  component: ComponentType;
  layout?: ComponentType<PropsWithChildren>;
}
