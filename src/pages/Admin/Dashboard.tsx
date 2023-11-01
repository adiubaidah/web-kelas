import { useEffect, useRef, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import toast, { Toaster } from 'react-hot-toast';

import { db } from "../../firebase"
import type { Member } from "../../types"
import { useToastStore } from "../../hooks";

import ModalAdd from "./fragments/ModalAdd";
import ModalEdit from "./fragments/ModalEdit";

const storage = getStorage();

function Dashboard() {
  const [members, setMembers] = useState<Member[]>([])
  const membersCollectionRef = collection(db, 'members')
  const addModalRef = useRef<HTMLDialogElement>(null)
  const editModalRef = useRef<HTMLDialogElement>(null)
  const [memberEdit, setMemberEdit] = useState<Member>()
  const { isActive, message, type, change } = useToastStore()

  const handleAdd = () => {
    addModalRef.current?.showModal()
  }
  const handleEdit = (data: Member) => {
    editModalRef.current?.showModal()
    setMemberEdit(data)
  }

  const getMembers = async () => {
    const data = await getDocs(membersCollectionRef);
    const membersWithImages = await Promise.all(
      data.docs.map(async doc => {
        const imageUrl = await getDownloadURL(ref(storage, doc.data().image));
        const backgroundImageUrl = await getDownloadURL(ref(storage, doc.data().backgroundImage));
        return {
          id: doc.id,
          name: doc.data().name,
          description: doc.data().description,
          image: imageUrl,
          backgroundImage: backgroundImageUrl,
          instagram: doc.data().instagram,
          dream: doc.data().dream,
          from: doc.data().from,
          smallDescription: doc.data().smallDescription,
          tiktok: doc.data().tiktok
        };
      })
    );

    setMembers(membersWithImages);
  }

  useEffect(() => {
    getMembers();
  }, []);

  useEffect(() => {
    if (isActive && message !== null) {
      if (type === 'success') {
        console.log(type)
        toast.success(message)
        getMembers()
      } else {
        toast.error(message)
      }
      change(null, null)
    }
  }, [isActive, message, type])

  return (
    <div className="container max-w-full">
      <Toaster />
      <div className="overflow-x-auto">
        <button className="btn btn-wide btn-accent float-right" onClick={handleAdd}>Tambah Anggota</button>
        <table className="table">
          <thead className="text-white">
            <tr>
              <th>Nama</th>
              <th>Instagram</th>
              <th>Tiktok</th>
              <th>Dream</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              members.map((item, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                        <div className="text-sm opacity-50">{item.from}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <a href="" className="link link-success">{item.instagram}</a>
                  </td>
                  <td>
                    <a href="" className="link link-warning">{item.tiktok}</a>
                  </td>
                  <td>{item.dream}</td>
                  <th>
                    <button className="btn btn-warning btn-xs" onClick={() => handleEdit(item)}>edit</button>
                    <button className="btn btn-error btn-xs ms-3">delete</button>
                  </th>
                </tr>

              ))
            }

          </tbody>
        </table>
      </div>
      <ModalAdd ref={addModalRef} />
      <ModalEdit ref={editModalRef} memberEdit={memberEdit} />

    </div>
  )
}

export default Dashboard