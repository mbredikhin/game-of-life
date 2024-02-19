import './styles/index.scss';

import { withProviders } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { AppHeader } from '@/widgets/appHeader';

function App() {
  return (
    <>
      <AppHeader />
      <AppRouter />
    </>
  );
}

export default withProviders(App);
