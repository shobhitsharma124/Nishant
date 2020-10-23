import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private userservice:UserService,private router:Router) { }

  appointments = [];

  ngOnInit() {
    this.getfitness();
  }
  
  getfitness() {
    this.userservice.getfitnessdata().subscribe((data)=>
    {
        this.appointments = Array.from(Object.keys(data), k=>data[k]);
        
    })
  }

  deletefitness(id:number) {
    this.userservice.deletefitnessdata(id).subscribe((res)=>{
      console.log(res);
    });
    window.location.reload();
  }

  editfitness(id:number){
    this.router.navigateByUrl("place-fitness-trainer-appointment/"+id);
    
  }
  
  confirmation(id:number){
    var confir = confirm("Do you want to delete this entry?");
    if(confir == true){
      this.deletefitness(id);
    } 
  }
}
