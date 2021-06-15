import React from 'react'
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
opacity: ${props => (props.isDragging ? '0.6' : '1')} ;
border-radius: 25px;
margin-bottom: 0.5rem;


`;
export default function Item({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <img className="Bid-image" src={item.img} />
          <div className="Bid-name-txt ">{item.name}</div>
        </Container>
      )}
    </Draggable>
  )
}
