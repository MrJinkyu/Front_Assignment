import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Item from "./Item";

export default function Column({ items, columnId }) {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <Board
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {items.map((item, index) => (
            <Item item={item} index={index} key={item.id} />
          ))}
          {provided.placeholder}
        </Board>
      )}
    </Droppable>
  );
}

const Board = styled.div``;

const GRID = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: GRID,
  width: 250,
});
