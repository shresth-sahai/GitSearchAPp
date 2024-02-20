import React from "react";
import { NavLink } from "react-router-dom";

function DisplayCard({ data }) {
  console.log(data)
  return ( 
    <>
      <div className="ui card">
        <div className="image">
          {!data.avatar_url ? (
            " "
          ) : (
            <img
              className="ui small circular image"
              src={data.avatar_url}
              alt={data.avatar_url}
            />
          )}
        </div>
        <div className="content">
            <NavLink to={`/repos/${data.login}`}>
            {data.login}
            </NavLink>
        
          <div className="description">{data.bio}</div>
        </div>
        <div className="extra content">
          <span>{data.location}</span>
        </div>
      </div>
    </>
  );
}

export default DisplayCard;
