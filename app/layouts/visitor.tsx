import { Footer } from "./components/footer";
import { Navbar } from "./components/navbar";
import type { FCC } from "@/types/global";

export const VisitorLayout: FCC = (props) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
