import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { Event } from "@/types";
import { openToast } from "@/reducers/toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceEvent from "@/actions/events";

type EditDeleteOperation = {
  event?: Event;
  operation?: "edit" | "delete";
};

interface EditEventProps {
  editDeleteOperation: EditDeleteOperation;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const EditEvent: FC<EditEventProps> = ({
  editDeleteOperation,
  isOpen,
  setIsOpen,
}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Event>();



  const editEventMutation = useMutation({
    mutationKey: ["edit-event"],
    mutationFn: async (payload: Event) => {
      const result = await ServiceEvent.editEvent(
        editDeleteOperation.event?.id as string,
        payload
      );
      return result;
    },
    onSuccess: (data) => {
      dispatch(
        openToast({
          isActive: true,
          message: `Acara ${data.data.name} berhasil diedit`,
          type: "success",
        })
      );
      reset();
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Acara gagal diedit",
          type: "error",
        })
      );
    },
  });

  useEffect(() => {
    if(editDeleteOperation && editDeleteOperation.event) {
        setValue("id", editDeleteOperation.event.id)
        setValue("name", editDeleteOperation.event.name)
        setValue("year", editDeleteOperation.event.year)
    }
  }, [editDeleteOperation,setValue])

  const onSubmit: SubmitHandler<Event> = (payload) => {
    payload.year = Number(payload.year);
    // console.log(payload)
    editEventMutation.mutate(payload);
  };
  return (
    <Dialog open={isOpen && editDeleteOperation.operation === "edit"} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Acara</DialogTitle>
        </DialogHeader>
        <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              placeholder="Nama acara"
              {...register("name", { required: "Nama acara diperlukan" })}
            />
            {errors.name && (
              <small className="block text-red-500 text-sm mt-2 ms-1">
                {errors.name.message}
              </small>
            )}
          </div>
          <div>
            <Input
              placeholder="Tahun acara"
              type="number"
              {...register("year", { required: "Tahun acara diperlukan" })}
            />
            {errors.name && (
              <small className="block text-red-500 text-sm mt-2 ms-1">
                {errors.name.message}
              </small>
            )}
          </div>
          <DialogFooter>
            {editEventMutation.isPending ? (
              <Button type="submit" disabled variant="warning">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Mengupdate
              </Button>
            ) : (
              <Button type="submit" variant="warning">
                Simpan
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditEvent;
