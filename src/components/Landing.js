import React, { Fragment } from "react"
import { withRouter } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

export const Landing = (props) => {
  const [userName, setUsername] = React.useState(props.username);
  const [show, setShow] = React.useState(false);

  const renderModal = () => {
    return (
      <Fragment>
        <Modal show={show} onHide={() => setShow(false)} className="d-flex align-items-center justify-content-center">
          <Modal.Header closeButton>
            <Modal.Title>Ooopps</Modal.Title>
          </Modal.Header>
          <Modal.Body>You must enter a valid username!</Modal.Body>
        </Modal>
      </Fragment>
    )
  }

  const handleInputChange = (e) => {
    setUsername(e.target.value)
  }

  const handleButtonClick = () => {
    return fetch(`https://api.github.com/users/${userName}/repos`, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      if (res.ok) {
        return res.json();
      } else {
        setShow(true)
        throw Error(`Request rejected with status ${res.status}`);
      }
    }).then(repos => {
      if (!userName) {
        setShow(true)
      } else if (userName && repos !== undefined) {
        props.history.push({
          pathname: '/reposlist',
          state: { repos: repos, username: userName }
        })
      }
    })
      .catch(e => console.log(e))
  }


  return (
    <section className="d-flex flex-column bgimage position-fixed">
      <div className="d-flex flex-column mt-auto mb-5">
        {renderModal()}
        <h1 className="text-center text-white display-3 custfontfamily">Github repo lister</h1>
        <InputGroup className="justify-content-center mt-5" size="lg">
          <InputGroup.Prepend>
            <InputGroup.Text id="btnGroupAddon">@</InputGroup.Text>
          </InputGroup.Prepend>
          <Col xs="auto" className="pl-0">
            <FormControl
              type="text"
              placeholder="Type Github username"
              aria-label="Type Github username"
              aria-describedby="btnGroupAddon"
              onChange={handleInputChange}
              size="lg"
            />
          </Col>
          <Button
            className="justify-content-center shadow-none ml-2 mr-3"
            onClick={handleButtonClick}
            size="lg"
            variant="light">
            Find & List
            </Button>
        </InputGroup>
      </div>
    </section>
  )
};

export default withRouter(Landing);
