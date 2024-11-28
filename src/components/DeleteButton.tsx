import { useTodosContext } from "../lib/hooks";

interface DeleteButtonProps {
  id: number;
}


export default function DeleteButton({ id }: DeleteButtonProps) {
  const { deleteTodo } = useTodosContext();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        deleteTodo(id);
      }}
    >
      ❌
    </button>
  );
}
