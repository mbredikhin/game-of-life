import { Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages/home';
import { InstructionPage } from '@/pages/instruction';
import type { RouteDescription } from '@/shared/config';
import { RouteName } from '@/shared/config';

const routes: RouteDescription[] = [
  {
    path: RouteName.HOME_PAGE,
    component: HomePage,
  },
  {
    path: RouteName.INSTRUCTION_PAGE,
    component: InstructionPage,
  },
];

const routesContent = routes.map(({ path, component: Component }) => (
  <Route key={path} path={path} element={<Component />} />
));

export function AppRouter() {
  return <Routes>{routesContent}</Routes>;
}
