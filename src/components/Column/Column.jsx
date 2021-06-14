import React from 'react'
import { Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';
import Item from "../../components/Item/Item"

const Col = styled.div`
background-color: 'blue'
background-color: ${props => (props.isDragging ? 'lightblue' : 'transparent')}
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
            isDraggingOver={snapshot.isDragging}
          >
            {res.map((item, index) => <Item key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </Col>
        )}
      </Droppable>
    </div>
  )
}
