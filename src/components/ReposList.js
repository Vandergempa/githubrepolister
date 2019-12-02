import React, { Fragment } from "react"
import { withRouter } from 'react-router-dom'
import ProfileCard from './ProfileCard'

import ListGroup from 'react-bootstrap/ListGroup'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

export const ReposList = (props) => {
  const repos = props.location.state.repos
  const userName = props.location.state.username
  // We do this for testing purposes only:
  let fetchUserInfo = props.location.state

  const [reposList, setReposList] = React.useState(repos);
  const [userInfo, setUserInfo] = React.useState({});

  fetchUserInfo = () => {
    return fetch(`https://api.github.com/users/${userName}`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw Error(`Request rejected with status ${res.status}`);
      }
    })
      .catch(e => console.log(e))
  }

  React.useEffect(() => {
    fetchUserInfo().then((user) => setUserInfo(user))
  }, [])

  const handleInputChange = (e) => {
    const newReposList = repos.filter((repo) => {
      return repo.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setReposList(newReposList)
  }

  return (
    <Fragment>
      <header>
        <Navbar bg="light" expand="sm">
          <img className="github-icon mr-2" src="https://unicons.iconscout.com/release/v2.0.1/svg/line/github.svg" alt="Kiwi standing on oval" />
          <Navbar.Brand href="/">GitHub Repo Lister</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto">
              <FormControl
                type="text"
                placeholder="Search repositories..."
                className="mr-sm-2"
                onChange={handleInputChange}
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Breadcrumb bg="light">
          <Breadcrumb.Item active>Main</Breadcrumb.Item>
          <Breadcrumb.Item active>{userInfo.login}</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <section className="h-100 d-flex flex-column justify-content-center align-items-center mt-5 mb-5">
        <h1 className="text-center display-3 custfontfamily">{userInfo.login}'s repositories</h1>
        <div className="h-100 d-flex flex-row justify-content-center align-items-center flex-wrap">
          <ProfileCard userInfo={userInfo} />
          {reposList.length !== 0 ? <ListGroup className="col-xs-auto mt-5">
            {reposList.map((repo, index) => {
              return <ListGroup.Item
                key={index}
                action
                onClick={() => props.history.push({
                  pathname: '/repoinfo',
                  state: { details: repo }
                })}
              >
                {repo.name}
              </ListGroup.Item>
            })}
          </ListGroup> : <h5 className="mt-5"><em>No repositories found...</em></h5>}
        </div>
      </section>
    </Fragment>
  )
};

export default withRouter(ReposList);