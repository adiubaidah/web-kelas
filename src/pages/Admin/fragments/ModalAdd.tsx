import { forwardRef, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { getStorage, ref as refStorage, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

import { Member } from "../../../types"
import { db } from "../../../firebase";
import { generateString } from "../../../helper";
import { useToastStore } from "../../../hooks";

const storage = getStorage();
const ModalAdd = forwardRef<HTMLDialogElement>((_props, ref) => {
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState<File|null>()
    const [bgImage, setBgImage] = useState<File|null>()
    const {change} = useToastStore()
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
        const imageRef = refStorage(storage, `image/${generateString(8)}.jpg`)
        const bgImageRef = refStorage(storage, `backgroundImage/${generateString(8)}.jpg`)
        try {

            if(image) {
                await uploadBytes(imageRef, image)
            }
            if(bgImage) {
                await uploadBytes(bgImageRef, bgImage)
            }
            const result = await addDoc(collection(db, 'members'), {
                ...data,
                image: en,
                backgroundImage: bgImageRef.fullPath
            })
            console.log(result)
        } catch(error) {
            change('error', 'Data gagal ditambahkan')
        }


        if ((ref as React.MutableRefObject<HTMLDialogElement>).current) {
            (ref as React.MutableRefObject<HTMLDialogElement>).current.close();
        }
        change('success', "Data berhasil ditambahkan")
        setLoading(false)
        setImage(null)
        setBgImage(null)
        reset()
    }
  
    return (
        <dialog ref={ref} className="modal">
            <div className="modal-box bg-indigo-600 w-11/12 max-w-5xl">
                <div className="modal-action flex flex-col">
                    <h4 className="text-2xl font-semibold">Tambah Anggota</h4>
                    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="w-full flex flex-col gap-y-5 mt-4">
                        <div>
                            <input type="text" placeholder="Nama" className="input input-bordered w-full bg-navy" {...register('name', { required: true })} />
                            {errors.name && <small className='text-yellow-200 font-mono text-sm'>Nama diperlukan</small>}
                        </div>
                        <div>
                            <input type="text" placeholder="Cita - cita" className="input input-bordered w-full bg-navy" {...register('dream')} />
                        </div>
                        <div>
                            <input type="text" placeholder="Asal" className="input input-bordered w-full bg-navy" {...register('from', { required: true })} />
                            {errors.from && <small className='text-yellow-200 font-mono text-sm'>Asal diperlukan</small>}
                        </div>
                        <div>
                            <input type="text" placeholder="Instagram" className="input input-bordered w-full bg-navy" {...register('instagram')} />
                        </div>
                        <div>
                            <input type="text" placeholder="Tiktok" className="input input-bordered w-full bg-navy" {...register('tiktok')} />
                        </div>
                        <div>
                            <textarea placeholder="Deskripsi singkat" className="textarea textarea-bordered w-full bg-navy"
                                {...register('smallDescription', { minLength: { value: 6, message: 'Deskripsi singkat minimal 6 karakter' } })} rows={2}></textarea>
                            {errors.smallDescription && <small className='text-yellow-200 font-mono text-sm'>{errors.smallDescription.message}</small>}
                        </div>
                        <div>
                            <textarea placeholder="Deskripsi singkat" className="textarea textarea-bordered w-full bg-navy" {...register('description', { required: "Harus ada deskripsi", minLength: { value: 20, message: "Pesan minimal 20 karakter" } })} rows={6}></textarea>
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

export default ModalAdd
   // const result = await addDoc(collection(db, 'members'), {
        //     ...data
        // })
        // const imageRef 
        // console.log(result)