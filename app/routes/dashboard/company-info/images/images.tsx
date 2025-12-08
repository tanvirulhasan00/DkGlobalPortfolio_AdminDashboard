import { useState, useEffect } from "react";
import "./images.css";

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
    <div className="image-grid-container">
      <h1 className="grid-title">Our Image Gallery</h1>
      <p className="grid-subtitle">
        A collection of moments that define our journey.
      </p>
      <div className="image-grid">
        {imageItems.map((image) => (
          <div key={image.id} className="image-grid-item">
            <img src={image.src} alt={image.alt} className="grid-image" />
            <div className="image-overlay">
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingImage(image);
                }}
              >
                Edit
              </button>
              <div className="overlay-content">
                <h3 className="overlay-title">{image.title}</h3>
                <p className="overlay-description">Hover to see the magic!</p>
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
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Edit Image</h2>
        <img src={image.src} alt={image.alt} className="modal-image-preview" />
        <div className="form-group">
          <label htmlFor="imageTitle">Image Title</label>
          <input
            id="imageTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="modal-actions">
          <button className="modal-button secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button primary" onClick={handleSaveClick}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Images;
