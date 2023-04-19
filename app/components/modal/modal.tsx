import { createContext } from "@/hooks/create-context";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  Root,
  Portal,
  Overlay,
  Content,
  Close,
  type DialogProps,
} from "@radix-ui/react-dialog";
import { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { button } from "../button";
import type { FCC } from "@/types/global";
import { motion, type Variants } from "framer-motion";
import { cva, VariantProps } from "class-variance-authority";

export const modal = cva(
  "z-10 fixed top-[50%] left-[50%] max-h-[85vh] w-full rounded-[6px] bg-white shadow-xl focus:outline-none",
  {
    variants: {
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface ModalProps
  extends Omit<DialogProps, "open">,
    UseModalContext,
    VariantProps<typeof modal> {}

export interface UseModalContext {
  isOpen: boolean;
  onClose: () => void;
}

const [Provider, useModalContext] = createContext<UseModalContext>();

export { useModalContext };

export const Modal: FCC<ModalProps> = (props) => {
  const { isOpen, onClose, children, size, ...rest } = props;

  const contentRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    ref: contentRef,
    handler: onClose,
  });

  return (
    <Root open={isOpen} {...rest}>
      <Portal>
        <Provider value={{ isOpen, onClose }}>
          <Overlay className="fixed inset-0 glass z-10" asChild>
            <motion.div
              initial={"hide"}
              animate={"show"}
              exit={"hide"}
              variants={fadeVariants}
            />
          </Overlay>
          <Content ref={contentRef} className={modal({ size })} asChild>
            <motion.div
              initial={"hide"}
              animate={"show"}
              exit={"hide"}
              variants={fadeScaleVariants}
              style={{
                transform: "translate(-50%, -50%)",
              }}
            >
              {children}

              <Close
                className={button({
                  shape: "circle",
                  variant: "ghost",
                  size: "sm",
                  className: "absolute top-3 right-3",
                })}
                onClick={onClose}
              >
                <MdOutlineClose className={"w-5 h-5"} />
              </Close>
            </motion.div>
          </Content>
        </Provider>
      </Portal>
    </Root>
  );
};

const fadeVariants: Variants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
  },
};

const fadeScaleVariants: Variants = {
  hide: {
    opacity: 0,
    scale: 0.5,
    transform: "translate(-50%, -50%)",
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.1,
    },
  },
};
