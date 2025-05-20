import './styles/index.scss';

import { withProviders } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { AppHeader } from '@/widgets/appHeader';
import { useEffect } from 'react';
import { useAppearance } from '@/entities/settings';

function App() {
  const { initAppearance } = useAppearance();

  useEffect(() => {
    initAppearance();
  }, []);

  return (
    <div className="app">
      <AppHeader />
      <AppRouter />
    </div>
  );
}

export default withProviders(App);
