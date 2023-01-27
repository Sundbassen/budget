import React from 'react'
import Accordion from 'react-bootstrap/Accordion';


export default function gridElement() {
  return (
    <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
            <Accordion.Header>Filters</Accordion.Header>
        </Accordion.Item>
    </Accordion>
  )
}
