import React from 'react';

export default ({ pageTitle, description }) => {
  return (
    <div className="pageTitle">
      <div className="contentTitle">
        {pageTitle}
        <br />
        <div className="ui pointing blue basic label">{description}</div>
      </div>
    </div>
  );
};
