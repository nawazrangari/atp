import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ChatsService {
  
 /**URL for web API */
 public baseURL: string;

  constructor(private http : HttpClient) { 
    this.baseURL = 'http://45.79.111.106/';
  }     

  /**
   * @description this method get chats data
   */
   public getChatsData(): Observable<any[]> {
     const url = this.baseURL + 'interview.json';
    return this.http.get<any[]>(url);
  }
}
