import { DBSchema, openDB } from "idb";
import { Template } from "./Template.type";
import { TemplateInstance } from "./TemplateInstance.type";

export interface TemplaTodoDb extends DBSchema {
  'templates': {
    key: string;
    value: Template;
  },
  'templateInstances': {
    key: string;
    value: TemplateInstance;
  }
}

export async function initDb() {
  const db = await openDB<TemplaTodoDb>('templatodo', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('templates')) {
        db.createObjectStore('templates', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('templateInstances')) {
        db.createObjectStore('templateInstances', { keyPath: 'id', autoIncrement: true });
      }
    }
  });

  return db;
}
