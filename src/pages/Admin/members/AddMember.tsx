import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import { NewMember } from "@/types";

import { openToast } from "@/reducers/toast";
import ServiceMember from "@/actions/members";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AddMember = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [image, setImage] = useState<File | null>();
  const [backgroundImage, setBackgroundImage] = useState<File | null>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewMember>();
  const [descriptionState, setDescriptionState] = useState(() => 
    EditorState.createEmpty()
  );
  // useEffect(() => {
  //   console.log(EditorState)
  // }, [EditorState])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImage(files[0]);
    }
  };

  const memberMutation = useMutation({
    mutationKey: ["add-member"],
    mutationFn: ServiceMember.createMember,
    onSuccess: ()=> {
      reset()
      setImage(null)
      setBackgroundImage(null)
      dispatch(openToast({
        isActive: true,
        message:`Member berhasil ditambahkan`,
        type: "success"
      }))
      setTimeout(() => {
        navigate("/admin/member")
      }, 1500)
    }
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
      formData.append("slug", payload.slug)
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
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-6">
        <div>
          <Input
            placeholder="Nama"
            {...register("name", {
              required: "Nama harus diisi, yakali gk ada namanya",
            })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.name && errors.name.message}
          </small>
        </div>
        <div>
          <Input
            placeholder="Slug"
            {...register("slug", {
              required: "slug harus diisi",
            })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.name && errors.name.message}
          </small>
        </div>
        <div>
          <Input
            placeholder="Cita - cita"
            {...register("dream", { required: "Cita - cita harus ada" })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.dream && errors.dream.message}
          </small>
        </div>
        <div>
          <Input
            placeholder="Asal"
            {...register("origin", { required: "Asal diperlukan" })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.origin && errors.origin.message}
          </small>
        </div>
        <div>
          <Input
            placeholder="Instagram"
            {...register("instagram", { required: "Intagram diperlukan" })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.instagram && errors.instagram.message}
          </small>
        </div>
        <div>
          <Textarea
            placeholder="Moto"
            {...register("moto", { required: "Minimal ada moto untuk hidup" })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.moto && errors.moto.message}
          </small>
        </div>

        <div>
          <Input
            placeholder="phone"
            {...register("phone", { required: "No Hp diperlukan" })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.phone && errors.phone.message}
          </small>
        </div>
        {/* <div>
          <Textarea
            placeholder="Deskripsi"
            rows={10}
            {...register("description", {
              required: "Deskripsi member diperlukan",
            })}
            disabled={memberMutation.isPending}
          />
          <small className="text-red-500">
            {errors.description && errors.description.message}
          </small>
        </div> */}
    

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
              src={backgroundImage ? URL.createObjectURL(backgroundImage) : ""}
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
    </section>
  );
};

export default AddMember;
