import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file, name, status, tech, workUrl) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("works");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        const names = name;
        const statuses = status;
        const techs = tech;
        const workUrls = workUrl;
        collectionRef.add({
          url: url,
          createdAt: createdAt,
          name: names,
          status: statuses,
          techs: techs,
          workUrl: workUrls,
        });
        setUrl(url);
      }
    );
  }, [file, name, status, tech, workUrl]);
  return { progress, url, error };
};

export default useStorage;
