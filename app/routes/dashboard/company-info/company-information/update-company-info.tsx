import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import {
  getAllCompanyProfile,
  updateCompanyProfile,
  createCompanyProfile,
  type CompanyProfile,
} from "~/redux/features/companyInfoSlice";

const initialFormData: CompanyProfile = {
  id: 0,
  name: "",
  quote: "",
  shortTitle: "",
  description: "",
  email: "",
  phoneNumber: "",
  location: "",
  mapLink: "",
  secondMapLink: "",
  facebookLink: "",
  youtubeLink: "",
  linkedInLink: "",
  instagramLink: "",
  twitterLink: "",
  mission: "",
  vision: "",
  annualTurnover: 0,
  numberOfEmployees: 0,
  numberOfSewingPlants: 0,
  numberOfSewingLines: 0,
  productionCapacity: 0,
  primaryMarkets: "",
};

const EditCompanyProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useAppSelector((state) => state.company);
  const [formData, setFormData] = useState<CompanyProfile>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tempToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    dispatch(getAllCompanyProfile({ token: tempToken }));
  }, [dispatch, tempToken]);

  useEffect(() => {
    if (data?.result && data.result.length > 0) {
      setFormData(data.result[0]);
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formPayload = new FormData();

      // Append all form data to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formPayload.append(key, value.toString());
        }
      });
      await dispatch(
        updateCompanyProfile({
          token: tempToken,
          formPayload,
        })
      ).unwrap();

      navigate(-1);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  // A simple check for required fields.
  // For a real app, more robust validation would be needed.
  const isFormInvalid = !formData.name || !formData.email;

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Update Company Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Update your company information
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting || isFormInvalid}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  name="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter company name"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quote *
                </label>
                <input
                  name="quote"
                  value={formData.quote || ""}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter company quote"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Title *
                </label>
                <input
                  name="shortTitle"
                  value={formData.shortTitle || ""}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter short title"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description || ""}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter company description"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  type="email"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="company@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  name="phoneNumber"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange}
                  type="tel"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <textarea
                  name="location"
                  value={formData.location || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter full address"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Factory Map Link *
                </label>
                <input
                  name="mapLink"
                  value={formData.mapLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://maps.google.com/..."
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Office Map Link *
                </label>
                <input
                  name="secondMapLink"
                  value={formData.secondMapLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://maps.google.com/..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Social Media Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook
                </label>
                <input
                  name="facebookLink"
                  value={formData.facebookLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube
                </label>
                <input
                  name="youtubeLink"
                  value={formData.youtubeLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://youtube.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  name="linkedInLink"
                  value={formData.linkedInLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://linkedin.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instagram
                </label>
                <input
                  name="instagramLink"
                  value={formData.instagramLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter
                </label>
                <input
                  name="twitterLink"
                  value={formData.twitterLink || ""}
                  onChange={handleInputChange}
                  type="url"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="https://twitter.com/..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Mission & Vision
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mission *
                </label>
                <textarea
                  name="mission"
                  value={formData.mission || ""}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter company mission"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vision *
                </label>
                <textarea
                  name="vision"
                  value={formData.vision || ""}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="Enter company vision"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
              Company Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Turnover (Million USD) *
                </label>
                <input
                  name="annualTurnover"
                  value={formData.annualTurnover || ""}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="25"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees *
                </label>
                <input
                  name="numberOfEmployees"
                  value={formData.numberOfEmployees || ""}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="1300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sewing Plants *
                </label>
                <input
                  name="numberOfSewingPlants"
                  value={formData.numberOfSewingPlants || ""}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sewing Lines *
                </label>
                <input
                  name="numberOfSewingLines"
                  value={formData.numberOfSewingLines || ""}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="10"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Production Capacity *
                </label>
                <input
                  name="productionCapacity"
                  value={formData.productionCapacity || ""}
                  onChange={handleInputChange}
                  type="number"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="300000"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Markets *
                </label>
                <input
                  name="primaryMarkets"
                  value={formData.primaryMarkets || ""}
                  onChange={handleInputChange}
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300"
                  placeholder="EU, USA, Canada, UK"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isFormInvalid}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
