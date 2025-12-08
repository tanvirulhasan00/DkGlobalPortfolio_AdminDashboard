import React, { type FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllProductImages,
  createProductImage,
  updateProductImage,
  deleteProductImage,
  type ProductImage,
} from "~/redux/features/productImageSlice";
import { useAppDispatch, useAppSelector } from "~/redux/hooks/hook";

const Images = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, refresh } = useAppSelector(
    (state) => state.productImage
  );
  const [images, setImages] = useState<ProductImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] =
    useState<Partial<ProductImage> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  const handleOpenModal = (image: ProductImage | null = null) => {
    setCurrentImage(image ? { ...image } : { productId: 0 }); // Ensure productId is present
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  const handleOpenDeleteModal = (id: number) => {
    setImageToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setImageToDelete(null);
  };

  const confirmDelete = () => {
    if (imageToDelete !== null) {
      dispatch(deleteProductImage({ token: "", id: Number(imageToDelete) }));
      handleCloseDeleteModal();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formPayload = new FormData(form);

    if (currentImage?.id) {
      // Update
      formPayload.append("id", String(currentImage.id));
      formPayload.append("ownerId", String(currentImage.productId));
      dispatch(updateProductImage({ token: "", formPayload }));
    } else {
      // Create
      // You might need to add a productId selector here if it's not part of the form
      // For now, assuming it's handled or not needed for creation
      dispatch(createProductImage({ token: "", formPayload }));
    }

    handleCloseModal();
  };

  useEffect(() => {
    dispatch(getAllProductImages({ token: "" }));
  }, [dispatch, refresh]);

  useEffect(() => {
    if (data && Array.isArray(data.result)) {
      setImages(data.result);
    }
  }, [data]);

  if (loading && images.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading images...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Images</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Image
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="border rounded-lg overflow-hidden shadow-lg group relative transition-all duration-300 ease-in-out hover:shadow-2xl"
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 bg-white">
              <h2 className="text-lg font-semibold">{image.title}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Product ID: {image.productId}
              </p>
              {/* --- Mobile-only buttons --- */}
              <div className="flex lg:hidden gap-2 mt-2">
                <button
                  onClick={() => handleOpenModal(image)}
                  className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleOpenDeleteModal(image.id)}
                  className="flex-1 bg-red-500 text-white py-1 px-3 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            {/* --- Desktop-only buttons (hover) --- */}
            <div className="absolute top-2 right-2 hidden lg:flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleOpenModal(image)}
                className="bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600"
              >
                ✏️
              </button>
              <button
                onClick={() => handleOpenDeleteModal(image.id)}
                className="bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">
              {currentImage?.id ? "Edit Image" : "Add New Image"}
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  defaultValue={currentImage?.title || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="searchText"
                  className="block text-sm font-medium text-gray-700"
                >
                  Search Text
                </label>
                <input
                  type="text"
                  name="searchText"
                  id="searchText"
                  defaultValue={currentImage?.searchText || ""}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="ownerId"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product ID
                </label>
                <input
                  type="text"
                  name="ownerId"
                  id="ownerId"
                  defaultValue={currentImage?.productId || ""}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image File
                </label>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {currentImage?.imageUrl && (
                  <img
                    src={currentImage.imageUrl}
                    alt="Preview"
                    className="mt-2 h-24 w-auto"
                  />
                )}
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-full sm:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
          onClick={handleCloseDeleteModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm transform transition-all duration-300 animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleCloseDeleteModal}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Images;
