import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

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

import { Member } from "@/types";
import ServiceMember from "@/actions/members";
import { openToast } from "@/reducers/toast";

const EditMember = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const memberEdit = useQuery({
    queryKey: ["find-member", id, "edit"],
    queryFn: async () => {
      const data = await ServiceMember.findMember(id as string);
      return data;
    },
    enabled: !!id,
  });
  const form = useForm<Member>();
  const [image, setImage] = useState<File | null>();
  const [backgroundImage, setBackgroundImage] = useState<File | null>();

  const memberEditMutation = useMutation({
    mutationKey: ["edit-member"],
    mutationFn: async (payload: FormData) => {
      const data = await ServiceMember.editMember(id as string, payload);
      return data;
    },
    onSuccess: (result) => {
      dispatch(
        openToast({
          isActive: true,
          message: `${result.data.name} berhasil di update`,
          type: "success",
        })
      );
      form.reset();
      setTimeout(() => {
        navigate("/admin/member");
      }, 1500);
    },
    onError: () => {
      dispatch(
        openToast({
          isActive: true,
          message: "Gagal diupdate",
          type: "error",
        })
      );
    },
  });

  if (memberEdit.isSuccess) {
    const resultTemp = memberEdit.data?.data;
    for (const [key, value] of Object.entries(resultTemp)) {
      // Set the value for each field
      form.setValue(key as keyof Member, value as string);
    }
  }

  if (memberEdit.isLoading) {
    return <h1>Mengambil data member ....</h1>;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setBackgroundImage(files[0]);
    }
  };

  const onSubmit: SubmitHandler<Member> = async (payload) => {
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

      if (image) formData.append("image", image);
      if (backgroundImage) formData.append("background_image", backgroundImage);

      memberEditMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
      <h1 className="font-bold text-2xl">Update Member</h1>
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
                    disabled={memberEditMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            rules={{ required: "Slug diperlukan" }}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Slug"
                    {...field}
                    disabled={memberEditMutation.isPending}
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
                    disabled={memberEditMutation.isPending}
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
                    disabled={memberEditMutation.isPending}
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
                    disabled={memberEditMutation.isPending}
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
                    disabled={memberEditMutation.isPending}
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
                    disabled={memberEditMutation.isPending}
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
                  <Tiptap
                    placeHolder="Moto"
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {image || form.getValues("image") ? (
              <img
                src={
                  image ? URL.createObjectURL(image) : form.getValues("image")
                }
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
              disabled={memberEditMutation.isPending}
            />
          </div>
          <div>
            {backgroundImage || form.getValues("background_image") ? (
              <img
                src={
                  backgroundImage
                    ? URL.createObjectURL(backgroundImage)
                    : form.getValues("background_image")
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
              disabled={memberEditMutation.isPending}
            />
          </div>
          {memberEditMutation.isPending ? (
            <Button variant={"warning"} type="button" disabled>
              Mengupdate
            </Button>
          ) : (
            <Button variant={"warning"} type="submit">
              Update
            </Button>
          )}
        </form>
      </Form>
    </section>
  );
};

export default EditMember;
