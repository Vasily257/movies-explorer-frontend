import React from 'react';

import './Timeline.css';

function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline__box">
        <p className="timeline__term timeline__term_type_backend">1&nbsp;неделя</p>
        <p className="timeline__description">Back-end</p>
      </div>
      <div className="timeline__box">
        <p className="timeline__term timeline__term_type_frontend">4&nbsp;недели</p>
        <p className="timeline__description">Front-end</p>
      </div>
    </div>
  );
}

export default Timeline;
