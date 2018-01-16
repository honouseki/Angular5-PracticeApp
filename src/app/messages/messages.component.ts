import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {


  // Public vs Private; this must be public as we're binding it to the html template
  //     Angular ONLY binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
