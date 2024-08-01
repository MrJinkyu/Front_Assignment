import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

function Item({ item, index, toggleSelection, isSelected }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <Card
          onClick={() => toggleSelection(item.id)}
          $isSelected={isSelected(item.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          $isDragging={snapshot.isDragging}
          $draggingOver={snapshot.draggingOver}
        >
          <TaskTitle>{item.content}</TaskTitle>
        </Card>
      )}
    </Draggable>
  );
}

export default memo(Item);

const Card = styled.div`
  user-select: none;
  padding: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ $isDragging, $draggingOver, $isSelected, theme }) =>
    $isDragging
      ? $draggingOver
        ? theme.itemDraggingOverTrue
        : theme.itemDraggingOverFalse
      : $isSelected
      ? theme.itemSelected
      : theme.itemBgColor};
`;

const TaskTitle = styled.h4`
  font-size: 16px;
`;
