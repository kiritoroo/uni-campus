import { Clipboard } from "lucide-react";
import CopyToClipboard from "react-copy-to-clipboard";
import { Tooltip } from "react-tooltip";
import { v4 as uuidv4 } from "uuid";

const Copied = ({ value }: { value: string }) => {
  const id = `clipboard-${uuidv4()}`;

  return (
    <>
      <CopyToClipboard text={value}>
        <Clipboard
          className="h-4 w-4 shrink-0 cursor-pointer stroke-gray-600"
          data-tooltip-id={id}
          data-tooltip-content="copied"
          data-tooltip-variant="dark"
        />
      </CopyToClipboard>
      <Tooltip
        id={id}
        openOnClick
        globalCloseEvents={{
          scroll: true,
          escape: true,
          resize: true,
          clickOutsideAnchor: true,
        }}
      />
    </>
  );
};

export default Copied;
