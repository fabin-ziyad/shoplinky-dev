import React from 'react';

const SkeletonLoader = ({ width = '100%', height = '20px' }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      marginBottom: '8px',
    }}
    className="animate-pulse"
  ></div>
);

export default SkeletonLoader;
