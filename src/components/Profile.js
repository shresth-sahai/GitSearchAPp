import React, { useState } from "react";
import DisplayCard from "./DisplayCard";

const Profile = () => {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const onChangeHandler = e => {
    setUsername(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    const profile = await fetch(`https://api.github.com/search/users?q=${username}&per_page=12`);
    const profileJson = await profile.json();
    console.log(profileJson);

   
    if (profileJson) {
      setData(profileJson.items);
    }
  };
  return (
    <>
      <div style={{ padding: 20 }}>
        <div className="ui search">
          <div className="ui icon input"
          style={{    width: "60%",
        marginLeft:"16%" ,
        marginBottom: "20px"}} >
            <i className="search icon"></i>
            <input
              className="prompt"
              placeholder="search username here..."
              type="text"
              value={username}
              onChange={onChangeHandler}
            />
          </div>

          <button
            className="ui primary button"
            type="submit"
            style={{marginLeft:"10px"}}
            onClick={submitHandler}
          >
            <i className="github icon"></i>
            Search
          </button>
         
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            alignIitems: "center",
    justifyContent: "center"
                          }}>
            {data.map((element) => 
              <div id="flexdiv"
                style={{
                  padding: "30 px",
                  margin:"20px" ,
                  flexWrap: "wrap",
          }}>
                <DisplayCard data={element} key={element.id} />
                </div>
          )} 
         </div>
       
         
        </div>
      </div>
    </>
  );
};
export default Profile;
