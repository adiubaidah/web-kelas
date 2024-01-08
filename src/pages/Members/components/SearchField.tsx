import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { FC } from "react";

type FormPayload = {
  search: string;
};

interface SearchFieldProps {
  search: string,
  setSearch: (search: string) => void,
  isFetching: boolean
}

const SearchField: FC<SearchFieldProps> = ({search,setSearch, isFetching}) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPayload>();
  const onSubmit: SubmitHandler<FormPayload> = (data) => {
    setSearch(data.search)
    queryClient.invalidateQueries({
      queryKey: ["get-members", {search}] //nilai search sebelumnya
    })
  };
  return (
    <>
      <form
        className="w-full mt-14 gap-x-2 flex"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          placeholder="Cari temen mu"
          className="w-full"
          {...register("search", {
            minLength: {
              value: 3,
              message: "Minimal 3 huruf",
            },
          })}
        />

        <button
          type="submit"
          className={`px-4 sm:px-8 py-3 rounded-lg ${isFetching ? 'bg-blue-800 cursor-not-allowed':'bg-blue-600'} font-dm whitespace-nowrap`}
          disabled={isFetching}
        >
          Cari
        </button>
      </form>
      <small className="text-red-500">
        {errors.search && errors.search.message}
      </small>
    </>
  );
}

export default SearchField;
