import { forwardRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import type { Member } from "../../../types"
const ModalEdit = forwardRef<HTMLDialogElement, { memberEdit: Member | undefined }>(({ memberEdit }, ref) => {
  const [data, setData] = useState<Member | undefined>(memberEdit)
  const [image, setImage] = useState<File | null>()
  const [bgImage, setBgImage] = useState<File | null>()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Member>()


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      setImage(files[0])
    }
  }

  const handleBgImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files) {
      setBgImage(files[0])
    }
  }

  const onSubmit: SubmitHandler<Member> = async (data) => {
    setLoading(true)
    setLoading(false)
    reset()
  }

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box bg-indigo-600 w-11/12 max-w-5xl">
        <div className="modal-action flex flex-col">
        <h4 className="text-2xl font-semibold">Edit Anggota</h4>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full flex flex-col gap-y-5 mt-4">
            <div>
              <input type="text" placeholder="Nama" className="input input-bordered w-full bg-navy" {...register('name', { required: true, value: data?.name })} />
              {errors.name && <small className='text-yellow-200 font-mono text-sm'>Nama diperlukan</small>}
            </div>
            <div>
              <input type="text" placeholder="Cita - cita" className="input input-bordered w-full bg-navy" {...register('dream')} />
            </div>
            <div>
              <input type="text" placeholder="Asal" className="input input-bordered w-full bg-navy" {...register('from', { required: true, value: data?.from })} />
              {errors.from && <small className='text-yellow-200 font-mono text-sm'>Asal diperlukan</small>}
            </div>
            <div>
              <input type="text" placeholder="Instagram" className="input input-bordered w-full bg-navy" {...register('instagram', { value: data?.instagram })} />
            </div>
            <div>
              <input type="text" placeholder="Tiktok" className="input input-bordered w-full bg-navy" {...register('tiktok', { value: data?.tiktok })} />
            </div>
            <div>
              <textarea placeholder="Deskripsi singkat" className="textarea textarea-bordered w-full bg-navy"
                {...register('smallDescription', { value: data?.smallDescription, minLength: { value: 6, message: 'Deskripsi singkat minimal 6 karakter' } })} rows={2}></textarea>
              {errors.smallDescription && <small className='text-yellow-200 font-mono text-sm'>{errors.smallDescription.message}</small>}
            </div>
            <div>
              <textarea placeholder="Deskripsi singkat" className="textarea textarea-bordered w-full bg-navy" {...register('description', { value: data?.description, required: "Harus ada deskripsi", minLength: { value: 20, message: "Pesan minimal 20 karakter" } })} rows={6}></textarea>
              {errors.description && <small className='text-yellow-200 font-mono text-sm'>{errors.description.message}</small>}
            </div>
            <div>
              {
                image && <img src={image ? URL.createObjectURL(image) : ''} width={400} height={400} />
              }
              <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs bg-navy" onChange={handleImageChange} />
            </div>
            <div>
              {
                bgImage && <img src={bgImage ? URL.createObjectURL(bgImage) : ''} width={400} height={400} />
              }
              <input type="file" className="file-input file-input-bordered file-input-success w-full max-w-xs bg-navy" onChange={handleBgImageChange} />
            </div>

            <form method="dialog" className="mt-5">
              <button className="btn btn-error">Close</button>
            </form>

            <button type="submit" className={`btn btn-${loading ? 'secondary' : 'success'}`} disabled={loading}>
              {loading ? "Menyimpan" : "Simpan"}
            </button>

          </form>

        </div>
      </div>
    </dialog>
  )
})

export default ModalEdit