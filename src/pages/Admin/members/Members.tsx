import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Member } from "@/types";

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
import ServiceMember from "@/actions/members";
import DeleteMember from "./DeleteMember";


function Members() {
  const [deleteMember, setDeleteMember] = useState<Member>();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const members = useQuery({
    queryKey: ["members"],
    queryFn: ServiceMember.getAllMemberWithoutImage,
  });


  if (members.isLoading) {
    return <h1>Mengambil data member...</h1>;
  }

  return (
    <div className="container max-w-full">
      <div className="overflow-x-auto">
   
        <Anchor variant={"success"} href="/admin/add-member">
          Tambah Anggota
        </Anchor>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-yellow-500">Nama</TableHead>
              <TableHead className="text-yellow-500">Instagram</TableHead>
              <TableHead className="text-yellow-500">Asal</TableHead>
              <TableHead className="text-yellow-500">Dream</TableHead>
              <TableHead className="text-yellow-500">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members?.data?.data.map((member: Member) => (
              <TableRow key={member.id}>
                <TableCell>{member.name}</TableCell>
                <TableCell>
                  <a href="" className="link link-success">
                    {member.instagram}
                  </a>
                </TableCell>
                <TableCell>{member.origin}</TableCell>
                <TableCell>{member.dream}</TableCell>
                <TableCell>
                  <Anchor href={"/admin/edit-member/"+member.id} variant={"warning"}>Edit</Anchor>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setDeleteMember(member);
                      setOpenModalDelete(true);
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
      <DeleteMember
        member={deleteMember}
        isOpen={openModalDelete}
        setIsOpen={setOpenModalDelete}
      />
    </div>
  );
}

export default Members;
