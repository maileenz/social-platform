import { type PopoverProps, Root } from "@radix-ui/react-popover";
import type { FCC } from "@/types/global";

export interface MenuProps extends Omit<PopoverProps, "open"> {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Menu: FCC<MenuProps> = (props) => {
  const { isOpen, onClose, children, ...rest } = props;

  return (
    <Root open={isOpen} {...rest}>
      {children}
    </Root>
  );
};
