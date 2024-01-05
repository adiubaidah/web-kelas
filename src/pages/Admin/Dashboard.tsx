import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
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
import ServiceAuth from "@/actions/authentication";
import ServiceMember from "@/actions/members";
import DeleteMember from "./members/DeleteMember";


function Dashboard() {
  const navigate = useNavigate();
  const [deleteMember, setDeleteMember] = useState<Member>();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const members = useQuery({
    queryKey: ["members"],
    queryFn: ServiceMember.getAllMemberWithoutImage,
  });

  const logoutMutation = useMutation({
    mutationFn: ServiceAuth.logout,
  });

  if (logoutMutation.isSuccess) {
    return <Navigate to={"/login"} replace />;
  }

  if (members.isLoading) {
    return <h1>Mengambil data member...</h1>;
  }

  return (
    <div className="container max-w-full">
      <div className="overflow-x-auto">
        <Button
          variant={"destructive"}
          onClick={() => {
            logoutMutation.mutate();
          }}
        >
          Logout
        </Button>
        <Button variant={"success"} onClick={() => navigate("/add-member")}>
          Tambah Anggota
        </Button>
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
                  <Anchor href={"/edit-member/"+member.id} variant={"warning"}>Edit</Anchor>
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

export default Dashboard;
