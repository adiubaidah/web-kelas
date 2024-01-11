import {NewChat} from "@/types"
import { axiosInstance } from "@/lib/utils";

class ServiceChat{
    getAll() {
        return axiosInstance.get("chat")
    }
    createChat(payload: NewChat) {
        return axiosInstance.post("chat", payload)
    }

}

export default new ServiceChat()