import { useGlobalStore } from "@v3/site/hooks/useGlobalStore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const Team = () => {
  const globalStore = useGlobalStore();

  const startExploring = globalStore.use.startExploring();

  const params = useParams();
  const navigate = useNavigate();

  const [isShowTeam, setIsShowTeam] = useState(false);

  const handleOnClose = () => {
    navigate("");
  };

  useEffect(() => {
    if (!startExploring) return;

    if (params["*"] === "team") {
      setIsShowTeam(true);
    } else {
      setIsShowTeam(false);
    }
  }, [startExploring, params]);

  if (!isShowTeam) {
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
            Team
          </div>

          <div className="absolute right-[30px] top-[30px]">
            <button className="rounded-full bg-gem-sapphire p-2" onClick={handleOnClose}>
              <X className="h-4 w-4 stroke-white stroke-[2px]" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-x-10">
            <Link
              to={"https://github.com/kiritoroo"}
              target="_blank"
              className="max-w-[150px] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* <div className="bg-white]">
                <img src="/v3/images/member2.png" className="aspect-square object-cover" />
              </div> */}

              <div className="pt-3">
                <div className="text-center text-lg font-bold text-gem-sapphire">Kien Trung</div>
                <div className="mb-4 text-center text-sm font-bold text-gem-sapphire/60">
                  @kiritoroo
                </div>
                <div className="text-center text-sm font-medium text-gem-sapphire/60">
                  3D Designer
                </div>
              </div>
            </Link>

            <Link
              to={"https://github.com/kiritoroo"}
              target="_blank"
              className="max-w-[150px] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* <div className="bg-white">
                <img src="/v3/images/member1.png" className="aspect-square object-cover" />
              </div> */}

              <div className="pt-3">
                <div className="text-center text-lg font-bold text-gem-sapphire">Kien Trung</div>
                <div className="mb-4 text-center text-sm font-bold text-gem-sapphire/60">
                  @kiritoroo
                </div>
                <div className="text-center text-sm font-medium text-gem-sapphire/60">
                  Project Manager
                </div>
              </div>
            </Link>

            <Link
              to={"https://github.com/kiritoroo"}
              target="_blank"
              className="max-w-[150px] bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {/* <div className="bg-white">
                <img src="/v3/images/member3.png" className="aspect-square object-cover" />
              </div> */}

              <div className="pt-3">
                <div className="text-center text-lg font-bold text-gem-sapphire">Kien Trung</div>
                <div className="mb-4 text-center text-sm font-bold text-gem-sapphire/60">
                  @kiritoroo
                </div>
                <div className="text-center text-sm font-medium text-gem-sapphire/60">
                  Developer
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
