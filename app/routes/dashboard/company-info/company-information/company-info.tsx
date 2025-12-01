import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FiEdit2,
  FiSave,
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiUsers,
  FiTrendingUp,
  FiTarget,
  FiEye,
} from "react-icons/fi";
import {
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
import {
  getAllCompanyProfile,
  updateCompanyProfile,
} from "~/redux/features/companyInfoSlice";

const CompanyProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, editingField } = useAppSelector(
    (state) => state.company
  );
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    dispatch(getAllCompanyProfile({ token: "" }));
  }, [dispatch]);

  const handleEditClick = (field: string, value: string) => {
    // dispatch(updateCompanyProfile({token:"",formPayload:field}));
    setEditValues({ ...editValues, [field]: value });
  };

  const handleSaveClick = (field: string) => {
    if (data && editValues[field] !== undefined) {
      // dispatch(updateCompanyProfile({ [field]: editValues[field] }));
    }
  };

  const handleCancelClick = () => {
    // dispatch(setEditingField(null));
    setEditValues({});
  };

  const handleInputChange = (field: string, value: string) => {
    setEditValues({ ...editValues, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (!data) return null;

  const renderEditableField = (
    field: string,
    value: string | number,
    isTextarea: boolean = false,
    rows: number = 3,
    className: string = ""
  ) => {
    const isEditing = editingField === field;
    const displayValue = isEditing ? editValues[field] || value : value;

    return (
      <div className="relative group">
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            {isTextarea ? (
              <textarea
                value={displayValue}
                onChange={(e) => handleInputChange(field, e.target.value)}
                rows={rows}
                className={`w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
                autoFocus
              />
            ) : (
              <input
                type="text"
                value={displayValue}
                onChange={(e) => handleInputChange(field, e.target.value)}
                className={`w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
                autoFocus
              />
            )}
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleSaveClick(field)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiSave size={16} />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancelClick}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FiX size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className={className}>{displayValue}</div>
            <button
              onClick={() => handleEditClick(field, String(value))}
              className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800"
            >
              <FiEdit2 size={18} />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {renderEditableField(
                  "name",
                  data?.result?.name,
                  false,
                  1,
                  "text-4xl font-bold text-gray-900"
                )}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">
                {renderEditableField(
                  "quote",
                  data?.result?.quote,
                  false,
                  1,
                  "text-xl text-blue-600 font-semibold"
                )}
              </p>
              <p className="text-gray-600 mb-6">
                {renderEditableField(
                  "shortTitle",
                  data?.result?.shortTitle,
                  false,
                  1,
                  "text-lg text-gray-600"
                )}
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="bg-blue-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-700">
                  {data?.result?.numberOfEmployees}+
                </div>
                <div className="text-sm text-blue-600">Employees</div>
              </div>
              <div className="bg-green-100 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-700">
                  ${data?.result?.annualTurnover}M
                </div>
                <div className="text-sm text-green-600">Annual Turnover</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                About Company
              </h2>
              {renderEditableField(
                "description",
                data?.result?.description,
                true,
                6,
                "text-gray-700 leading-relaxed"
              )}
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-600 rounded-lg">
                    <FiTarget className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Mission</h3>
                </div>
                {renderEditableField(
                  "mission",
                  data?.result?.mission,
                  true,
                  4,
                  "text-gray-700 leading-relaxed"
                )}
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-600 rounded-lg">
                    <FiEye className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Vision</h3>
                </div>
                {renderEditableField(
                  "vision",
                  data?.result?.vision,
                  true,
                  4,
                  "text-gray-700 leading-relaxed"
                )}
              </div>
            </div>

            {/* Production Capacity */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Production Capacity
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {data?.result?.numberOfSewingPlants}
                  </div>
                  <div className="text-gray-600">Sewing Plants</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {data?.result?.numberOfSewingLines}
                  </div>
                  <div className="text-gray-600">Sewing Lines</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {data?.result?.productionCapacity}
                  </div>
                  <div className="text-gray-600">Monthly Production</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl text-center">
                  <div className="text-xl font-bold text-orange-600 mb-2">
                    {data?.result?.primaryMarkets}
                  </div>
                  <div className="text-gray-600">Primary Markets</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <FiMail className="text-blue-600 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">Email</div>
                    {renderEditableField(
                      "email",
                      data?.result?.email,
                      false,
                      1,
                      "text-gray-600 break-all"
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FiPhone className="text-blue-600 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">Phone</div>
                    {renderEditableField(
                      "phoneNumber",
                      data?.result?.phoneNumber,
                      false,
                      1,
                      "text-gray-600"
                    )}
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <FiMapPin className="text-blue-600 mt-1" size={20} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-700">Location</div>
                    {renderEditableField(
                      "location",
                      data?.result?.location,
                      true,
                      3,
                      "text-gray-600"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Connect With Us
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: FaFacebook,
                    field: "facebookLink",
                    label: "Facebook",
                    color: "bg-blue-600",
                  },
                  {
                    icon: FaYoutube,
                    field: "youtubeLink",
                    label: "YouTube",
                    color: "bg-red-600",
                  },
                  {
                    icon: FaLinkedin,
                    field: "linkedInLink",
                    label: "LinkedIn",
                    color: "bg-blue-700",
                  },
                  {
                    icon: FaInstagram,
                    field: "instagramLink",
                    label: "Instagram",
                    color: "bg-pink-600",
                  },
                  {
                    icon: FaTwitter,
                    field: "twitterLink",
                    label: "Twitter",
                    color: "bg-sky-500",
                  },
                ].map((social) => (
                  <div key={social.field} className="relative group">
                    <a
                      href={""}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`${social.color} p-2 rounded-lg`}>
                        <social.icon className="text-white" size={20} />
                      </div>
                      <span className="font-medium text-gray-700">
                        {social.label}
                      </span>
                    </a>
                    <button
                      onClick={() => handleEditClick(social.field, "")}
                      className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Maps */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Locations
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">
                    Factory Location
                  </h3>
                  <div className="relative rounded-lg overflow-hidden h-48">
                    <iframe
                      src={data?.result?.mapLink}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Factory Location"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-700">
                    Corporate Office
                  </h3>
                  <div className="relative rounded-lg overflow-hidden h-48">
                    <iframe
                      src={data?.result?.secondMapLink}
                      className="absolute inset-0 w-full h-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Corporate Office"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
