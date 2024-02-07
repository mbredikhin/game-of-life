import { HomePage } from '@/pages/home';
import { Route, Routes } from 'react-router-dom';
import { RouteName } from '@/shared/config';
import type { RouteDescription } from '@/shared/config';

const routes: RouteDescription[] = [
  {
    path: RouteName.HOME_PAGE,
    component: HomePage,
  },
];

const routesContent = routes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
));

export function AppRouter() {
  return <Routes>{routesContent}</Routes>;
}
