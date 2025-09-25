import './styles/index.scss';

import { withProviders } from '@/app/providers';
import { AppRouter } from '@/app/router/AppRouter';
import { AppHeader } from '@/widgets/appHeader';
import { SettingsStorageKey } from '@/entities/settings';
import { bindStorage, setAppearance } from '@/shared/lib';
import { ToastRoot } from '@/shared/ui';

(function init() {
  const { get: getFromStorage } = bindStorage(window.localStorage);
  const isDarkMode = (getFromStorage(SettingsStorageKey.DarkMode) as boolean) ?? true;
  setAppearance(isDarkMode);
})();

function App() {
  return (
    <div className="app">
      <AppHeader />
      <AppRouter />
      <ToastRoot />
    </div>
  );
}

export default withProviders(App);
