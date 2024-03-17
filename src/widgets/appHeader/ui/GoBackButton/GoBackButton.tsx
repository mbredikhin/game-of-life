import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export function GoBackButton() {
  const navigate = useNavigate();

  return (
    <button className="button" onClick={() => navigate(-1)}>
      Go back
      <ArrowUturnLeftIcon className="button__icon" />
    </button>
  );
}
