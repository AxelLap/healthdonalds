import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../firesbase";

export const getItems = async (category) => {
  let request = collection(db, "items");

  if (category) {
    request = query(collection(db, "items"), where("category", "==", category));
  }

  const itemsResult = await getDocs(request);

  const data = [];

  itemsResult.forEach((i) => {
    data.push({
      id: i.id,
      ...i.data(),
    });
  });

  return data;
};
