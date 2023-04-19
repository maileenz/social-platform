import { lazy } from "react";
import { Suspense } from "react";
import { type FC } from "react";
import { ClipLoader } from "react-spinners";
import { type ModalProps, Modal } from "../modal";

const RecoveryModalContent = lazy(() =>
  import("./recovery-modal-content").then((m) => ({
    default: m.RecoveryModalContent,
  }))
);

export const RecoveryModal: FC<ModalProps> = (props) => {
  return (
    <Modal {...props}>
      <Suspense
        fallback={
          <div className={"flex justify-center py-8"}>
            <ClipLoader
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        }
      >
        <RecoveryModalContent />
      </Suspense>
    </Modal>
  );
};
