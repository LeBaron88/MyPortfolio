import React from 'react';

export default ({ date, institution, logo, header, link, details }) => {
  return (
    <div className="item">
      <img
        alt={institution}
        className="ui avatar image"
        src={require(`../img/${logo}`)}
      />
      <div className="content">
        <div className="header">{header}</div>
      </div>
      <div className="content">
        <br />
        <a
          style={{ color: 'black' }}
          target="_blank"
          rel="noopener noreferrer"
          href={link}
          className="content"
        >
          {institution}
        </a>
        <p>{date}</p>
      </div>
      {details.map((details, index) => {
        return (
          <div key={index} className="content">
            <div className="ui relaxed divided list">
              <div className="item">
                <i className="small black angle double right middle aligned icon"></i>
                <div className="content">
                  <div className="description">{details}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <br />
    </div>
  );
};
