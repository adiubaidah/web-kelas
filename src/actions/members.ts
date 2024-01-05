import { axiosInstance } from "@/lib/utils";

class ServiceMember{
    getAll() {
        return axiosInstance.get('/member');
    }
    getAllMemberWithoutImage() {
        return axiosInstance.get("/member-without-image")
    }
    createMember(formData: FormData) {
        return axiosInstance.post("/member", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
    findMember(memberId: string) {
        return axiosInstance.get("/member/"+memberId)
    }
    editMember(memberId: string, formData: FormData) {
        return axiosInstance.put("/member/"+memberId, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
    deleteMember(memberId: string) {
        return axiosInstance.delete("/member/"+memberId)
    }
}
export default new ServiceMember()