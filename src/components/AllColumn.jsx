import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import getItems from "../utils/getItems";

export default function AllColumn() {
  const initColumns = {
    "first column": getItems(10),
    "second column": [],
    "third column": [],
    "fourth column": [],
  };

  const [columns, setColumns] = useState(initColumns);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      const newItems = reorder(
        items,
        result.source.index,
        result.destination.index
      );
    },
    [columns]
  );

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.keys(columns).map((columnName) => {
          return (
            <Column
              key={columnName}
              columnId={columnName}
              items={columns[columnName]}
            />
          );
        })}
      </DragDropContext>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
