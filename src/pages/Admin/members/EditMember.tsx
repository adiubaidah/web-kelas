import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler} from "react-hook-form";
import { useDispatch } from "react-redux";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { Member } from "@/types";
import ServiceMember from "@/actions/members"
import { openToast } from "@/reducers/toast";

const EditMember = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const memberEdit = useQuery({
    queryKey: ["find-member", id, "edit"],
    queryFn: async ()=> {
      const data = await ServiceMember.findMember(id as string)
      return data
    },
    enabled: !!id
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<Member>();
  const [image, setImage] = useState<File | null>();
  const [backgroundImage, setBackgroundImage] = useState<File | null>();

  const memberEditMutation = useMutation({
    mutationKey: ["edit-member"],
    mutationFn: async (payload: FormData) => {
      const data = await ServiceMember.editMember(id as string, payload)
      return data
    },
    onSuccess: (result) => {
        dispatch(openToast({
          isActive: true,
          message: `${result.data.name} berhasil di update`,
          type: "success"
        }))
        reset()
        setTimeout(() => {
          navigate("/dashboard")
        }, 1500)
    },
    onError: ()=> {
      dispatch(openToast({
        isActive: true,
        message: "Gagal diupdate",
        type: "error"
      }))
    }
  })


 
  if(memberEdit.isSuccess) {
    const resultTemp = memberEdit.data?.data
    for (const [key, value] of Object.entries(resultTemp)) {
      // Set the value for each field
      setValue(key as keyof Member, value as string);
    }
  }

  
  if(memberEdit.isLoading) {
    return <h1>Mengambil data member ....</h1>
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
      formData.append("slug", payload.slug)
      formData.append("dream", payload.dream);
      formData.append("origin", payload.origin);
      formData.append("instagram", payload.instagram);
      formData.append("moto", payload.moto);
      formData.append("phone", payload.phone);
      formData.append("description", payload.description);

      if(image) formData.append("image", image);
      if(backgroundImage) formData.append("background_image", backgroundImage);

      memberEditMutation.mutate(formData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container">
    <h1 className="font-bold text-2xl">Update Member</h1>
    <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-6">
      <div>
        <Input
          placeholder="Nama"
          {...register("name", {
            required: "Nama harus diisi, yakali gk ada namanya",
          })}
          disabled={memberEditMutation.isPending}
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
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.name && errors.name.message}
        </small>
      </div>
      <div>
        <Input
          placeholder="Cita - cita"
          {...register("dream", { required: "Cita - cita harus ada" })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.dream && errors.dream.message}
        </small>
      </div>
      <div>
        <Input
          placeholder="Asal"
          {...register("origin", { required: "Asal diperlukan" })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.origin && errors.origin.message}
        </small>
      </div>
      <div>
        <Input
          placeholder="Instagram"
          {...register("instagram", { required: "Intagram diperlukan" })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.instagram && errors.instagram.message}
        </small>
      </div>
      <div>
        <Textarea
          placeholder="Moto"
          {...register("moto", { required: "Minimal ada moto untuk hidup" })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.moto && errors.moto.message}
        </small>
      </div>

      <div>
        <Input
          placeholder="phone"
          {...register("phone", { required: "No Hp diperlukan" })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.phone && errors.phone.message}
        </small>
      </div>
      <div>
        <Textarea
          placeholder="Deskripsi"
          rows={10}
          {...register("description", {
            required: "Deskripsi member diperlukan",
          })}
          disabled={memberEditMutation.isPending}
        />
        <small className="text-red-500">
          {errors.description && errors.description.message}
        </small>
      </div>

      <div>
        {image || getValues("image") ? (
          <img
            src={image ? URL.createObjectURL(image): getValues("image")}
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
        {backgroundImage || getValues("background_image") ? (
          <img
            src={backgroundImage ? URL.createObjectURL(backgroundImage) : getValues("background_image")}
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
  </section>
  )
  ;
};

export default EditMember;
