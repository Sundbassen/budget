import React from 'react'
import Accordion from 'react-bootstrap/Accordion';

export default function FilterContainer({header}: {header:string}) {
  return (
    <Accordion alwaysOpen={true}>
        <Accordion.Item eventKey="1">
            <Accordion.Header>{header}</Accordion.Header>
            <Accordion.Body>
              Bananer
            </Accordion.Body>
            <Accordion.Body>
              Bananer
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>
  )
}
