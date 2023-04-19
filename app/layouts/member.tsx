import { Modal } from "@/components/modal";
import { UserNavbar } from "./components/navbar";
import { create } from "zustand";
import type { FCC } from "@/types/global";

export const MemberLayout: FCC = (props) => {
  const { children } = props;

  const { isOpen, onClose } = useUserActivities();

  return (
    <>
      <UserNavbar />

      {children}

      <Modal isOpen={isOpen} onClose={onClose}>
        Add photo
      </Modal>
    </>
  );
};

interface UseUserActivities {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export const useUserActivities = create<UseUserActivities>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
    })),
}));
