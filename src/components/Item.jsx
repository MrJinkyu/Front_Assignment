import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function Item({ item, index }) {
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

export default memo(Item);

const Box = styled.div`
  user-select: none;
  padding: 16px;
  margin-bottom: 8px;
  font-weight: 500;
  background-color: ${({ $isDragging, $draggingOver, theme }) =>
    $isDragging
      ? $draggingOver
        ? theme.itemDraggingOverTrue
        : theme.itemDraggingOverFalse
      : theme.itemBgColor};
  color: ${({ theme }) => theme.itemTextColor};
`;
