import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import ServiceEvent from "@/actions/events";
import ServiceGallery from "@/actions/gallery";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Gallery } from "@/types";
import AddGallery from "./AddGallery";
import DeleteGallery from "./DeleteGallery";

const Gallery = () => {
  const { eventId } = useParams();
  const [deleteGallery, setDeleteGallery] = useState<Gallery>();
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const findEventQuery = useQuery({
    queryKey: ["find-event", eventId],
    queryFn: async () => {
      const result = await ServiceEvent.findEvent(eventId as string);
      return result.data;
    },
    enabled: !!eventId,
  });

  const findGalleryByEventQuery = useQuery({
    queryKey: ["find-gallery", { eventId }],
    queryFn: async () => {
      const result = await ServiceGallery.getGalleryByEvent(eventId as string);
      return result.data;
    },
    enabled: !!eventId,
  });

  if (findEventQuery.isLoading) {
    return <h4>Mengambil data acara</h4>;
  }

  if (findGalleryByEventQuery.isLoading) {
    return <h4>Mengambil daftar gambar</h4>;
  }

  return (
    <section className="container max-w-full">
      <div>
        <h1>Galeri acara {findEventQuery.data.name}</h1>
        <AddGallery eventId={eventId as string} />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-yellow-500">Gambar</TableHead>
              <TableHead className="text-yellow-500">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findGalleryByEventQuery.data.map((gallery: Gallery) => (
              <TableRow key={gallery.id}>
                <TableCell>
                  <img src={gallery.image} alt="Gambar" width={300} height={200} />
                </TableCell>
                <TableCell>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      setDeleteGallery(gallery)
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
      <DeleteGallery gallery={deleteGallery} isOpen={openModalDelete} setIsOpen={setOpenModalDelete} />
    </section>
  );
};

export default Gallery;
