import DropPreview from "./DropPreview";
import { FormInput } from "./FormInput";
import ViewPreview from "./ViewPreview";
import { usePreviewUploadStore } from "./hooks/usePreviewUploadStore";

const CreateForm = () => {
  const previewUploadStore = usePreviewUploadStore();
  const buffer = previewUploadStore.use.buffer();

  return (
    <form className="space-y-2">
      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2">
          <div className="flex h-full w-full flex-col">
            <p className="w-fit pb-1 text-sm font-medium text-gray-600">Preview</p>
            {buffer ? <ViewPreview /> : <DropPreview />}
          </div>
        </div>
        <div className="col-span-3">
          <FormInput label="Name" />
          <FormInput label="Space" />
          <FormInput label="Uses" />
        </div>
      </div>
      <div className="py-1">
        <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
          Position
        </p>
        <div className="flex items-center justify-start gap-3">
          <FormInput label="x" dir="hoz" />
          <FormInput label="y" dir="hoz" />
          <FormInput label="z" dir="hoz" />
        </div>
      </div>
      <div className="py-1">
        <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
          Rotation
        </p>
        <div className="flex items-center justify-start gap-3">
          <FormInput label="x" dir="hoz" />
          <FormInput label="y" dir="hoz" />
          <FormInput label="z" dir="hoz" />
        </div>
      </div>
      <div className="py-1">
        <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">Scale</p>
        <div className="flex items-center justify-start gap-3">
          <FormInput label="x" dir="hoz" />
          <FormInput label="y" dir="hoz" />
          <FormInput label="z" dir="hoz" />
        </div>
      </div>
      <div className="py-5">
        <button type="submit" className="w-fit bg-[#e2e2e2] p-3">
          <p className="text-sm font-medium text-[#2C2B31]">Create</p>
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
