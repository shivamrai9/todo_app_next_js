import { createContext, useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export interface TodosContextType {
  todos: Todo[];
  isLoading: boolean;
  totalCount: number;
  completedCount: number;
  addTodo: (content: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

export const TodosContext = createContext<TodosContextType | null>(null);

export default function TodosContextProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useKindeAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const addTodo = (content: string) => {
    if (todos.length >= 3 && !isAuthenticated) {
      alert("To add more todos, please log in.");
      return;
    }

    setTodos([
      ...todos,
      { id: todos.length + 1, text: content, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const todos = [
        { id: 1, text: "buy groceries", completed: false },
        { id: 2, text: "walk the dog", completed: false },
        { id: 3, text: "do laundry", completed: false },
      ];

      setTodos(todos);
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, isLoading, totalCount, completedCount, addTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
}
