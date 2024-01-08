import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {Loader2} from "lucide-react"
import { openToast } from "@/reducers/toast";
import ServiceGallery from "@/actions/gallery";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/types";

interface DeleteGalleryProps {
  gallery?: Gallery;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteGallery: FC<DeleteGalleryProps> = ({ gallery, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  const deleteGalleryMutation = useMutation({
    mutationKey: ["delete-gallery"],
    mutationFn: (galleryId: string) => {
      return ServiceGallery.deleteGallery(galleryId)
    },
    onError: ()=> {
      dispatch(openToast({isActive: true, message: `Gambar gagal dihapus`,type: "error"}))
    },
    onSuccess: ()=> {
      dispatch(openToast({isActive: true, message: `Gambar berhasil dihapus`,type: "success"}))
      queryClient.invalidateQueries({
        queryKey: ["find-gallery", {eventId: gallery?.eventId}]
      })
    },
    onSettled: ()=> {
      setIsOpen(false)
    }
  })

  const handleDelete = () => {
    if(gallery) {
      deleteGalleryMutation.mutate(gallery.id)
    }
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin akan menghapus gambar ini ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan anda tidak dapat diurungkan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"ghost"} onClick={() => setIsOpen(false)} disabled={deleteGalleryMutation.isPending}>
            Cancel
          </Button>
          {
            deleteGalleryMutation.isPending ? (
              <Button variant="destructive" disabled ><Loader2 className="mr-2 h-4 w-4 animate-spin" />  Menghapus</Button>
            ) : (
              <Button variant="destructive" onClick={handleDelete}>Hapus</Button> 
            )
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGallery;
