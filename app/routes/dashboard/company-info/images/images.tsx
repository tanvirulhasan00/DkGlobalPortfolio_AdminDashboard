import { useState, useEffect } from "react";


interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

// Dummy data generation
const initialImageItems: ImageItem[] = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  // Using picsum.photos for random images. The seed ensures we get the same images on each load.
  src: `https://picsum.photos/seed/${i + 1}/800/600`,
  alt: `Showcase image ${i + 1}`,
  title: `Image ${i + 1}`,
}));

const Images = () => {
  const [imageItems, setImageItems] = useState<ImageItem[]>(initialImageItems);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);

  const handleSave = (updatedImage: ImageItem) => {
    setImageItems(
      imageItems.map((img) => (img.id === updatedImage.id ? updatedImage : img))
    );
    setEditingImage(null); // Close modal on save
  };

  return (
    <div className="p-8 bg-gray-50 font-sans">
      <h1 className="text-center text-4xl mb-2 text-gray-800">Our Image Gallery</h1>
      <p className="text-center text-lg mt-0 mb-12 text-gray-600">
        A collection of moments that define our journey.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {imageItems.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer transform transition-all duration-400 ease-in-out hover:-translate-y-2 hover:shadow-2xl group"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover block transition-transform duration-400 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out flex items-end p-6 text-white">
              <button
                className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 border-none rounded-md px-4 py-2 font-bold cursor-pointer opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out z-10 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImage(image);
                }}
              >
                Edit
              </button>
              <div className="transform translate-y-5 group-hover:translate-y-0 transition-transform duration-400 ease-in-out">
                <h3 className="m-0 mb-1 text-lg font-semibold">{image.title}</h3>
                <p className="m-0 text-sm text-white text-opacity-80">Hover to see the magic!</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {editingImage && (
        <EditImageModal
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

interface EditImageModalProps {
  image: ImageItem;
  onClose: () => void;
  onSave: (image: ImageItem) => void;
}

const EditImageModal = ({ image, onClose, onSave }: EditImageModalProps) => {
  const [title, setTitle] = useState(image.title);

  // Add keyboard support to close the modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSaveClick = () => {
    onSave({ ...image, title });
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md text-gray-800 animate-pop-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6">Edit Image</h2>
        <img src={image.src} alt={image.alt} className="w-full h-64 object-cover rounded-lg mb-6" />
        <div className="mb-6">
          <label htmlFor="imageTitle" className="block mb-2 font-semibold">
            Image Title
          </label>
          <input
            id="imageTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-base"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-800 font-bold cursor-pointer transition-colors duration-200 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold cursor-pointer transition-colors duration-200 hover:bg-blue-700"
            onClick={handleSaveClick}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Images;
