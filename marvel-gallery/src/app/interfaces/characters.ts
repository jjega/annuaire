import { Injectable } from '@angular/core';

export interface Charactere{
  id: number,
  name: string,
  image: string
}

@Injectable()
export abstract class CharactereListService {
  /**
   * Returns a list of all of Characteres.
   */
  abstract getTodos(): Charactere[];
}