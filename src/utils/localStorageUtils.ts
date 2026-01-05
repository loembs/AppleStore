/**
 * Utilitaires pour gérer le localStorage de manière sécurisée
 */
export class LocalStorageUtils {
  /**
   * Stocke une valeur dans localStorage
   */
  static setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans localStorage pour la clé "${key}":`, error);
    }
  }

  /**
   * Récupère une valeur depuis localStorage
   */
  static getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Erreur lors de la lecture depuis localStorage pour la clé "${key}":`, error);
      return null;
    }
  }

  /**
   * Stocke un objet JSON dans localStorage
   */
  static setJSONItem<T>(key: string, value: T): void {
    try {
      const jsonString = JSON.stringify(value);
      localStorage.setItem(key, jsonString);
    } catch (error) {
      console.error(`Erreur lors de l'écriture JSON dans localStorage pour la clé "${key}":`, error);
    }
  }

  /**
   * Récupère un objet JSON depuis localStorage
   */
  static getJSONItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Erreur lors de la lecture JSON depuis localStorage pour la clé "${key}":`, error);
      return null;
    }
  }

  /**
   * Supprime une clé de localStorage
   */
  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Erreur lors de la suppression depuis localStorage pour la clé "${key}":`, error);
    }
  }

  /**
   * Vide tout le localStorage
   */
  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Erreur lors du vidage de localStorage:', error);
    }
  }
}

