import classnames from 'classnames/bind';
import { useContext } from 'react';

import { TourContext } from '@/app/providers';
import { Popup } from '@/shared/ui';

import { buttons, TourStepID } from '../../model';
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
  const visible = !!isHomePage && tour.step?.id === stepID;

  const footer = (
    <div className={cx(['tour-popup__footer'])}>
      {tour.step?.buttons?.map((buttonType) => (
        <button
          className="button button--sm"
          key={buttonType}
          onClick={() => tour.onButtonClick(buttonType, tour.step!)}
        >
          {buttons[buttonType].text}
        </button>
      ))}
    </div>
  );

  return (
    <Popup
      withBackdrop
      visible={visible}
      title={tour.step?.title}
      body={tour.step?.text?.join('\n')}
      footer={footer}
      position={tour.step?.position ?? 'bottom'}
    >
      {children}
    </Popup>
  );
}
