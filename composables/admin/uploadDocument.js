import { db, storage } from "~/firebase.config";
import useSnackbar from "../showSnackbar";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ref as firebaseRef } from "firebase/storage";

export default async function useUploadDocument(
  collectionName,
  formData,
  imageFile
) {
  const uploadDoc = async () => {
    if (imageFile) {
      const imageFileRef = firebaseRef(
        storage,
        `${collectionName}/${Date.now() + imageFile.name}`
      );
      const uploadImageTask = uploadBytesResumable(imageFileRef, imageFile);
      //TODO: Fix this so that it awaits the image upload before uploading md file
      uploadImageTask.on(
        "state_changed",
        () => {},
        () => {},
        async () => {
          await getDownloadURL(uploadImageTask.snapshot.ref).then(
            async (imageDownloadURL) => {
              try {
                await addDoc(collection(db, collectionName), {
                  ...formData,
                  image: { src: imageDownloadURL, alt: "" },
                  dateUploaded: Date.now(),
                });
                useSnackbar("Article created");
              } catch (error) {
                useSnackbar("Error creating article");
              }
            }
          );
        }
      );
    } else {
      try {
        await addDoc(collection(db, collectionName), {
          ...formData,
          dateUploaded: Date.now(),
        });
        useSnackbar("Article created");
      } catch (error) {
        useSnackbar("Error creating article");
      }
    }
  };
  await uploadDoc();
}
