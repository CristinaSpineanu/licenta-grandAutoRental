import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { Constants } from '../shared/constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {
public raspunsMessage:any;
public data:any;

	public  constructor(
    private dashboardService:DashboardService,
    private snackbarService:SnackbarService,
  ) {
    this.dashboarData();
	}


  public dashboarData(){
    this.dashboardService.getDetails().subscribe((rasp:any)=>{
      this.data=rasp;
    },(error:any)=>{
      console.log(error);
      if(error.error?.message){
        this.raspunsMessage=error.error?.message;
      }else{
        this.raspunsMessage=Constants.eroareGenerica;
      }

      this.snackbarService.openSnackBar(this.raspunsMessage,Constants.eroare)
    })

  }

}
