import { Variants, motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef } from "react";
import { useGlobalStore } from "../hooks/useGlobalStore";
import Overview from "./widgets/overview/Overview";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = () => {
  const globalStore = useGlobalStore();
  const showSidebar = globalStore.use.showSidebar();
  const showOverview = globalStore.use.showOverview();

  const controls = useAnimationControls();
  const variants = useRef<Variants>({
    hide: {
      x: "-100%",
      opacity: 0,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
  });

  const handleClickOverview = () => {
    globalStore.setState({ showOverview: !showOverview });
  };

  const handleOnClickClose = () => {
    globalStore.setState({ showSidebar: false });
    globalStore.setState({ showOverview: false });
  };

  useEffect(() => {
    if (showSidebar) {
      controls.start("show");
    }

    if (!showSidebar) {
      controls.start("hide");
    }
  }, [showSidebar]);

  return (
    <motion.div
      variants={variants.current}
      animate={controls}
      initial="hide"
      className="fixed bottom-0 left-0 top-0 z-[9999999999]"
    >
      <div className="flex h-full items-center justify-center bg-gem-crystal">
        <div className="h-full px-16 py-8">
          <div className="flex h-full flex-col items-center justify-between">
            <div>
              <button
                type="button"
                className="rounded-full bg-gem-sapphire p-3"
                onClick={handleOnClickClose}
              >
                <X className="h-5 w-5 stroke-gem-crystal" />
              </button>
            </div>

            <div className="py-12">
              <ul className="space-y-2 pb-16">
                <li className="p-2 font-semibold">
                  <div>Search</div>
                </li>
                <li className="p-2 font-semibold">
                  <div>Spaces</div>
                </li>
                <li className="p-2 font-semibold">
                  <button type="button" onClick={handleClickOverview}>
                    Overview
                  </button>
                </li>
              </ul>

              <ul className="space-y-2">
                <li className="p-2 font-semibold">
                  <div>Events</div>
                </li>
              </ul>
            </div>

            <div>
              <div>
                <div className="pb-2 text-center text-sm font-semibold">
                  University of <br /> Technology and Education
                </div>
                <div className="text-center font-geist text-xl font-bold">HCMUTE</div>
              </div>

              <div className="flex items-center justify-center py-8">
                <div className="h-[3px] w-8 bg-gem-sapphire" />
              </div>

              <div className="py-2">
                <div className="text-center text-sm font-bold uppercase">Campus Map</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;
