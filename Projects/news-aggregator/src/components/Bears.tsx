import { create } from 'zustand'

interface BearStore {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
    updateBears: (newBears: { bears: number }) => void;
}

const useStore = create<BearStore>((set) => ({
    bears: 3,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears: { bears: number }) => set({ bears: newBears.bears }),
}))

function BearCounter() {
    const bears = useStore((state: { bears: number }) => state.bears)
    return <h1>{bears} bears around here...</h1>
}

export default BearCounter;