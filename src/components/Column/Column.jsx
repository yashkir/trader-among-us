import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import Item from "../../components/Item/Item"
import styled from 'styled-components'

const Col = styled.div`

height: 100%;
background-color: ${props => (props.isDraggingOver ? 'rgba(42, 195, 73, 0.1)' : 'transparent')} ;
padding: .5rem;
border-radius: 20px
margin: .5rem;
`;
export default function Column({ res, column }) {


  return (
    <div className="Bid-flex-row">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <Col
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {res.map((item, index) => <Item key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </Col>
        )}
      </Droppable>
    </div>
  )
}
