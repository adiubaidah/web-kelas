import { create } from 'zustand'
import { Toast } from './types'

const useToastStore = create<Toast>((set) => ({
    isActive: false,
    type: null,
    message: null,
    change: (type, message) => set(() => ({ type, isActive: type !== null, message }))
}))

export { useToastStore }