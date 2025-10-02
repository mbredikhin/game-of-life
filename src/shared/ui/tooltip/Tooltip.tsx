import classnames from 'classnames/bind';
import {
  cloneElement,
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { useDebounce } from '@/shared/hooks';
import { RelativePosition } from '@/shared/lib';

import styles from './Tooltip.module.scss';
const cx = classnames.bind(styles);

const TOOLTIP_OPEN_DELAY = 250;
const TOOLTIP_HIDE_DELAY = 100;
const TOOLTIP_OFFSET = 8;

interface TooltipProps {
  content: JSX.Element | string;
  activator: JSX.Element;
  position?: Extract<RelativePosition, 'top' | 'right' | 'bottom' | 'left'>;
}

interface TooltipPosition {
  top: number;
  left: number;
}

export function Tooltip({ content, activator, position = 'top' }: TooltipProps) {
  const [contentVisible, setContentVisible] = useState(false);
  const [isActivatorHover, setIsActivatorHover] = useState(false);
  const [isTooltipHover, setIsTooltipHover] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
  });
  const activatorRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const onActivatorHover = useDebounce(() => setContentVisible(true), TOOLTIP_OPEN_DELAY);

  const hideTooltip = useDebounce(() => setContentVisible(false), TOOLTIP_HIDE_DELAY);

  const { onMouseEnter: activatorMouseEnter, onMouseLeave: activatorMouseLeave } =
    (activator.props ?? {}) as {
      onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
      onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
    };

  const onActivatorMouseEnter = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      activatorMouseEnter?.(event);
      setIsActivatorHover(true);
      hideTooltip?.clear?.();
      onActivatorHover();
    },
    [activatorMouseEnter, hideTooltip, onActivatorHover],
  );

  const onActivatorMouseLeave = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      activatorMouseLeave?.(event);
      setIsActivatorHover(false);
      if (!isTooltipHover) {
        onActivatorHover?.clear?.();
        hideTooltip();
      }
    },
    [activatorMouseLeave, hideTooltip, isTooltipHover, onActivatorHover],
  );

  const onContentMouseEnter = useCallback(() => {
    setIsTooltipHover(true);
    hideTooltip?.clear?.();
    setContentVisible(true);
  }, [hideTooltip]);

  const onContentMouseLeave = useCallback(() => {
    setIsTooltipHover(false);
    if (!isActivatorHover) {
      onActivatorHover?.clear?.();
      hideTooltip();
    }
  }, [hideTooltip, isActivatorHover, onActivatorHover]);

  const updateTooltipPosition = useCallback(() => {
    const activatorElement = activatorRef.current;
    const contentElement = contentRef.current;

    if (!activatorElement || !contentElement) {
      return;
    }

    const activatorRect = activatorElement.getBoundingClientRect();
    const tooltipRect = contentElement.getBoundingClientRect();

    const positions: Record<typeof position, TooltipPosition> = {
      top: {
        top: activatorRect.top - tooltipRect.height - TOOLTIP_OFFSET,
        left: activatorRect.left + activatorRect.width / 2 - tooltipRect.width / 2,
      },
      right: {
        top: activatorRect.top + activatorRect.height / 2 - tooltipRect.height / 2,
        left: activatorRect.right + TOOLTIP_OFFSET,
      },
      bottom: {
        top: activatorRect.bottom + TOOLTIP_OFFSET,
        left: activatorRect.left + activatorRect.width / 2 - tooltipRect.width / 2,
      },
      left: {
        top: activatorRect.top + activatorRect.height / 2 - tooltipRect.height / 2,
        left: activatorRect.left - tooltipRect.width - TOOLTIP_OFFSET,
      },
    };

    setTooltipPosition(positions[position]);
  }, [position]);

  useLayoutEffect(() => {
    if (!contentVisible) {
      return;
    }
    updateTooltipPosition();
  }, [contentVisible, updateTooltipPosition, content]);

  useEffect(() => {
    if (!contentVisible) {
      return;
    }
    window.addEventListener('scroll', updateTooltipPosition, true);
    window.addEventListener('resize', updateTooltipPosition);

    return () => {
      window.removeEventListener('scroll', updateTooltipPosition, true);
      window.removeEventListener('resize', updateTooltipPosition);
    };
  }, [contentVisible, updateTooltipPosition]);

  return (
    <>
      {cloneElement(activator, {
        ref: activatorRef,
        onMouseEnter: onActivatorMouseEnter,
        onMouseLeave: onActivatorMouseLeave,
      })}
      {contentVisible
        ? createPortal(
            <div
              ref={contentRef}
              className={cx(['tooltip', `tooltip--${position}`])}
              style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
              onMouseEnter={onContentMouseEnter}
              onMouseLeave={onContentMouseLeave}
            >
              {content}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
