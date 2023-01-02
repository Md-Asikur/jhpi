// import React from 'react'
// import "./Top.css"
// export default function Top() {
//   return (
//       <div className='top'>
//           <div className='top-text'>
//             <h1>About Us</h1>
//           </div>
//      </div>
//   )
// }
import "./Top.css";
const Top = ({ title }) => {
  return (
    <div className="top">
      <div className="top-text">
              <h1>{title}</h1>
      </div>
    </div>
  );
};

export default Top;