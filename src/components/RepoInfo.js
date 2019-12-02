import React, { Fragment } from "react"
import AccordionCard from './AccordionCard'

import Navbar from 'react-bootstrap/Navbar'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Accordion from 'react-bootstrap/Accordion'

const RepoInfo = (props) => {
  const repoDetails = props.location.state.details
  return (
    <Fragment>
      <header>
        <Navbar bg="light" expand="sm">
          <img className="github-icon mr-2" src="https://unicons.iconscout.com/release/v2.0.1/svg/line/github.svg" alt="Kiwi standing on oval" />
          <Navbar.Brand href="/">GitHub Repo Lister</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="cursor-pointer" onClick={() => window.history.back()}>
              Back
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Breadcrumb bg="light">
          <Breadcrumb.Item active>Main</Breadcrumb.Item>
          <Breadcrumb.Item active>{repoDetails.owner.login}</Breadcrumb.Item>
          <Breadcrumb.Item active>{repoDetails.name}</Breadcrumb.Item>
        </Breadcrumb>
      </header>
      <section className="w-100">
        <h1 className="text-center mb-5 mt-5 display-3 custfontfamily">{repoDetails.name}</h1>
        <Accordion className="mb-2 cursor-pointer col-6 mr-auto ml-auto" defaultActiveKey="0">
          <AccordionCard eventKey="0" title="Description" body={repoDetails.description} />
          <AccordionCard eventKey="1" title="Repo URL" body={<a href={repoDetails.html_url}>{repoDetails.html_url}</a>} />
          <AccordionCard eventKey="2" title="Homepage" body={<a href={repoDetails.homepage}>{repoDetails.homepage}</a>} />
          <AccordionCard eventKey="3" title="Created At" body={repoDetails.created_at} />
          <AccordionCard eventKey="4" title="Updated At" body={repoDetails.updated_at} />
          <AccordionCard eventKey="5" title="Clone URL - SSH" body={repoDetails.ssh_url} />
          <AccordionCard eventKey="6" title="Main language" body={repoDetails.language} />
          <AccordionCard eventKey="7" title="Fork count" body={repoDetails.forks} />
          <AccordionCard eventKey="8" title="Watchers count" body={repoDetails.watchers} />
        </Accordion>
      </section>
    </Fragment>
  )
}

export default RepoInfo