import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {Loader2} from "lucide-react"
import { openToast } from "@/reducers/toast";
import ServiceMember from "@/actions/members";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Member } from "@/types";

interface DeleteMemberProps {
  member?: Member;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const DeleteMember: FC<DeleteMemberProps> = ({ member, isOpen, setIsOpen }) => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch();
  const deleteMemberMutation = useMutation({
    mutationKey: ["delete-member"],
    mutationFn: (memberId: string) => {
      return ServiceMember.deleteMember(memberId)
    },
    onError: ()=> {
      dispatch(openToast({isActive: true, message: `${member?.name} gagal dihapus`,type: "error"}))
    },
    onSuccess: ()=> {
      dispatch(openToast({isActive: true, message: `${member?.name} berhasil dihapus`,type: "success"}))
      queryClient.invalidateQueries({
        queryKey: ["members"]
      })
    },
    onSettled: ()=> {
      setIsOpen(false)
    }
  })

  const handleDelete = () => {
    if(member) {
      deleteMemberMutation.mutate(member.id)
    }
  }
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-blue-900">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin akan menghapus member {member?.name} ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tindakan anda tidak dapat diurungkan
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button variant={"ghost"} onClick={() => setIsOpen(false)} disabled={deleteMemberMutation.isPending}>
            Cancel
          </Button>
          {
            deleteMemberMutation.isPending ? (
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

export default DeleteMember;
