import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Item from "./Item";

export default function Column({ items, columnId }) {
  return (
    <Container>
      <Title>{columnId}</Title>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Board
            {...provided.droppableProps}
            ref={provided.innerRef}
            bgColor={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              <Item item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Container>
  );
}

const Container = styled.div`
  width: 250px;
  height: 655px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-transform: capitalize;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Board = styled.div`
  padding: 8px;
  flex-grow: 1;
  background: ${({ bgColor }) => (bgColor ? "lightblue" : "lightgrey")};
`;
