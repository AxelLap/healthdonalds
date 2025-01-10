import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firesbase";

export const setItem = async (id, item) => {
  console.log("setItem called with:", id, item);
  // instanceof File permet de vérifier si image est un objet de type File
  if (item.image instanceof File) {
    //upload de l'image
    const path = `images/${item.image.name}`;
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, item.image);
    //download de l'image
    const downloadUrl = await getDownloadURL(storageRef);
    item.image = downloadUrl;
    item.imagePath = path;
  }
  const file = doc(db, "items", id);
  await setDoc(file, item);
};
