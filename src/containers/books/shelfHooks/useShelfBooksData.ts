import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteBook, getBooks } from "../../../api/BooksAPI";
import { BookWithStatus } from "../../../types/common";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { logOut } from "../../../store/auth";
import toast from "react-hot-toast";

export function useShelfBooksData() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isError,
    isLoading: isBooksLoading,
  } = useQuery<BookWithStatus[] | undefined>("bookshelf", () => getBooks());
  const dispatch = useDispatch();

  if ((isError as unknown as AxiosError)?.response?.status === 401) {
    dispatch(logOut());
  }

  const mutation = useMutation(deleteBook, {
    onSuccess: () => {
      toast.success("Book has been successfully deleted!");
      queryClient.invalidateQueries("bookshelf");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm("Are you absolutely certain about deleting this book?")) {
      mutation.mutate(id);
    }
  };

  return {
    data,
    error,
    isLoading: isBooksLoading,
    isError,
    handleDelete,
    isDeleteBookLoading: mutation.isLoading,
  };
}
