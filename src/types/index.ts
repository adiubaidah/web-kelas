interface Member {
    id: string;
    name: string;
    description: string;
    image: string;
    backgroundImage: string;
    instagram?: string;
    tiktok?: string;
    dream?: string;
    smallDescription: string;
    from: string;
}

interface Toast {
    isActive: boolean,
    type: 'success' | 'error' | null,
    message: string | null,
    change: (type: 'success' | 'error' | null, message: string | null) => void,

}
export type { Member, Toast }