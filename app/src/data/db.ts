import { type DBSchema, openDB } from "idb";
import type { DbTemplate } from "./DbTemplate.type";
import type { DbTemplateInstance } from "./DbTemplateInstance.type";
import type { DbTimeSlot } from "./DbTimeSlot.type";
import type { DbTodoItem } from "./DbTodoItem.type";

export interface TemplaTodoDb extends DBSchema {
  'templates': {
    key: number;
    value: DbTemplate;
  },
  'timeSlots': {
    key: number;
    value: DbTimeSlot;
  },
  'todoItems': {
    key: number;
    value: DbTodoItem;
  },
  'templateInstances': {
    key: number;
    value: DbTemplateInstance;
  },
}

export async function openDb() {
  const db = await openDB<TemplaTodoDb>('templatodo', 2, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('templates')) {
        db.createObjectStore('templates', { keyPath: 'key', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('timeSlots')) {
        db.createObjectStore('timeSlots', { keyPath: 'key', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('todoItems')) {
        db.createObjectStore('todoItems', { keyPath: 'key', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('templateInstances')) {
        db.createObjectStore('templateInstances', { keyPath: 'key', autoIncrement: true });
      }
    }
  });

  return db;
}
