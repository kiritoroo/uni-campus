import { FormInput } from "./FormInput";
import DropModel from "./DropModel";

const CreateForm = () => {
  return (
    <form>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2 space-y-2">
          <FormInput label="Building name" />
          <FormInput label="Space ID" />
          <FormInput label="Uses" />
          <div className="py-2">
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Position
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput label="x" dir="hoz" />
              <FormInput label="y" dir="hoz" />
              <FormInput label="z" dir="hoz" />
            </div>
          </div>
          <div className="py-2">
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Rotation
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput label="x" dir="hoz" />
              <FormInput label="y" dir="hoz" />
              <FormInput label="z" dir="hoz" />
            </div>
          </div>
          <div className="py-2">
            <p className="block w-fit cursor-pointer pb-1 text-sm font-medium text-gray-600">
              Scale
            </p>
            <div className="flex items-center justify-start gap-3">
              <FormInput label="x" dir="hoz" />
              <FormInput label="y" dir="hoz" />
              <FormInput label="z" dir="hoz" />
            </div>
          </div>
        </div>
        <div className="col-span-3 h-full w-full grow">
          <DropModel />
        </div>
      </div>
      <div className="py-5">
        <button type="button" className="w-fit bg-[#e2e2e2] p-3">
          <p className="text-sm font-medium text-[#2C2B31]">Create</p>
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
