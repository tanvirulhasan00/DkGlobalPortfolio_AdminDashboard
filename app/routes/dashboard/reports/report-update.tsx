import { IconUserEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingSpinner from "~/components/route-components/Loading/loading-spinner";
import { updateReport } from "~/redux/features/reportSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const ReportUpdatePage = () => {
  const location = useLocation();
  const data = location.state || {}; // <-- received state
  const dispatch = useAppDispatch();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { loading, data: reportData } = useAppSelector((state) => state.report);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: data?.id || "",
    title: data?.title || "",
    description: data?.description || "",
    icon: data?.icon || "",
    categoryId: data?.categoryId || "",
    pdfLink: data?.pdfLink || "",
    isActive: data?.isActive ?? true,
  });

  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = reportData?.success ? toast.success : toast.error;
    ShowToast(reportData?.statusCode ?? reportData?.code, {
      description: reportData?.message,
      position: "top-right",
      richColors: true,
    });
    if (reportData?.success) {
      navigate(-1);
    }
  }, [reportData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formPayload = new FormData();

    // Append all form data including ID
    Object.entries(formData).forEach(([k, v]) =>
      formPayload.append(k, String(v ?? ""))
    );

    // Append file if selected
    if (selectedFile) {
      formPayload.append("pdfLink", selectedFile);
    }

    // Also append the original image URL if no new file is selected
    if (!selectedFile && data?.pdfLink) {
      formPayload.append("pdfLink", data?.pdfLink);
    }

    // Handle form submission
    dispatch(updateReport({ token: "", formPayload }));
    // navigate(-1);
    setIsAttempted(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    // Navigate back or reset
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-6">
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200`}>
        {/* Header */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconUserEdit className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Update Report
            </h2>
            <p className="text-sm text-gray-500">
              Modify the partner information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter title"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description *
                </label>
                <input
                  id="description"
                  name="description"
                  type="text"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Icon Text * (text must be from same group)
                </label>
                <input
                  id="icon"
                  name="icon"
                  type="text"
                  required
                  value={formData.icon}
                  onChange={handleChange}
                  placeholder="BsFire"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="pdfLink"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  PDF Link *
                </label>
                <input
                  id="pdfLink"
                  name="pdfLink"
                  type="file"
                  required
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <input
                id="isActive"
                name="isActive"
                type="checkbox"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700"
              >
                Active Report
              </label>
            </div>
          </div>

          {/* Footer Actions */}
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
              {loading ? <LoadingSpinner /> : "Update Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportUpdatePage;
