import React, { useState, useEffect } from 'react';
import adminApi, { Gallery, GalleryImage, GalleryFormData } from '@/api/admin';
import { useNotification } from '@/components/NotificationContainer';
import { validateGalleryForm, validateImageUpload, getFieldError, hasFieldError } from '@/utils/validation';

interface GalleryForm extends GalleryFormData {
  [key: string]: any;
}

const AdminGalleryPage: React.FC = () => {
  const notify = useNotification();
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGalleryFormOpen, setIsGalleryFormOpen] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState<number | null>(null);
  const [galleryFormData, setGalleryFormData] = useState<GalleryForm>({
    name: '',
    gallery_type: 'photos',
    is_featured: false
  });
  const [galleryErrors, setGalleryErrors] = useState<any[]>([]);
  const [deleteConfirmGallery, setDeleteConfirmGallery] = useState<number | null>(null);

  // Image upload states
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [imageFormData, setImageFormData] = useState({
    title: '',
    caption: '',
    photographer: '',
    image_order: 1
  });
  const [imageErrors, setImageErrors] = useState<any[]>([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [deleteConfirmImage, setDeleteConfirmImage] = useState<number | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getAllGalleries(0, 100);
      setGalleries(data);
    } catch (error: any) {
      notify.error('Failed to Load Galleries', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGalleryImages = async (galleryId: number) => {
    try {
      const images = await adminApi.getGalleryImages(galleryId);
      setGalleryImages(images);
    } catch (error: any) {
      notify.error('Failed to Load Images', error.message);
    }
  };

  const handleSelectGallery = (gallery: Gallery) => {
    setSelectedGallery(gallery);
    fetchGalleryImages(gallery.gallery_id);
  };

  // Gallery Form Handlers
  const handleGalleryInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setGalleryFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    setGalleryErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateGalleryForm(galleryFormData);
    if (!validation.isValid) {
      setGalleryErrors(validation.errors);
      notify.error('Form Validation Failed', 'Please fix the errors and try again');
      return;
    }

    setIsLoading(true);
    try {
      if (editingGalleryId) {
        await adminApi.updateGallery(editingGalleryId, galleryFormData);
        notify.success('Gallery Updated Successfully');
      } else {
        await adminApi.createGallery(galleryFormData);
        notify.success('Gallery Created Successfully');
      }
      resetGalleryForm();
      fetchGalleries();
    } catch (error: any) {
      notify.error('Operation Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditGallery = (gallery: Gallery) => {
    setEditingGalleryId(gallery.gallery_id);
    setGalleryFormData({
      name: gallery.name,
      description: gallery.description || '',
      gallery_type: gallery.gallery_type,
      is_featured: gallery.is_featured
    });
    setIsGalleryFormOpen(true);
    window.scrollTo(0, 0);
  };

  const handleDeleteGallery = async (id: number) => {
    setIsLoading(true);
    try {
      await adminApi.deleteGallery(id);
      notify.success('Gallery Deleted Successfully');
      setDeleteConfirmGallery(null);
      setSelectedGallery(null);
      fetchGalleries();
    } catch (error: any) {
      notify.error('Delete Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetGalleryForm = () => {
    setGalleryFormData({
      name: '',
      gallery_type: 'photos',
      is_featured: false
    });
    setEditingGalleryId(null);
    setGalleryErrors([]);
    setIsGalleryFormOpen(false);
  };

  // Image Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      const validation = validateImageUpload(file);

      if (!validation.isValid) {
        setImageErrors(validation.errors);
        notify.error('File Validation Failed', validation.errors[0]?.message);
        setUploadFile(null);
        return;
      }

      setUploadFile(file);
      setImageErrors([]);
    }
  };

  const handleImageInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setImageFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setImageErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleUploadImage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGallery) {
      notify.error('Error', 'Please select a gallery first');
      return;
    }

    if (!uploadFile) {
      notify.error('Error', 'Please select an image file');
      return;
    }

    if (!imageFormData.title.trim()) {
      setImageErrors([{ field: 'title', message: 'Image title is required' }]);
      notify.error('Validation Failed', 'Image title is required');
      return;
    }

    setIsUploadingImage(true);
    try {
      // In a real app, you'd upload the file to a server and get URLs back
      // For now, we'll use a data URL for the demo
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result as string;
        const imageData = {
          image_url: imageUrl,
          thumbnail_url: imageUrl,
          title: imageFormData.title,
          caption: imageFormData.caption,
          photographer: imageFormData.photographer,
          image_order: galleryImages.length + 1
        };

        try {
          await adminApi.addImageToGallery(selectedGallery!.gallery_id, imageData);
          notify.success('Image Uploaded Successfully');
          resetImageForm();
          fetchGalleryImages(selectedGallery!.gallery_id);
        } catch (error: any) {
          notify.error('Upload Failed', error.message);
        }
      };
      reader.readAsDataURL(uploadFile);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!selectedGallery) return;

    setIsUploadingImage(true);
    try {
      await adminApi.removeImageFromGallery(selectedGallery.gallery_id, imageId);
      notify.success('Image Deleted Successfully');
      setDeleteConfirmImage(null);
      fetchGalleryImages(selectedGallery.gallery_id);
    } catch (error: any) {
      notify.error('Delete Failed', error.message);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSetFeaturedImage = async (imageId: number) => {
    if (!selectedGallery) return;

    try {
      await adminApi.setFeaturedImage(selectedGallery.gallery_id, imageId);
      notify.success('Featured Image Updated');
      fetchGalleryImages(selectedGallery.gallery_id);
    } catch (error: any) {
      notify.error('Failed to Set Featured Image', error.message);
    }
  };

  const resetImageForm = () => {
    setUploadFile(null);
    setImageFormData({
      title: '',
      caption: '',
      photographer: '',
      image_order: 1
    });
    setImageErrors([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <button
          onClick={() =>
            isGalleryFormOpen ? resetGalleryForm() : setIsGalleryFormOpen(true)
          }
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isGalleryFormOpen ? 'Cancel' : '+ New Gallery'}
        </button>
      </div>

      {/* Gallery Form Section */}
      {isGalleryFormOpen && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold mb-4">
            {editingGalleryId ? 'Edit Gallery' : 'Create New Gallery'}
          </h2>
          <form onSubmit={handleCreateGallery} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={galleryFormData.name}
                  onChange={handleGalleryInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(galleryErrors, 'name')
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder="e.g., Osam Temple Gallery"
                />
                {hasFieldError(galleryErrors, 'name') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(galleryErrors, 'name')}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gallery Type *
                </label>
                <select
                  name="gallery_type"
                  value={galleryFormData.gallery_type}
                  onChange={handleGalleryInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(galleryErrors, 'gallery_type')
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="photos">Photos</option>
                  <option value="videos">Videos</option>
                  <option value="360photos">360 Photos</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={galleryFormData.description || ''}
                onChange={handleGalleryInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={galleryFormData.is_featured}
                onChange={handleGalleryInputChange}
                className="rounded"
              />
              <span className="ml-2 text-gray-700">Featured Gallery</span>
            </label>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading
                  ? 'Saving...'
                  : editingGalleryId
                  ? 'Update Gallery'
                  : 'Create Gallery'}
              </button>
              <button
                type="button"
                onClick={resetGalleryForm}
                className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Galleries List and Image Upload */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Galleries List */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Galleries</h2>
          {isLoading && !selectedGallery ? (
            <p className="text-gray-500">Loading galleries...</p>
          ) : galleries.length === 0 ? (
            <p className="text-gray-500 text-sm">No galleries found</p>
          ) : (
            <div className="space-y-2">
              {galleries.map((gallery) => (
                <div
                  key={gallery.gallery_id}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    selectedGallery?.gallery_id === gallery.gallery_id
                      ? 'bg-blue-50 border-blue-300'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectGallery(gallery)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {gallery.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {gallery.image_count} images • {gallery.gallery_type}
                      </p>
                      {gallery.is_featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded mt-2">
                          ⭐ Featured
                        </span>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditGallery(gallery);
                      }}
                      className="text-blue-600 hover:text-blue-800 text-xs"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload Section */}
        <div className="lg:col-span-2">
          {selectedGallery ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  {selectedGallery.name} - Upload Images
                </h2>

                {/* Image Upload Form */}
                <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600 mb-6">
                  <h3 className="font-semibold mb-4">Add Image</h3>
                  <form onSubmit={handleUploadImage} className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image File *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="image-input"
                        />
                        <label htmlFor="image-input" className="cursor-pointer">
                          <div className="text-4xl mb-2">📁</div>
                          <p className="text-gray-700">
                            {uploadFile
                              ? uploadFile.name
                              : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, GIF, WebP or MP4 up to 10MB
                          </p>
                        </label>
                      </div>
                      {hasFieldError(imageErrors, 'file') && (
                        <p className="text-red-500 text-sm mt-2">
                          {getFieldError(imageErrors, 'file')}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={imageFormData.title}
                          onChange={handleImageInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                            hasFieldError(imageErrors, 'title')
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                          placeholder="e.g., Temple Main Hall"
                        />
                        {hasFieldError(imageErrors, 'title') && (
                          <p className="text-red-500 text-sm mt-1">
                            {getFieldError(imageErrors, 'title')}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Photographer
                        </label>
                        <input
                          type="text"
                          name="photographer"
                          value={imageFormData.photographer}
                          onChange={handleImageInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Photographer name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Caption
                      </label>
                      <textarea
                        name="caption"
                        value={imageFormData.caption}
                        onChange={handleImageInputChange}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Image description or caption"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={isUploadingImage || !uploadFile}
                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                      >
                        {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                      </button>
                      <button
                        type="button"
                        onClick={resetImageForm}
                        className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                </div>

                {/* Images List */}
                <div>
                  <h3 className="font-semibold mb-4">
                    Gallery Images ({galleryImages.length})
                  </h3>
                  {galleryImages.length === 0 ? (
                    <p className="text-gray-500 text-sm">No images in this gallery yet</p>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      {galleryImages.map((image) => (
                        <div
                          key={image.image_id}
                          className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                        >
                          <div className="relative bg-gray-100 h-32 overflow-hidden">
                            <img
                              src={image.thumbnail_url || image.image_url}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                            {image.is_featured && (
                              <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded text-xs font-semibold">
                                ⭐ Featured
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <h4 className="font-semibold text-sm text-gray-900 truncate">
                              {image.title}
                            </h4>
                            {image.photographer && (
                              <p className="text-xs text-gray-600">
                                by {image.photographer}
                              </p>
                            )}
                            <div className="flex gap-2 mt-3">
                              <button
                                onClick={() => handleSetFeaturedImage(image.image_id)}
                                disabled={image.is_featured}
                                className="flex-1 text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition disabled:opacity-50"
                              >
                                ⭐ Feature
                              </button>
                              {deleteConfirmImage === image.image_id ? (
                                <>
                                  <button
                                    onClick={() => handleDeleteImage(image.image_id)}
                                    className="flex-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                  >
                                    Confirm
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirmImage(null)}
                                    className="flex-1 text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirmImage(image.image_id)}
                                  className="flex-1 text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Delete Gallery Button */}
              <div className="flex gap-3 pt-4 border-t">
                {deleteConfirmGallery === selectedGallery.gallery_id ? (
                  <>
                    <button
                      onClick={() => handleDeleteGallery(selectedGallery.gallery_id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      Confirm Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirmGallery(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmGallery(selectedGallery.gallery_id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                  >
                    Delete Gallery
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Select a gallery to manage images</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminGalleryPage;
