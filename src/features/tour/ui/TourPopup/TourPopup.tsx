import classnames from 'classnames/bind';
import { useContext } from 'react';

import { TourContext } from '@/app/providers';
import { Popup } from '@/shared/ui';

import { TourStepID } from '../../model';
import styles from './TourPopup.module.scss';
const cx = classnames.bind(styles);

interface TourPopupProps {
  stepID: TourStepID;
  children: JSX.Element;
}

export function TourPopup({ stepID, children }: TourPopupProps) {
  const tour = useContext(TourContext);

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
      show={tour.step?.id === stepID}
      title={tour.step?.title}
      body={tour.step?.text.join('\n')}
      footer={footer}
    >
      {children}
    </Popup>
  );
}
