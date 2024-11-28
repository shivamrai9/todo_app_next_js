import { useContext } from "react";
import { TodosContext, TodosContextType } from "../contexts/TodosContextProvider";

export function useTodosContext(): TodosContextType {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error(
      "TodosContext must be used within a TodosContextProvider component"
    );
  }

  return context;
}
