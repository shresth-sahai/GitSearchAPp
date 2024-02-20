import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// loc abbreviation for list of contributors

function ListContributors() {
  const location = useLocation();
  const owner = new URLSearchParams(location.search).get("owner");
  const repo = new URLSearchParams(location.search).get("repo");
  //   console.log(owner);
  //   console.log(repo);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (owner && repo) {
      const getLOC = async () => {
        const contributors = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=45`
        );
        const locJson = await contributors.json();
        console.log(locJson);

        if (locJson) {
          setList(locJson);
          console.log(list);
        }
      };
      getLOC();
    }
  }, [list, owner, repo]);
  return (
    <>
    <center><h3>Repository : {repo} </h3>
    <h3>Owner : {owner}</h3></center>
      <table className="ui celled table">
        <thead>
          <tr>
            <th>Contributor</th>
            <th>Contributions Count</th>
           
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item.id}>
                <td>{item.login}</td>
              <td>{item.contributions}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ListContributors;
