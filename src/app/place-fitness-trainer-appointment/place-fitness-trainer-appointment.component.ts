import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname:string,
    public lastname: string,
    public age:number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'
  
})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  @Output() fitnessdata = new EventEmitter<Fitness>();
  id:number;
  fitnessForm: FormGroup;
  
  public obj: any = {};
  constructor(private fb: FormBuilder,private userservice: UserService,private router:ActivatedRoute) {
    router.params.subscribe((params)=>{
      console.log(params);
      this.id = params.message;
      if(this.id >0){
        this.userservice.getfitnessdatabyid(this.id).subscribe((res)=>{
          console.log(res);
          this.setFormData(res);
        })
      }
    })
   }
  

  ngOnInit() {
    this.fitnessForm = this.fb.group({
      firstname: ["", [Validators.required,Validators.pattern("[A-Za-z]*")]],
      lastname: ["", [Validators.required,Validators.pattern("[A-Za-z]*")]],
      age: ["", [Validators.required,Validators.min(19),Validators.max(59)]],
      phonenumber: ["", [Validators.required,Validators.pattern("[0-9]{10}")]],
      email: ["", [Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      streetaddress:["",[Validators.required]],
      city: ["", [Validators.required,Validators.pattern("[A-Za-z]*")]],
      state: ["", [Validators.required,Validators.pattern("[A-Za-z]*")]],
      country: ["", [Validators.required,Validators.pattern("[A-Za-z]*")]],
      pincode: ["", [Validators.required,Validators.pattern("[0-9]{6}")]],
      trainerpreference: ["",[Validators.required]],
      physiotherapist: ["",[Validators.required]],
      packages: ["", [Validators.required]],
      inr: ["",[Validators.required]],
      paisa: ["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.fitnessForm.value, ...this.obj };
    this.fitnessForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.fitnessForm.value",
      this.fitnessForm.value
    );
    if(this.fitnessForm.valid && this.id>0){
      this.userservice.editfitnessdata(this.id,this.fitnessForm.value).subscribe((res)=>{
        console.log(res);
        alert('Your appointment has been updated ..!');
      });
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,
          this.fitnessForm.value.packages,
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa
          
        )
      );
    }
    else if(this.fitnessForm.valid) {
      this.userservice.postfitnessdata(this.fitnessForm.value).subscribe((res)=>{
        console.log(res);
        alert('Your appointment has been placed..!');
      });
      this.fitnessdata.emit(
        new Fitness(
          this.fitnessForm.value.firstname,
          this.fitnessForm.value.lastname,
          this.fitnessForm.value.age,
          this.fitnessForm.value.phonenumber,
          this.fitnessForm.value.email,
          this.fitnessForm.value.streetaddress,
          this.fitnessForm.value.city,
          this.fitnessForm.value.state,
          this.fitnessForm.value.country,
          this.fitnessForm.value.pincode,
          this.fitnessForm.value.trainerpreference,
          this.fitnessForm.value.physiotherapist,
          this.fitnessForm.value.packages,
          this.fitnessForm.value.inr,
          this.fitnessForm.value.paisa
          
        )
      );
    }
  }

  setFormData(res:any){
    this.fitnessForm.setValue({
      firstname:res.firstname,
      lastname:res.lastname,
      age: res.age,
      phonenumber:res.phonenumber,
      email: res.email,
      streetaddress:res.streetaddress,
      city:res.city,
      state:res.state,
      country:res.country,
      pincode:res.pincode,
      trainerpreference:res.trainerpreference,
      physiotherapist: res.physiotherapist,
      packages:res.packages,
      inr:res.inr,
      paisa:res.paisa
    })
  }
    
}
