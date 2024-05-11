"use client";

import { addRecord } from "@/actions";

export default function Button() {
  const addRecordHandler = async () => {
    await addRecord();
  };

  return <button onClick={addRecordHandler}>Hello</button>;
}
