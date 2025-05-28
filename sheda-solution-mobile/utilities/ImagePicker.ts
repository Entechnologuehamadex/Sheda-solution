// import { useState } from 'react';
// import * as ImagePicker from 'expo-image-picker';

// const getMedia = () =>  {
//   const [images, setImage] = useState<string | null>(null);

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ['images', 'videos'],
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     // console.log(result);

//     if (!result.canceled) {
//     setImage(result.assets[0].uri);
//       (result.assets[0].uri);
//     }
//   }

//   pickImage()
// }

// export default getMedia;
