import { FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusSquare, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";

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
import ServiceGallery from "@/actions/gallery";

const AddGallery = ({eventId}: {eventId: string}) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [gallery, setGallery] = useState<File>();

  const createGalleryMutation = useMutation({
    mutationKey: ["add-gallery"],
    mutationFn: ServiceGallery.createGallery,
    onSuccess: () => {
      dispatch(
        openToast({
          isActive: true,
          message: `Gambar berhasil ditambahkan`,
          type: "success",
        })
      );
      setIsOpen(false);
      queryClient.invalidateQueries({
        queryKey: ["find-gallery", {eventId}],
      });
    },
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Gambar gagal ditambahkan",
          type: "error",
        })
      );
    },
  });

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if(files) {
        setGallery(files[0])
    }
  }
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if(eventId) {
        const formData = new FormData()
        formData.append("image", gallery as File)
        formData.append("eventId", eventId)
        createGalleryMutation.mutate(formData)
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="success" size="lg">
          <PlusSquare className="w-6 h-6 me-4" /> Tambah Gallery
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambahkan Gallery</DialogTitle>
        </DialogHeader>
        <form className="space-y-10" onSubmit={handleSubmit}>
          <div>
          {gallery ? (
            <img
              src={gallery ? URL.createObjectURL(gallery) : ""}
              width={300}
              height={200}
            />
          ) : (
            <div className="bg-gray-400 w-[300px] h-[200px]"></div>
          )}
            <Input type="file" onChange={handleGalleryChange} placeholder="Gambar Acara" disabled={createGalleryMutation.isPending}/>
          </div>
          <DialogFooter>
            {createGalleryMutation.isPending ? (
              <Button type="submit" disabled variant="success">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan
              </Button>
            ) : (
              <Button type="submit" variant="success">
                Simpan
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGallery;
