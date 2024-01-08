import { axiosInstance } from "@/lib/utils";

class ServiceGallery {
    getGalleryByEvent(eventId: string) {
        return axiosInstance.get(`/event/${eventId}/gallery`)
    }
    createGallery(payload: FormData) {
        return axiosInstance.post(`/gallery`, payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
    deleteGallery(galleryId: string) {
        return axiosInstance.delete("/gallery/"+galleryId)
    }
    
}

export default new ServiceGallery()