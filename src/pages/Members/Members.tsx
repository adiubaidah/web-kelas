import React, {useState} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import ServiceMember from "@/actions/members";

import SearchField from "./components/SearchField";
import { Member } from "@/types";
import Card from "./components/Card";
import { Button } from "@/components/ui/button";
import Loader from "@/fragments/Loader";
import { Loader2 } from "lucide-react";

function Members() {
  const [search, setSearch] = useState('');
  const {
    data,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["get-members", {search}],
    queryFn: ({pageParam}) => {
      const result = ServiceMember.getAll({pageParam, search})
      return result
    },
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage) => lastPage.data.nextPage,
    initialPageParam: 0,
  });

  return (
    <div className="container max-w-full">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-[63.98px] font-lemon">
        Daftar Anggota
      </h1>
      <SearchField search={search} setSearch={setSearch} isFetching={isFetching}/>
      <div className="mt-[122px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {
          isFetching ? <Loader className="h-full w-full flex justify-center" /> : ""
        }
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group.data.result.map((member: Member) => (
              <Card {...member} key={member.id} />
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="w-full text-center">{data?.pages[0].data.result.length === 0 ? "Lupa nama temen ?" : "" }</div>
      <div className="mt-7 flex justify-center">
        {hasNextPage && (
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
          >
            {
              isFetchingNextPage ?
              (<>
                <Loader2  className="animate-spin w-4 h-4 mr-3"/>
                Mengambil data...
              </>)
              : (
                <>
                Lebih banyak
                </>
              )
            }
          </Button>
        )}
      </div>
    </div>
  );
}

export default Members;
