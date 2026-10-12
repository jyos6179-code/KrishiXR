import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { ScanResult } from '../types/crop';

interface KrishiDB extends DBSchema {
  scans: {
    key: string;
    value: ScanResult;
    indexes: { 'by-timestamp': number };
  };
  taskProgress: {
    key: string;
    value: {
      taskId: string;
      completedSteps: number[];
      isCertified: boolean;
      certifiedAt?: number;
    };
  };
  simulationRuns: {
    key: string;
    value: {
      id: string;
      timestamp: number;
      yieldAchieved: number;
      soilHealth: number;
      waterSavedLiters: number;
      grade: string;
    };
  };
}

const DB_NAME = 'krishixr-offline-db';
const DB_VERSION = 1;

class StorageService {
  private dbPromise: Promise<IDBPDatabase<KrishiDB>> | null = null;

  constructor() {
    this.initDB();
  }

  private initDB() {
    if (typeof window === 'undefined') return;

    this.dbPromise = openDB<KrishiDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('scans')) {
          const scanStore = db.createObjectStore('scans', { keyPath: 'id' });
          scanStore.createIndex('by-timestamp', 'timestamp');
        }
        if (!db.objectStoreNames.contains('taskProgress')) {
          db.createObjectStore('taskProgress', { keyPath: 'taskId' });
        }
        if (!db.objectStoreNames.contains('simulationRuns')) {
          db.createObjectStore('simulationRuns', { keyPath: 'id' });
        }
      },
    }).catch(err => {
      console.warn('IndexedDB unavailable, falling back to localStorage:', err);
      return null as any;
    });
  }

  // --- Scan History ---
  public async saveScan(scan: ScanResult): Promise<void> {
    try {
      const db = await this.dbPromise;
      if (db) {
        await db.put('scans', scan);
        return;
      }
    } catch {
      // fallback
    }

    try {
      const existing = this.getLocalStorageScans();
      const updated = [scan, ...existing.filter(s => s.id !== scan.id)].slice(0, 50);
      localStorage.setItem('krishi_scans', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save scan to localStorage:', e);
    }
  }

  public async getScans(): Promise<ScanResult[]> {
    try {
      const db = await this.dbPromise;
      if (db) {
        const tx = db.transaction('scans', 'readonly');
        const index = tx.store.index('by-timestamp');
        const records = await index.getAll();
        return records.reverse(); // newest first
      }
    } catch {
      // fallback
    }

    return this.getLocalStorageScans();
  }

  public async deleteScan(id: string): Promise<void> {
    try {
      const db = await this.dbPromise;
      if (db) {
        await db.delete('scans', id);
        return;
      }
    } catch {
      // fallback
    }

    const scans = this.getLocalStorageScans().filter(s => s.id !== id);
    localStorage.setItem('krishi_scans', JSON.stringify(scans));
  }

  public async clearAllScans(): Promise<void> {
    try {
      const db = await this.dbPromise;
      if (db) {
        await db.clear('scans');
      }
    } catch {
      // fallback
    }
    localStorage.removeItem('krishi_scans');
  }

  private getLocalStorageScans(): ScanResult[] {
    try {
      const data = localStorage.getItem('krishi_scans');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  // --- Task Progress ---
  public async getTaskProgress(taskId: string): Promise<{ completedSteps: number[]; isCertified: boolean }> {
    try {
      const db = await this.dbPromise;
      if (db) {
        const rec = await db.get('taskProgress', taskId);
        if (rec) return { completedSteps: rec.completedSteps, isCertified: rec.isCertified };
      }
    } catch {
      // fallback
    }

    try {
      const data = localStorage.getItem(`krishi_task_${taskId}`);
      return data ? JSON.parse(data) : { completedSteps: [], isCertified: false };
    } catch {
      return { completedSteps: [], isCertified: false };
    }
  }

  public async saveTaskProgress(taskId: string, completedSteps: number[], isCertified: boolean): Promise<void> {
    const val = { taskId, completedSteps, isCertified, certifiedAt: isCertified ? Date.now() : undefined };
    try {
      const db = await this.dbPromise;
      if (db) {
        await db.put('taskProgress', val);
        return;
      }
    } catch {
      // fallback
    }

    localStorage.setItem(`krishi_task_${taskId}`, JSON.stringify(val));
  }
}

export const storageService = new StorageService();
