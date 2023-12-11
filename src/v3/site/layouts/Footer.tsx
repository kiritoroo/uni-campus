import { useGlobalStore } from "../hooks/useGlobalStore";

const Footer = () => {
  const globalStore = useGlobalStore();

  const startExploring = globalStore.use.startExploring();

  if (!startExploring) {
    return <></>;
  }

  return (
    <footer className="fixed bottom-[30px] right-[100px] flex w-fit items-center justify-center">
      <div className="text-base font-medium text-gem-sapphire">Privacy policy</div>
    </footer>
  );
};

export default Footer;
