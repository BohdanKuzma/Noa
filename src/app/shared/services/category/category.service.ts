import { Injectable } from '@angular/core';
import { ICategoryRequest, ICategoryResponse } from '../../interfaces/category.interface';
import { CollectionReference, Firestore, addDoc, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { DocumentData, collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryCollection!: CollectionReference<DocumentData>
  
  constructor(
    private afs: Firestore,
  ) {
    this.categoryCollection = collection(this.afs, 'categories');
  }

  getAllFirebase() {
    return collectionData(this.categoryCollection, { idField: 'id' });
  }

  getOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return docData(categoryDocumentReference, { idField: 'id' });
  }

  getOneFirebasePath(path: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${path}`);
    return docData(categoryDocumentReference, { idField: 'path' });
  }

  createOneFirebase(category: ICategoryRequest) {
    return addDoc(this.categoryCollection, category);
  }

  updateOneFirebase(category: ICategoryRequest, id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return updateDoc(categoryDocumentReference, { ...category });
  }

  deleteOneFirebase(id: string) {
    const categoryDocumentReference = doc(this.afs, `categories/${id}`);
    return deleteDoc(categoryDocumentReference)
  }
}
