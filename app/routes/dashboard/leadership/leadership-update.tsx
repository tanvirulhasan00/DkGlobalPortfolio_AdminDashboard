import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Transition,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { Spinner } from "~/components/ui/spinner";
import { ArrowUpRightIcon, X } from "lucide-react";
import { IconFolderCode, IconUpload } from "@tabler/icons-react";
import type { Leadership } from "~/components/columns/leadership-columns";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "~/components/ui/field";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "~/components/ui/empty";

type FormComponentProps = {
  className?: string;
  onSubmit: (formData: FormData) => void;
  data: Leadership;
  onClose: () => void;
};

const LeaderShipUpdate = ({
  data,
  open,
  onClose,
}: {
  data: Leadership;
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();

  const handleUpdate = async (formData: FormData) => {
    // if (token) {
    //   dispatch(
    //     createItemUser({
    //       token,
    //       formPayload: formData,
    //     })
    //   );
    // }
  };

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center sm:items-center sm:justify-center p-4">
          {/* Mobile bottom drawer */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transform transition ease-in-out duration-300"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <DialogPanel className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4 shadow-lg sm:hidden max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
              <FormComponent
                data={data}
                onSubmit={handleUpdate}
                onClose={onClose}
              />
            </DialogPanel>
          </Transition.Child>

          {/* Desktop centered modal */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="hidden sm:flex relative flex-col sm:flex-row bg-white rounded-lg p-6 shadow-xl w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl max-h-[90vh] overflow-y-auto">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex-shrink-0 w-full">
                <FormComponent
                  data={data}
                  onSubmit={handleUpdate}
                  onClose={onClose}
                />
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LeaderShipUpdate;

const FormComponent = ({
  className,
  onSubmit,
  data,
  onClose,
}: FormComponentProps) => {
  const [formData, setFormData] = useState({
    id: data?.id,
    name: data?.name,
    designation: data?.designation,
    email: data?.email,
    phoneNumber: data?.phoneNumber,
    imageUrl: data?.imageUrl,
    isActive: data?.isActive,
  });
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formPayload = new FormData();
    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );

    onSubmit(formPayload);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Update Leader Information</FieldLegend>
            <FieldGroup>
              <Field className="w-[20rem]">
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <img
                  alt=""
                  src={formData?.imageUrl}
                  className="w-full h-[10rem] rounded-2xl"
                />
              </Field>
              <FieldSeparator />
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleChange}
                  placeholder="Josef"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="designation">Designation</FieldLabel>
                <Input
                  id="designation"
                  name="designation"
                  value={formData?.designation}
                  onChange={handleChange}
                  placeholder="CEO"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  value={formData?.email}
                  onChange={handleChange}
                  placeholder="CEO"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData?.phoneNumber}
                  onChange={handleChange}
                  placeholder="+880XXXXXXXXXX"
                  required
                />
              </Field>
              <FieldSeparator />
              <div className="w-full max-w-md mx-auto p-4">
                {!preview ? (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <IconFolderCode />
                      </EmptyMedia>
                      <EmptyTitle>No Image Yet</EmptyTitle>
                      <EmptyDescription>
                        Select new image to update.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={openFilePicker}>
                          <IconUpload className="mr-2 h-4 w-4" /> Upload Image
                        </Button>
                      </div>

                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </EmptyContent>
                  </Empty>
                ) : (
                  <div className="space-y-4 text-center">
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded-xl border shadow w-full object-cover max-h-64"
                    />
                    <Button onClick={openFilePicker}>
                      <IconUpload className="mr-2 h-4 w-4" /> Change Image
                    </Button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};
