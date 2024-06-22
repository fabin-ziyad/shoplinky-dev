import React from "react";

const Loader = () => {
  return (
    <>
      <style jsx>{`
        .loader-container {
          position: fixed; /* Positioning relative to the viewport */
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          z-index: 1000; /* Ensure it's above other content */
          background: rgba(
            0,
            0,
            0,
            0.5
          ); /* Optional: Adds a dark semi-transparent background */
        }
        .loader {
          display: block;
          position: relative;
          height: 20px;
          width: 140px;
          background-image: linear-gradient(#fff 20px, transparent 0),
            linear-gradient(#fff 20px, transparent 0),
            linear-gradient(#fff 20px, transparent 0),
            linear-gradient(#fff 20px, transparent 0);
          background-repeat: no-repeat;
          background-size: 20px auto;
          background-position: 0 0, 40px 0, 80px 0, 120px 0;
          animation: pgfill 1s linear infinite;
        }

        @keyframes pgfill {
          0% {
            background-image: linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0);
          }
          25% {
            background-image: linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0);
          }
          50% {
            background-image: linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0);
          }
          75% {
            background-image: linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#fff 20px, transparent 0);
          }
          100% {
            background-image: linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0),
              linear-gradient(#ff3d00 20px, transparent 0);
          }
        }
      `}</style>
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    </>
  );
};

export default Loader;
