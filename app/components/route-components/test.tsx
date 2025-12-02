// import React, { useEffect, useState } from "react";
// import {
//   FiEdit2,
//   FiSave,
//   FiX,
//   FiMail,
//   FiPhone,
//   FiMapPin,
//   FiTarget,
//   FiEye,
// } from "react-icons/fi";
// import {
//   FaFacebook,
//   FaYoutube,
//   FaLinkedin,
//   FaInstagram,
//   FaTwitter,
// } from "react-icons/fa";
// import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";
// import {
//   getAllCompanyProfile,
//   updateCompanyProfile,
//   setEditingField,
// } from "~/redux/features/companyInfoSlice";

// const CompanyProfile: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const { data, loading, error, editingField } = useAppSelector(
//     (state) => state.company
//   );
//   const [editValues, setEditValues] = useState<Record<string, any>>({});
//   const [tempToken] = useState(localStorage.getItem("token") || ""); // Get token from storage

//   useEffect(() => {
//     dispatch(getAllCompanyProfile({ token: tempToken }));
//   }, [dispatch, tempToken]);

//   const handleEditClick = (field: string, value: any) => {
//     dispatch(setEditingField(field));
//     setEditValues({ ...editValues, [field]: value });
//   };

//   const handleSaveClick = async (field: string) => {
//     if (data?.result && editValues[field] !== undefined) {
//       const formData = new FormData();
//       formData.append(field, editValues[field]);

//       try {
//         await dispatch(
//           updateCompanyProfile({
//             token: tempToken,
//             formPayload: formData,
//           })
//         ).unwrap();

//         // Reset editing state after successful save
//         dispatch(setEditingField(null));
//         setEditValues({});
//       } catch (error) {
//         console.error("Failed to update:", error);
//       }
//     }
//   };

//   const handleCancelClick = () => {
//     dispatch(setEditingField(null));
//     setEditValues({});
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setEditValues({ ...editValues, [field]: value });
//   };

//   const renderEditableField = (
//     field: string,
//     value: string | number,
//     isTextarea: boolean = false,
//     rows: number = 3,
//     className: string = "",
//     type: string = "text"
//   ) => {
//     const isEditing = editingField === field;
//     const displayValue = isEditing
//       ? editValues[field] !== undefined
//         ? editValues[field]
//         : value
//       : value;

//     return (
//       <div className="relative group">
//         {isEditing ? (
//           <div className="flex flex-col space-y-2">
//             {isTextarea ? (
//               <textarea
//                 value={displayValue}
//                 onChange={(e) => handleInputChange(field, e.target.value)}
//                 rows={rows}
//                 className={`w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
//                 autoFocus
//               />
//             ) : (
//               <input
//                 type={type}
//                 value={displayValue}
//                 onChange={(e) => handleInputChange(field, e.target.value)}
//                 className={`w-full p-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
//                 autoFocus
//               />
//             )}
//             <div className="flex space-x-2 mt-2">
//               <button
//                 onClick={() => handleSaveClick(field)}
//                 className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 <FiSave size={16} />
//                 <span>Save</span>
//               </button>
//               <button
//                 onClick={handleCancelClick}
//                 className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
//               >
//                 <FiX size={16} />
//                 <span>Cancel</span>
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div className="relative">
//             <div className={className}>{displayValue}</div>
//             <button
//               onClick={() => handleEditClick(field, value)}
//               className="absolute -right-8 top-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800"
//               title={`Edit ${field}`}
//             >
//               <FiEdit2 size={18} />
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Format number with commas
//   const formatNumber = (num: number) => {
//     return num?.toLocaleString() || "0";
//   };

//   if (loading && !data) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }

//   if (!data?.result) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-gray-500 text-lg">
//           No company profile data found.
//         </div>
//       </div>
//     );
//   }

//   const company = data?.result[0];

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-6 lg:space-y-0">
//             <div className="flex-1">
//               <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
//                 {renderEditableField(
//                   "name",
//                   company.name,
//                   false,
//                   1,
//                   "text-3xl lg:text-4xl font-bold text-gray-900"
//                 )}
//               </h1>
//               <p className="text-lg lg:text-xl text-blue-600 font-semibold mb-4">
//                 {renderEditableField(
//                   "quote",
//                   company.quote,
//                   false,
//                   1,
//                   "text-lg lg:text-xl text-blue-600 font-semibold"
//                 )}
//               </p>
//               <p className="text-gray-600 mb-6">
//                 {renderEditableField(
//                   "shortTitle",
//                   company.shortTitle,
//                   false,
//                   1,
//                   "text-lg text-gray-600"
//                 )}
//               </p>
//             </div>
//             <div className="flex space-x-4">
//               <div className="bg-blue-100 rounded-lg p-4 text-center min-w-[140px]">
//                 <div className="text-2xl lg:text-3xl font-bold text-blue-700">
//                   {formatNumber(company.numberOfEmployees)}+
//                 </div>
//                 <div className="text-sm text-blue-600">Employees</div>
//               </div>
//               <div className="bg-green-100 rounded-lg p-4 text-center min-w-[140px]">
//                 <div className="text-2xl lg:text-3xl font-bold text-green-700">
//                   ${company.annualTurnover}M
//                 </div>
//                 <div className="text-sm text-green-600">Annual Turnover</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Left Column */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* About Section */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
//                 About Company
//               </h2>
//               {renderEditableField(
//                 "description",
//                 company.description,
//                 true,
//                 6,
//                 "text-gray-700 leading-relaxed"
//               )}
//             </div>

//             {/* Mission & Vision */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-xl p-8">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="p-3 bg-blue-600 rounded-lg">
//                     <FiTarget className="text-white" size={24} />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Mission</h3>
//                 </div>
//                 {renderEditableField(
//                   "mission",
//                   company.mission,
//                   true,
//                   4,
//                   "text-gray-700 leading-relaxed"
//                 )}
//               </div>

//               <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-xl p-8">
//                 <div className="flex items-center space-x-3 mb-6">
//                   <div className="p-3 bg-purple-600 rounded-lg">
//                     <FiEye className="text-white" size={24} />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900">Vision</h3>
//                 </div>
//                 {renderEditableField(
//                   "vision",
//                   company.vision,
//                   true,
//                   4,
//                   "text-gray-700 leading-relaxed"
//                 )}
//               </div>
//             </div>

//             {/* Production Capacity */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Production Capacity
//               </h2>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//                 <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-center">
//                   <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
//                     {company.numberOfSewingPlants}
//                   </div>
//                   <div className="text-gray-600 text-sm md:text-base">
//                     Sewing Plants
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-center">
//                   <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
//                     {company.numberOfSewingLines}
//                   </div>
//                   <div className="text-gray-600 text-sm md:text-base">
//                     Sewing Lines
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-center">
//                   <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">
//                     {formatNumber(company.productionCapacity)}
//                   </div>
//                   <div className="text-gray-600 text-sm md:text-base">
//                     Monthly Production
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 p-4 md:p-6 rounded-xl text-center">
//                   <div className="text-lg md:text-xl font-bold text-orange-600 mb-2">
//                     {company.primaryMarkets}
//                   </div>
//                   <div className="text-gray-600 text-sm md:text-base">
//                     Primary Markets
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8">
//             {/* Contact Information */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Contact Information
//               </h2>
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4">
//                   <FiMail
//                     className="text-blue-600 mt-1 flex-shrink-0"
//                     size={20}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="font-semibold text-gray-700">Email</div>
//                     {renderEditableField(
//                       "email",
//                       company.email,
//                       false,
//                       1,
//                       "text-gray-600 break-all",
//                       "email"
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <FiPhone
//                     className="text-blue-600 mt-1 flex-shrink-0"
//                     size={20}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="font-semibold text-gray-700">Phone</div>
//                     {renderEditableField(
//                       "phoneNumber",
//                       company.phoneNumber,
//                       false,
//                       1,
//                       "text-gray-600",
//                       "tel"
//                     )}
//                   </div>
//                 </div>
//                 <div className="flex items-start space-x-4">
//                   <FiMapPin
//                     className="text-blue-600 mt-1 flex-shrink-0"
//                     size={20}
//                   />
//                   <div className="flex-1 min-w-0">
//                     <div className="font-semibold text-gray-700">Location</div>
//                     {renderEditableField(
//                       "location",
//                       company.location,
//                       true,
//                       3,
//                       "text-gray-600"
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Links */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Connect With Us
//               </h2>
//               <div className="grid grid-cols-2 gap-4">
//                 {[
//                   {
//                     icon: FaFacebook,
//                     field: "facebookLink",
//                     label: "Facebook",
//                     color: "bg-blue-600",
//                     value: company.facebookLink,
//                   },
//                   {
//                     icon: FaYoutube,
//                     field: "youtubeLink",
//                     label: "YouTube",
//                     color: "bg-red-600",
//                     value: company.youtubeLink,
//                   },
//                   {
//                     icon: FaLinkedin,
//                     field: "linkedInLink",
//                     label: "LinkedIn",
//                     color: "bg-blue-700",
//                     value: company.linkedInLink,
//                   },
//                   {
//                     icon: FaInstagram,
//                     field: "instagramLink",
//                     label: "Instagram",
//                     color: "bg-pink-600",
//                     value: company.instagramLink,
//                   },
//                   {
//                     icon: FaTwitter,
//                     field: "twitterLink",
//                     label: "Twitter",
//                     color: "bg-sky-500",
//                     value: company.twitterLink,
//                   },
//                 ].map((social) => (
//                   <div key={social.field} className="relative group">
//                     {social.value &&
//                     social.value !== "fb-link" &&
//                     social.value !== "youtube-link" ? (
//                       <a
//                         href={social.value}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
//                       >
//                         <div className={`${social.color} p-2 rounded-lg`}>
//                           <social.icon className="text-white" size={20} />
//                         </div>
//                         <span className="font-medium text-gray-700">
//                           {social.label}
//                         </span>
//                       </a>
//                     ) : (
//                       <div className="flex items-center space-x-3 p-3 rounded-lg">
//                         <div className={`${social.color} p-2 rounded-lg`}>
//                           <social.icon className="text-white" size={20} />
//                         </div>
//                         <span className="font-medium text-gray-700">
//                           {social.label}
//                         </span>
//                       </div>
//                     )}
//                     <button
//                       onClick={() =>
//                         handleEditClick(social.field, social.value || "")
//                       }
//                       className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-blue-600 hover:text-blue-800"
//                       title={`Edit ${social.label} link`}
//                     >
//                       <FiEdit2 size={16} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Maps */}
//             <div className="bg-white rounded-2xl shadow-xl p-8">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">
//                 Our Locations
//               </h2>
//               <div className="space-y-6">
//                 <div className="space-y-2">
//                   <h3 className="font-semibold text-gray-700">
//                     Factory Location
//                   </h3>
//                   <div className="relative rounded-lg overflow-hidden h-48">
//                     {company.mapLink ? (
//                       <iframe
//                         src={company.mapLink}
//                         className="absolute inset-0 w-full h-full"
//                         style={{ border: 0 }}
//                         allowFullScreen
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                         title="Factory Location"
//                       />
//                     ) : (
//                       <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
//                         <span className="text-gray-500">No map available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="space-y-2">
//                   <h3 className="font-semibold text-gray-700">
//                     Corporate Office
//                   </h3>
//                   <div className="relative rounded-lg overflow-hidden h-48">
//                     {company.secondMapLink ? (
//                       <iframe
//                         src={company.secondMapLink}
//                         className="absolute inset-0 w-full h-full"
//                         style={{ border: 0 }}
//                         allowFullScreen
//                         loading="lazy"
//                         referrerPolicy="no-referrer-when-downgrade"
//                         title="Corporate Office"
//                       />
//                     ) : (
//                       <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
//                         <span className="text-gray-500">No map available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyProfile;
