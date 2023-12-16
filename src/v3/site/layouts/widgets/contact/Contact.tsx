import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Contact = () => {
  const globalStore = useGlobalStore();

  const startExploring = globalStore.use.startExploring();

  const params = useParams();
  const navigate = useNavigate();

  const [isShowContact, setIsShowContact] = useState(false);

  const handleOnClose = () => {
    navigate("");
  };

  useEffect(() => {
    if (!startExploring) return;

    if (params["*"] === "contact") {
      setIsShowContact(true);
    } else {
      setIsShowContact(false);
    }
  }, [startExploring, params]);

  if (!isShowContact) {
    return <></>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
      className="relative z-[999999999]"
    >
      <div className="fixed inset-0 flex h-screen w-screen items-center justify-center">
        <div className="relative bg-white/60 px-8 py-5 backdrop-blur-[5px] md:px-32 md:py-20">
          <div className="py-5 pb-8 text-center font-geist text-3xl font-semibold uppercase">
            Contact
          </div>

          <div className="absolute right-[30px] top-[30px]">
            <button className="rounded-full bg-gem-sapphire p-2" onClick={handleOnClose}>
              <X className="h-4 w-4 stroke-white stroke-[2px]" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
