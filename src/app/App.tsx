import './styles/index.scss';
import { AppRouter } from '@/app/router/AppRouter';
import { withProviders } from '@/app/providers';
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
