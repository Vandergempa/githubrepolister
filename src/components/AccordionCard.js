import React from "react"

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

const AccordionCard = (props) => {
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={props.eventKey}>
        <strong>{props.title}</strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={props.eventKey}>
        <Card.Body>{props.body}</Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

export default AccordionCard