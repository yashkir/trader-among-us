import React from 'react'
import styled from 'styled-components'
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
opacity: ${props => (props.isDragging ? '.7' : '1')} ;
border-radius: 20px;
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
          <img className="Bid-image" alt="" src={`${item.img}`} />
          <div className="Bid-name-txt ">{item.name.toLowerCase()}</div>
        </Container>
      )}
    </Draggable>
  )
}
