import { DBSchema, openDB } from "idb";
import { DbTemplate } from "./DbTemplate.type";
import { DbTemplateInstance } from "./DbTemplateInstance.type";
import { DbTimeSlot } from "./DbTimeSlot.type";
import { DbTodoItem } from "./DbTodoItem.type";

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
        db.createObjectStore('templates', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('timeSlots')) {
        db.createObjectStore('timeSlots', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('todoItems')) {
        db.createObjectStore('todoItems', { keyPath: 'id', autoIncrement: true });
      }

      if (!db.objectStoreNames.contains('templateInstances')) {
        db.createObjectStore('templateInstances', { keyPath: 'id', autoIncrement: true });
      }
    }
  });

  return db;
}
