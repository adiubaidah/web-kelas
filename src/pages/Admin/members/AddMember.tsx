import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { NewMember } from "@/types";

import { openToast } from "@/reducers/toast";
import ServiceMember from "@/actions/members";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/ui/tiptap";

const AddMember = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>();
  const [backgroundImage, setBackgroundImage] = useState<File | null>();
  const form = useForm<NewMember>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const memberMutation = useMutation({
    mutationKey: ["add-member"],
    mutationFn: ServiceMember.createMember,
    onSuccess: () => {
      form.reset();
      setImage(null);
      setBackgroundImage(null);
      dispatch(
        openToast({
          isActive: true,
          message: `Member berhasil ditambahkan`,
          type: "success",
        })
      );
      setTimeout(() => {
        navigate("/admin/member");
      }, 1500);
    },
  });

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setBackgroundImage(files[0]);
    }
  };

  const onSubmit: SubmitHandler<NewMember> = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("slug", payload.slug);
      formData.append("dream", payload.dream);
      formData.append("origin", payload.origin);
      formData.append("instagram", payload.instagram);
      formData.append("moto", payload.moto);
      formData.append("phone", payload.phone);
      formData.append("description", payload.description);
      formData.append("image", image as File);
      formData.append("background_image", backgroundImage as File);

      memberMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="container">
      <h1 className="font-bold text-2xl">Tambahkan Member</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Masukkan Nama, Yakali gk ada namanya" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Nama"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            rules={{ required: "Anggota harus memiliki slug" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Slug anggota"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dream"
            rules={{ required: "Gk punya cita - cita" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Cita - cita"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="origin"
            rules={{ required: "Asal anggota diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Asal Anggota"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            rules={{ required: "No telepon diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="No Telepon"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            rules={{ required: "Instagram diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Instagram"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moto"
            rules={{ required: "Moto diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Moto"
                    {...field}
                    disabled={memberMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            rules={{ required: "Deskripsi diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Tiptap onChange={field.onChange} placeHolder="Deskripsi" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {image ? (
              <img
                src={image ? URL.createObjectURL(image) : ""}
                width={224}
                height={224}
              />
            ) : (
              <div className="bg-gray-400 w-56 h-56"></div>
            )}

            <Input
              type="file"
              name="gambar"
              placeholder="pilih gambar"
              onChange={handleImageChange}
              disabled={memberMutation.isPending}
            />
          </div>
          <div>
            {backgroundImage ? (
              <img
                src={
                  backgroundImage ? URL.createObjectURL(backgroundImage) : ""
                }
                width={224}
                height={224}
              />
            ) : (
              <div className="bg-gray-400 w-72 h-56"></div>
            )}

            <Input
              type="file"
              name="background_image"
              placeholder="pilih gambar background"
              onChange={handleBackgroundChange}
              disabled={memberMutation.isPending}
            />
          </div>
          {memberMutation.isPending ? (
            <Button variant={"success"} type="button" disabled>
              Menyimpan
            </Button>
          ) : (
            <Button variant={"success"} type="submit">
              Simpan
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
};

export default AddMember;
