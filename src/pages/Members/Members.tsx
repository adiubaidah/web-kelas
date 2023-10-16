import { useEffect, useState } from "react"
import { collection, getDocs } from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase"
import type { Member } from "../../types"
import Card from "./components/Card"
import Pagination from "../../fragments/Pagination"

const storage = getStorage();

function Members() {
    const [members, setMembers] = useState<Member[]>([])
    const membersCollectionRef = collection(db, 'members')
    useEffect(() => {
        const getMembers = async () => {
            const data = await getDocs(membersCollectionRef);
            const membersWithImages = await Promise.all(
                data.docs.map(async doc => {
                    const imageUrl = await getDownloadURL(ref(storage, 'image/' + doc.data().image));
                    const backgroundImageUrl = await getDownloadURL(ref(storage, 'backgroundImage/' + doc.data().backgroundImage));
                    return {
                        id: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        image: imageUrl,
                        backgroundImage: backgroundImageUrl,
                        instagram: doc.data().instagram,
                        tiktok: doc.data().tiktok
                    };
                })
            );
            
            setMembers(membersWithImages);
        }

        getMembers();
    }, []);

  

    return (
        <div className="container max-w-full">
            <h1 className="text-5xl font-bold leading-[63.98px]">Daftar Anggota</h1>
            <form className="w-full mt-14 gap-x-2 flex">
                <input className="h-14 bg-indigo-950 rounded-lg px-[34px] border border-blue-800 w-full font-dm text-second focus:outline-0" placeholder="Cari anggota kelas" />
                <button type="submit" className="px-8 py-3 rounded-lg bg-blue-600 font-dm whitespace-nowrap">Cari Anggota</button>
            </form>
            <div className="mt-[122px] grid grid-cols-3 gap-7">
                {
                    members.map((item) => <Card {...item} />)
                }

            </div>
            <div className="mt-24 flex justify-center">
                <Pagination />
            </div>
        </div>
    )
}

export default Members