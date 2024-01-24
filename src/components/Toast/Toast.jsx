// Toast.jsx
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Toast.scss';
import { toastDuration } from '../../constants/GlobalConstants';

const Toast = ({
  message,
  duration = toastDuration,
  position = 'bottomRight',
  backgroundColor = '#333',
  textColor = '#fff',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const handleToastClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`toast ${position} ${isVisible ? 'show' : 'hide'}`}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="toast-message">{message}</div>
      <div className="loading-bar" style={{ animationDuration: `${duration / 1000}s` }}></div>
      <button className="close-btn" onClick={handleToastClose}>
        &#x2716;
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  position: PropTypes.oneOf([
    'bottomLeft',
    'bottomRight',
    'topRight',
    'topLeft',
    'centerTop',
    'centerBottom',
    'left',
    'right',
  ]),
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Toast;
