import { FC} from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { Event } from "@/types";
import { openToast } from "@/reducers/toast";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ServiceEvent from "@/actions/events";

type EditDeleteOperation = {
    event?: Event,
    operation?: "edit" | "delete",
  }

interface DeleteEventProps {
  editDeleteOperation: EditDeleteOperation;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteEvent: FC<DeleteEventProps> = ({
  editDeleteOperation,
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const deleteEventMutation = useMutation({
    mutationKey: ["delete-event"],
    mutationFn: ServiceEvent.deleteEvent,
    onSuccess: (data) => {
      dispatch(
        openToast({
          isActive: true,
          message: `Acara ${data.data.name} berhasil dihapus`,
          type: "success",
        })
      );
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Acara gagal dihapus",
          type: "error",
        })
      );
    },
  });
  const handleDelete = () => {
    if(editDeleteOperation.event) {
      deleteEventMutation.mutate(editDeleteOperation.event.id)
    }
  }
  return (
    <AlertDialog
      open={isOpen && editDeleteOperation.operation === "delete"}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus acara {editDeleteOperation && editDeleteOperation.event?.name}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Tindakan anda tidak dapat diurungkan
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button variant="default" onClick={()=> {
            setIsOpen(false)
          }}>Batal</Button>
          {deleteEventMutation.isPending ? (
            <Button type="button" disabled variant="destructive">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menghapus
            </Button>
          ) : (
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Hapus
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEvent;
