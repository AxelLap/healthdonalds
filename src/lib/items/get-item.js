import { collection, getDocs } from "firebase/firestore";

import { db } from "../firesbase";

export const getItems = async () => {
  const itemsCollection = collection(db, "items");

  const itemsResult = await getDocs(itemsCollection);

  const data = [];

  itemsResult.forEach((i) => {
    data.push({
      id: i.id,
      ...i.data(),
    });
  });

  return data;
};
