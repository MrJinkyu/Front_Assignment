import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Item from "./Item";

export default function Column({
  items,
  columnId,
  toggleSelection,
  isSelected,
}) {
  return (
    <Container>
      <Header>
        <Title>{columnId}</Title>
        <TaskCount>{items.length}</TaskCount>
      </Header>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <Board
            {...provided.droppableProps}
            ref={provided.innerRef}
            $isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item, index) => (
              <Item
                item={item}
                index={index}
                key={item.id}
                toggleSelection={toggleSelection}
                isSelected={isSelected}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.headerBgColor};
  width: 300px;
  height: 661px;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  text-transform: capitalize;
  font-size: 20px;
  white-space: nowrap;
  padding-right: 4px;
`;

const TaskCount = styled.span`
  background-color: #3a3a4c;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 16px;
`;

const Board = styled.div`
  flex-grow: 1;
  background-color: ${({ $isDraggingOver, theme }) =>
    $isDraggingOver ? theme.columnDraggingOverColor : theme.columnBgColor};
`;
