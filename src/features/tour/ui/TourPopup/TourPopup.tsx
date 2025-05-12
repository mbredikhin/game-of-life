import classnames from 'classnames/bind';
import { useContext } from 'react';

import { TourContext } from '@/app/providers';
import { Popup } from '@/shared/ui';

import { TourStepID } from '../../model';
import styles from './TourPopup.module.scss';
import { useMatch } from 'react-router-dom';
import { RouteName } from '@/shared/config';
const cx = classnames.bind(styles);

interface TourPopupProps {
  stepID: TourStepID;
  children: React.ReactNode;
}

export function TourPopup({ stepID, children }: TourPopupProps) {
  const tour = useContext(TourContext);
  const isHomePage = useMatch(RouteName.HOME_PAGE);
  const tourVisible = !!isHomePage;

  const footer = (
    <div className={cx(['tour-popup__footer'])}>
      {tour.step?.buttons?.map((button) => (
        <button
          className="button button--sm"
          key={button.type}
          onClick={() => tour.onButtonClick(button.type, tour.step!)}
        >
          {button.text}
        </button>
      ))}
    </div>
  );

  return (
    <Popup
      show={tourVisible && tour.step?.id === stepID}
      title={tour.step?.title}
      body={tour.step?.text?.join('\n')}
      footer={footer}
      position={tour.step?.position ?? 'bottom'}
    >
      {children}
    </Popup>
  );
}
