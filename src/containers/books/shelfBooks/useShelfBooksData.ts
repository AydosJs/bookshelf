import { useMutation, useQuery, useQueryClient } from "react-query";
import { createBook, deleteBook, getBooks } from "../../../api/BooksAPI";
import { BookWithStatus } from "../../../types/common";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/auth";
import toast from "react-hot-toast";

export function useShelfBooksData() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.message);
    }
  };

  const {
    data: shelfBooks,
    isError,
    isLoading: isBooksLoading,
  } = useQuery<BookWithStatus[] | undefined>("bookshelf", () => getBooks());

  if ((isError as unknown as AxiosError)?.response?.status === 401) {
    dispatch(logOut());
  }

  const deleteBookMutation = useMutation(deleteBook, {
    onSuccess: (newData) => {
      queryClient.setQueryData("bookshelf", newData);
      toast.success("Book has been successfully deleted!");
    },
    onError: handleError,
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you absolutely certain about deleting this book?")) {
      deleteBookMutation.mutate(id);
    }
  };

  const createMutation = useMutation(createBook, {
    onSuccess: () => {
      queryClient.invalidateQueries("bookshelf");
      toast.success("Book successfully CREATED");
    },
    onError: handleError,
  });

  return {
    shelfBooks,
    isLoading: isBooksLoading,
    handleDelete,
    isDeleteBookLoading: deleteBookMutation.isLoading,
    createBookMutation: createMutation,
  };
}
