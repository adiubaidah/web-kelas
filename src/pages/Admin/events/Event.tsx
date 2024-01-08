import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Event } from "@/types";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Anchor } from "@/components/ui/anchor";
import ServiceEvent from "@/actions/events";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import DeleteEvent from "./DeleteEvent";

type EditDeleteOperation = {
  event?: Event,
  operation?: "edit" | "delete",
}
const Event = () => {
  const [editDeleteOperation, setEditDeleteOperation] = useState<EditDeleteOperation>();
  const [openEditDelete, setOpenEditDelete] = useState(false);
  const events = useQuery({
    queryKey: ["events"],
    queryFn: ServiceEvent.getAll,
  });

  if (events.isLoading) {
    return <h1>Mengambil data event...</h1>;
  }
  return (
    <div className="container max-w-full">
      <div className="overflow-x-auto">
       <AddEvent />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-yellow-500">Nama</TableHead>
              <TableHead className="text-yellow-500">Tahun</TableHead>
              <TableHead className="text-yellow-500">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events?.data?.data.map((event: Event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.year}</TableCell>
                <TableCell>
                  <Anchor variant="blue" href={`/admin/event/${event.id}/gallery`}>Gambar</Anchor>
                  <Button variant={"warning"} onClick={()=> {
                    setEditDeleteOperation({
                      event: event,
                      operation: "edit"
                    })
                    setOpenEditDelete(true)
                  }}>Edit</Button>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setEditDeleteOperation({
                        event: event,
                        operation: "delete"
                      });
                      setOpenEditDelete(true);
                    }}
                  >
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <EditEvent 
      editDeleteOperation={editDeleteOperation as EditDeleteOperation}
      isOpen={openEditDelete}
      setIsOpen={setOpenEditDelete}
      />
      <DeleteEvent
        editDeleteOperation={editDeleteOperation as EditDeleteOperation}
        isOpen={openEditDelete}
        setIsOpen={setOpenEditDelete}
      />
    </div>
  );
};

export default Event;
