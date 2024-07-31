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

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }
      const { destination, source, draggableId } = result;

      if (destination.droppableId === source.droppableId) {
        setColumns((allColum) => {
          const colmunCopy = [...allColum[source.droppableId]];
          const sourceIdNumber = parseInt(
            colmunCopy[source.index].id.split("-")[1]
          );
          const destinationIdNumber =
            sourceIdNumber < destination.index &&
            destination.index + 1 < colmunCopy.length
              ? parseInt(colmunCopy[destination.index + 1].id.split("-")[1])
              : parseInt(colmunCopy[destination.index].id.split("-")[1]);
          if (sourceIdNumber % 2 === 0 && destinationIdNumber % 2 === 0) {
            return allColum;
          }

          const [removed] = colmunCopy.splice(source.index, 1);
          colmunCopy.splice(destination.index, 0, removed);
          return { ...allColum, [source.droppableId]: colmunCopy };
        });
      }

      if (destination.droppableId !== source.droppableId) {
        setColumns((allColum) => {
          if (
            source.droppableId === "first column" &&
            destination.droppableId === "third column"
          ) {
            return allColum;
          }

          const sourceColum = [...allColum[source.droppableId]];
          const destinationColum = [...allColum[destination.droppableId]];
          const [removed] = sourceColum.splice(source.index, 1);
          destinationColum.splice(destination.index, 0, removed);
          return {
            ...allColum,
            [source.droppableId]: sourceColum,
            [destination.droppableId]: destinationColum,
          };
        });
      }
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
