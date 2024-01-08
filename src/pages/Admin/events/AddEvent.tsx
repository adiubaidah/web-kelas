import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusSquare, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { NewEvent } from "@/types";
import { openToast } from "@/reducers/toast";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ServiceEvent from "@/actions/events";

const AddEvent = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient()

  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewEvent>();

  const eventMutation = useMutation({
    mutationKey: ["add-event"],
    mutationFn: ServiceEvent.createEvent,
    onSuccess: (data) => {
      dispatch(
        openToast({
          isActive: true,
          message: `Acara ${data.data.name} berhasil ditambahkan`,
          type: "success",
        })
      );
      reset();
      setIsOpen(false)
      queryClient.invalidateQueries({
        queryKey: ["events"]
      })
    },
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Acara gagal ditambahkan",
          type: "error",
        })
      );
    },
  });
  const onSubmit: SubmitHandler<NewEvent> = (payload) => {
    payload.year = Number(payload.year)
    // console.log(payload)
    eventMutation.mutate(payload);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="success" size="lg">
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Event</DialogTitle>
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
            {eventMutation.isPending ? (
              <Button type="submit" disabled variant="success">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan
              </Button>
            ) : (
              <Button type="submit" variant="success">Simpan</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEvent;
