import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

export default function Item({ item, index }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $draggingOver={snapshot.draggingOver}
        >
          {item.content}
        </Box>
      )}
    </Draggable>
  );
}

const Box = styled.div`
  user-select: none;
  padding: 16px;
  margin-bottom: 8px;
  background-color: ${({ $isDragging, $draggingOver }) =>
    $isDragging ? ($draggingOver ? "lightgreen" : "red") : "grey"};
`;
