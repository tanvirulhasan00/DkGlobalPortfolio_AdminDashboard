import { IconCategory } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import LoadingSpinner from "~/components/route-components/Loading/loading-spinner";
import { updateCategory } from "~/redux/features/blogSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import { getToken } from "~/components/route-components/getLocalStorage";

const BlogCategoryUpdatePage = () => {
  const location = useLocation();
  const data = location.state || {};
  const dispatch = useAppDispatch();
  const token = getToken();
  const [isAttempted, setIsAttempted] = useState<boolean>(true);
  const { loading, categoryData } = useAppSelector(
    (state) => state.blog
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: data?.id || "",
    name: data?.name || "",
    slug: data?.slug || "",
    description: data?.description || "",
    isActive: data?.isActive ?? true,
  });

  useEffect(() => {
    if (isAttempted) return;
    const ShowToast = categoryData?.success ? toast.success : toast.error;
    ShowToast(categoryData?.statusCode ?? 400, {
      description: categoryData?.message,
      position: "top-right",
      richColors: true,
    });
    if (categoryData?.success) {
      navigate(-1);
    }
  }, [categoryData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formPayload = {
      id: formData.id,
      name: formData.name,
      slug: formData.slug,
      description: formData.description,
      isActive: formData.isActive,
    };
    
    dispatch(updateCategory({ token: token || "", formPayload }));
    setIsAttempted(false);
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

  return (
    <div className="container mx-auto p-6">
      <div className={`bg-white rounded-2xl shadow-sm border border-gray-200`}>
        <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
          <div className="p-2 bg-blue-50 rounded-lg">
            <IconCategory className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Update Blog Category</h2>
            <p className="text-sm text-gray-500">Modify the blog category details</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
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
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="Enter slug (optional)"
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
              {loading ? <LoadingSpinner /> : "Update Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCategoryUpdatePage;
