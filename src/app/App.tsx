import './styles/index.scss';

import { useEffect } from 'react';

import { withProviders } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { updateDarkModeSettings } from '@/entities/settings';
import { useAppDispatch } from '@/shared/hooks';
import { AppHeader } from '@/widgets/appHeader';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      document.documentElement.dataset.theme = 'light';
      dispatch(updateDarkModeSettings(false));
    }
  });

  return (
    <>
      <AppHeader />
      <AppRouter />
    </>
  );
}

export default withProviders(App);
