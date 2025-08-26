import type React from "react";
import { View, TouchableOpacity, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import InterRegular from "../Text/InterRegular";
import { useApi } from "@/contexts/ApiContext";

interface PhotoUploadProps {
  onPhotosChange: (photos: string[]) => void;
  photos: string[];
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotosChange,
  photos,
}) => {
  const { uploadFile } = useApi();

  const pickImage = async () => {
    try {
      // Request permission to access media library before opening picker
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Please allow photo library access to upload property photos."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const asset = result.assets[0];
        const file: any = {
          uri: asset.uri,
          name: (asset as any).fileName || `property_${Date.now()}.jpg`,
          type: (asset as any).mimeType || "image/jpeg",
        };

        // Upload the image to the server
        const uploadedFile = await uploadFile("property", file);

        // Add the uploaded file URL to photos
        const newPhotos = [...photos, uploadedFile.file_url];
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload image. Please try again.");
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const renderPhotoSlot = (index: number) => {
    const hasPhoto = photos[index];

    return (
      <TouchableOpacity
        key={index}
        onPress={hasPhoto ? () => removePhoto(index) : pickImage}
        className="w-[48%] aspect-square bg-gray-100 rounded-lg mb-4 justify-center items-center border border-borderColor"
      >
        {hasPhoto ? (
          <Image
            source={{ uri: hasPhoto }}
            className="w-full h-full rounded-lg"
            resizeMode="cover"
          />
        ) : (
          <View className="justify-center items-center">
            <InterRegular className="text-primary text-2xl">+</InterRegular>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <InterRegular className="text-base mb-4">
        Add at least 4 photos
      </InterRegular>
      <View className="flex-row flex-wrap justify-between">
        {[0, 1, 2, 3].map(renderPhotoSlot)}
      </View>

      {photos.length >= 4 && (
        <TouchableOpacity
          onPress={pickImage}
          className="flex-row items-center mt-4"
        >
          <InterRegular className="text-base mr-2">Add more</InterRegular>
          <InterRegular className="text-primary text-xl">+</InterRegular>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PhotoUpload;
