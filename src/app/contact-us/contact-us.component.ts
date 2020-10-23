import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {UserService} from "../_services/user.service";
export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder,private userservice:UserService) { }


  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required,Validators.pattern("[A-Za-z]")]],
      lastname: ["", [Validators.required,Validators.pattern("[A-Za-z]")]],
      phonenumber: ["", [Validators.required,Validators.pattern("[0-9]{10}")]],
      email: ["", [Validators.required,Validators.pattern("[a-z0-9.%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );

    if (this.contactForm.valid) {
      this.userservice.postfitnessdata(this.contactForm.value).subscribe((res)=>{
      console.log(res);
    });

      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
    }
  }
}
