import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";
import getItems from "../utils/getItems";
import { ToastContainer, toast } from "react-toast";

export default function AllColumn() {
  const evenNumberToast = () =>
    toast("짝수 아이템은 다른 짝수 아이템 앞으로 이동할 수 없습니다.", {
      backgroundColor: "#ff4040",
      color: "#ffffff",
    });

  const itemMovementToast = () =>
    toast("첫 번째 칼럼에서 세 번째 칼럼으로는 아이템 이동이 불가능합니다.", {
      backgroundColor: "#ff4040",
      color: "#ffffff",
    });

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
      const { destination, source } = result;

      if (destination.droppableId === source.droppableId) {
        setColumns((allColum) => {
          const colmunCopy = [...allColum[source.droppableId]];
          const sourceIdNumber = parseInt(
            colmunCopy[source.index].id.split("-")[1]
          );
          const destinationIdNumber =
            sourceIdNumber < destination.index &&
            destination.index < colmunCopy.length - 1
              ? parseInt(colmunCopy[destination.index + 1].id.split("-")[1])
              : parseInt(colmunCopy[destination.index].id.split("-")[1]);

          if (sourceIdNumber % 2 === 0 && destinationIdNumber % 2 === 0) {
            evenNumberToast();
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
            itemMovementToast();
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
      <Header>
        <ProjectTitle>Front Assignment</ProjectTitle>
      </Header>
      <Board>
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
      </Board>
      <ToastContainer position="top-center" delay={3000} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: ${({ theme }) => theme.textColor};
  padding: 16px;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.headerBgColor};
  padding: 16px;
  border-radius: 10px 10px 0 0;
  margin-bottom: 16px;
`;

const ProjectTitle = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Board = styled.div`
  display: flex;
  gap: 20px;
`;
