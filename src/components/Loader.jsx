import React from "react"

const Loader = () => (
  <div className="flex justify-center items-center h-64">
    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-16 w-16"></div>
    <style jsx>{`
      .loader {
        border-top-color: #1f1f1f;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `}</style>
  </div>
)

export default Loader
