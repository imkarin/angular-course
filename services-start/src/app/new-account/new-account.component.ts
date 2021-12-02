import { Component, EventEmitter, Output } from '@angular/core';
import { LoggingService } from '../logging.service';
// DON'T just import the LoggingService here and manually make a new instance of it in your code,
// Angular provides a much better way of accessing your services

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService] // we need to specify the type of what we want Angular to provide us with
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private loggingService: LoggingService) {}  // the name can be whatever you want,
                                                        // the type needs to be the classname of your service
  // Angular is responsible for creating our component, so by putting this in the constructor,
  // Angular will instantiate an instance of the LoggingService class for us correctly
  // Now Angular only knows WHAT we want, but not HOW to give it to us, we have to specify this in the
  // @Component decorator (we will provide a service, telling Angular how to create it)

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    this.loggingService.logStatusChange(accountStatus);
    // ^ now we're using the instance that angular has created for us 
  }
}
