import { Droppable, DroppableProps } from "react-beautiful-dnd";

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  return <Droppable {...props}>{children}</Droppable>;
};
