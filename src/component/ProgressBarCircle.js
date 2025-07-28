import React from 'react';
import './Progress.css';

const ProgressBarCircle = ({
  percentage = 0, 
  size = 200,   
  strokeWidth = 10,
  color = '#20C4AA',
  trackColor = '#3B475D',
  mainText = '',
  subText = ''
}) => {
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const radialGradientRadius = (size / 2) - strokeWidth;

  return (
    <div
      className="progress-circle-container" // Main container for the circular bar
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(closest-side, var(--back) 0, var(--back) ${radialGradientRadius}px, transparent ${radialGradientRadius}px, transparent 100%),
                     conic-gradient(${color} ${clampedPercentage}%, ${trackColor} ${clampedPercentage}%)`,
        '--inner-bg-color': '#212B3B',
      }}
    >
      <div className="progress-circle-inner-content">
        <span className="progress-circle-main-text">{mainText}</span>
        {subText && <span className="progress-circle-sub-text">{subText}</span>}
      </div>
    </div>
  );
};

export default ProgressBarCircle;