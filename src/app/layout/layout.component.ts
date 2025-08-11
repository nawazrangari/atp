import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChatsService } from '../service/chats.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  /** Store orignal data*/
  public webSiteData: any[] = [];
 /** this variable used for api data */
  public chatsData: any[] = [];
  /** Store date */
  public fromAndToDate: Date[] = [];
  /** this variable store total missedchat */
  public totalMissedChat = 0;
  /** this variable store total chats */
  public totalChat = 0

  constructor(private chatsService : ChatsService) 
  { 
  }

  ngOnInit(): void {
    this.getChatsData();
  }

   /** this methos get all data from the server using service */
  public getChatsData(){
    this.chatsService.getChatsData().subscribe(data=>{
      this.webSiteData = data
      this.chatsData = data;
      this.calculateChart();
    })
  }

/** this methos used for check fromdate to todate */
  public onDateChange(value: any): void {
    const fromDate = new Date(value[0]);
    const toDate = new Date(value[1]);
    this.chatsData = this.webSiteData.filter((item) => {
     const itemDate = new Date(item.date);
     return itemDate >= fromDate && itemDate <= toDate;
    });
   this.calculateChart();
  }

   /** this methos used for sum of total chats and sum of missedchats */
  private calculateChart(): void {
    this.totalChat = 0;
    this.totalMissedChat = 0;
    this.chatsData.forEach((item) => {
      this.totalChat += item.chats
    });
    this.chatsData.forEach((item) => {
        this.totalMissedChat += item.missedChats;
    });  
  }
}
