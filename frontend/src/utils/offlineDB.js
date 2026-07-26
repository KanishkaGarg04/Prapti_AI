import { openDB } from "idb";

export const dbPromise = openDB("prapti-ai-db", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("reports")) {
      db.createObjectStore("reports", {
        keyPath: "id",
      });
    }
  },
});

export async function saveOfflineReport(id, pdfBlob) {
  const db = await dbPromise;

  await db.put("reports", {
    id,
    pdf: pdfBlob,
    createdAt: new Date(),
  });
}

export async function getOfflineReport(id) {
  const db = await dbPromise;

  return db.get("reports", id);
}

export async function getAllOfflineReports() {
  const db = await dbPromise;

  return db.getAll("reports");
}

export async function deleteOfflineReport(id) {
  const db = await dbPromise;

  return db.delete("reports", id);
}