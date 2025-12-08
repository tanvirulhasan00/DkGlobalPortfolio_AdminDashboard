import React, { type FormEvent, useState } from "react";

interface ProductImage {
  id: number;
  title: string;
  searchText: string | null;
  imageUrl: string;
  isActive: boolean;
  productId: number;
  product: null;
}

const imagesData: ProductImage[] = [
  {
    id: 1,
    title: "Image-1",
    searchText: "Upper",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/0d59bef4-ec5b-42bb-8903-2631503a1ef1.jpg",
    isActive: true,
    productId: 1,
    product: null,
  },
  {
    id: 2,
    title: "Image-2",
    searchText: "Upper",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/d891fda6-0c8a-4222-b872-fc13e5d594de.jpg",
    isActive: true,
    productId: 2,
    product: null,
  },
  {
    id: 3,
    title: "Image-3",
    searchText: "Lower",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/fb8ba6e7-1419-4eac-9394-2e7c83c6e44a.jpg",
    isActive: true,
    productId: 3,
    product: null,
  },
  {
    id: 4,
    title: "Image-4",
    searchText: "Lower",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/2b02d33c-8b44-4834-921f-96973c9f109a.jpg",
    isActive: true,
    productId: 4,
    product: null,
  },
  {
    id: 5,
    title: "Image-5",
    searchText: "Lower",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/a18eaa90-f92a-49b6-bc24-4e03bf1a2a80.jpg",
    isActive: true,
    productId: 5,
    product: null,
  },
  {
    id: 6,
    title: "Image-6",
    searchText: "Lower",
    imageUrl:
      "https://portfolio.api.cookiesoftwareltd.com:4201/product-images/541e25a9-0b50-49af-9210-bc3b37f90409.jpg",
    isActive: true,
    productId: 6,
    product: null,
  },
  {
    id: 7,
    title: "test",
    searchText: null,
    imageUrl:
      "https://localhost:7274/product-images/3f120766-c138-4fbb-ad49-d444bdc100f2.png",
    isActive: true,
    productId: 1,
    product: null,
  },
];

const Images = () => {
  const [images, setImages] = useState<ProductImage[]>(imagesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] =
    useState<Partial<ProductImage> | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<number | null>(null);

  const handleOpenModal = (image: ProductImage | null = null) => {
    setCurrentImage(image ? { ...image } : {});
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
      setImages(images.filter((image) => image.id !== imageToDelete));
      handleCloseDeleteModal();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const searchText = formData.get("searchText") as string;
    const imageFile = formData.get("imageFile") as File;

    const newImageData = {
      title,
      searchText,
      imageUrl: currentImage?.imageUrl || "",
      isActive: true,
      productId: currentImage?.productId || Date.now(), // Use existing or new
      product: null,
    };

    if (imageFile && imageFile.size > 0) {
      newImageData.imageUrl = URL.createObjectURL(imageFile);
    }

    if (currentImage?.id) {
      // Update
      setImages(
        images.map((img) =>
          img.id === currentImage.id
            ? { ...img, ...newImageData, id: img.id }
            : img
        )
      );
    } else {
      // Create
      const newImage: ProductImage = {
        ...newImageData,
        id: Date.now(), // Simple unique ID generation
      };
      setImages([newImage, ...images]);
    }

    handleCloseModal();
  };

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
            <form onSubmit={handleSubmit}>
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
                  htmlFor="imageFile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image File
                </label>
                <input
                  type="file"
                  name="imageFile"
                  id="imageFile"
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
