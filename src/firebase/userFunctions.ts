import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './config';

export const checkIfUserExists = async (username : string) => {
    try {
        const q = query(collection(db, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;  // Retorna true si el usuario existe
    } catch (error) {
        console.error('Error al comprobar el usuario:', error);
        return false; // Si hay error, asumimos que el usuario no existe
    }
};