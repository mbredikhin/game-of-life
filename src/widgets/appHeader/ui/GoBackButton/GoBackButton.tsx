import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate, useNavigationType } from 'react-router-dom';

export function GoBackButton() {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  return (
    <>
      {navigationType === 'POP' ? null : (
        <button className="button button--lg" onClick={() => navigate(-1)}>
          Go back
          <ArrowUturnLeftIcon className="button__icon" />
        </button>
      )}
    </>
  );
}
