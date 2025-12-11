import { IconUpload, IconCategory } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingSpinner from "~/components/route-components/Loading/loading-spinner";
import { createProductCat } from "~/redux/features/productSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const ProductCategoryCreatePage = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const [preview, setPreview] = useState("/preview.avif");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loading, data: productCatData } = useAppSelector(
    (state) => state.product
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    isActive: true,
  });

  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = productCatData?.success ? toast.success : toast.error;
    ShowToast(productCatData?.statusCode ?? 400, {
      description: productCatData?.message,
      position: "top-right",
      richColors: true,
    });
    if (productCatData?.success) {
      navigate(-1);
    }
  }, [productCatData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formPayload = new FormData();

    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );

    if (selectedFile) {
      formPayload.append("icon", selectedFile);
    }

    dispatch(createProductCat({ token: "", formPayload }));
    setIsAttempted(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto p-6">
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200`}>
        <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconCategory className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Add Product Category</h2>
            <p className="text-sm text-gray-500">Add a new product category</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-gray-200 overflow-hidden bg-gray-50">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Icon"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <IconCategory className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleFileButtonClick}
                  className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                  <IconUpload className="w-4 h-4" />
                </button>
              </div>

              <input
                type="file"
                name="icon"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              <p className="text-sm text-gray-500 text-center">
                Click the camera icon to upload an icon
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Link
                </label>
                <input
                  id="link"
                  name="link"
                  type="text"
                  value={formData.link}
                  onChange={handleChange}
                  placeholder="Enter link"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700"
              >
                Is Active
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              {loading ? <LoadingSpinner /> : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCategoryCreatePage;
