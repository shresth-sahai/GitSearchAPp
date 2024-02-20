import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Repositeries() {
  const params = useParams();
  const [search, setSearch] = useState("");

  const [repositories, setRepositories] = useState([]);
  const [orignalRepositories, setOrignalRepositories] = useState([]);

  
  const handleRepDescSort = () => {
    const alphabetDescending = [...repositories].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1
    );
    console.log(alphabetDescending);
    setRepositories(alphabetDescending);
  };
  const handleRepAscSort = () => {
    const alphabetAsccending = [...repositories].sort((a, b) =>
      a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
    );
    console.log(alphabetAsccending);
    setRepositories(alphabetAsccending);
  };
  const handleFCDescSort = () => {
    const numDescending = [...repositories].sort(
      (a, b) => b.forks_count - a.forks_count
    );
    console.log(numDescending);
    setRepositories(numDescending);
  };
  const handleFCAscSort = () => {
    const numAsccending = [...repositories].sort(
      (a, b) => a.forks_count - b.forks_count
    );
    console.log(numAsccending);
    setRepositories(numAsccending);
  };
  const handleOIDescSort = () => {
    const numDescending = [...repositories].sort(
      (a, b) => b.open_issues_count - a.open_issues_count
    );
    console.log(numDescending);
    setRepositories(numDescending);
  };
  const handleOIAscSort = () => {
    const numAsccending = [...repositories].sort(
      (a, b) => a.open_issues_count - b.open_issues_count
    );
    console.log(numAsccending);
    setRepositories(numAsccending);
  };
  const onSubmitHandler = (e) => {
    setSearch(e.target.value);
    console.log(search);
    const arraySearch = () => {
      const searchTerm = search;
      let temp = orignalRepositories;
      
     
     const result = temp.filter((value) => {

    if (typeof value === 'object' && value.name) {
    
  const searchTermRegex = new RegExp(searchTerm, "gi");
    console.log(value.name);
    console.log(value.name.match(searchTermRegex));
    return value.name.match(searchTermRegex);
  } else {
    console.error("Invalid value:", value);
    return false; 
  }
});
      console.log(result,"Hiii")
      setRepositories(result);
    };
    arraySearch();
  };
  useEffect(
    () => {
      if (params.params) {
        const repo = async () => {
          const repositories = await fetch(
            `https://api.github.com/users/${params.params}/repos?per_page=45`
          );
          const repoJson = await repositories.json();
         
           console.log(repoJson);

          if (repoJson) {
            setRepositories(repoJson);
            setOrignalRepositories(repoJson);
          }
        };
        repo();
      }
    },
    [params.params]
  );

  return (
    <>
      <div style={{ padding: 20 }}>
        <div className="ui search">
          <div className="ui icon input">
            <i className="search icon"></i>
            <input
              className="prompt"
              placeholder="search repository here..."
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>
          <button
            style={{marginLeft:"10px"}}
            className="ui primary button"
            type="submit"
            onClick={onSubmitHandler}
          >
            <i className="github icon"></i>
            Search
          </button>
        </div>
      </div>


      <table className="ui celled table">
        <thead>
          <tr>
            <th>
              Repository{" "}
              <button onClick={handleRepDescSort} className="ui icon button" >
                <i
                  className="sort alphabet up icon"
                  name="name"
                  
                ></i>
              </button>
              <button  onClick={handleRepAscSort} className="ui icon button" >
                <i
                  className="sort alphabet down icon"
                  name="name"
                ></i>
              </button>
            </th>
            <th>
              Forks{" "}
              <button className="ui icon button" onClick={handleFCDescSort} >
                <i
                  className="sort numeric up icon"
                  name="forks_count"
                  
                ></i>
              </button>
              <button className="ui icon button" onClick={handleFCAscSort} >
                <i
                  className="sort numeric down icon"
                  name="forks_count"
                ></i>
              </button>
            </th>
            <th>
              Open Issues{" "}
              <button className="ui icon button" onClick={handleOIDescSort}>
                <i
                  className="sort numeric up icon"
                  name="open_issues"
                  
                ></i>
              </button>
              <button className="ui icon button" onClick={handleOIAscSort}>
                <i
                  className="sort numeric down icon"
                  name="open_issues"
                  
                ></i>
              </button>
            </th>
            <th>Contributors</th>
            <th>Stars</th>
            <th>Commits</th>
          </tr>
        </thead>

        <tbody>
          {repositories.map((repo) => (
            <tr key={repo.name}>
              <td>
                <a
                  href={repo.html_url}
                  className="header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo.name}
                </a>
              </td>
              <td>{repo.forks_count}</td>
              <td>{repo.open_issues_count}</td>
              <td>
                <NavLink
                  to={`../../clist/?owner=${repo.owner.login}&repo=${repo.name}`}
                >
                  View
                </NavLink>
              </td>
              <td>{repo.stargazers_count}</td>
              <td>!!Feature in progress!!</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Repositeries;
