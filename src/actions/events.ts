import { axiosInstance } from "@/lib/utils";
import {Event, NewEvent} from "@/types"
class ServiceEvent{
    getAll() {
        return axiosInstance.get('/event');
    }
    createEvent(payload: NewEvent) {
        return axiosInstance.post("/event", payload)
    }
    findEvent(eventId: string) {
        return axiosInstance.get("/event/"+eventId)
    }
    editEvent(eventId: string, payload: Event) {
        return axiosInstance.put("/event/"+eventId, payload)
    }
    deleteEvent(eventId: string) {
        return axiosInstance.delete("/event/"+eventId)
    }
}
export default new ServiceEvent()