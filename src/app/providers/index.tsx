import compose from 'compose-function';

import { withRouter } from './withRouter';
import { TourContext, withTour } from './withTour';

const withProviders = compose(withTour, withRouter);
export { TourContext, withProviders };
