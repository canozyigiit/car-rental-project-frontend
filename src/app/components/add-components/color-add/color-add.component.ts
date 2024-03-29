import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup
  constructor(private formBuilder: FormBuilder ,private colorService:ColorService,private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm()
  }
  createBrandAddForm() {
    this.colorAddForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }
  add(){
    if(this.colorAddForm.valid){
      let carModel = Object.assign({},this.colorAddForm.value)
      this.colorService.add(carModel).subscribe(response=>{     
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
        console.log(responseError.error.Errors)
        for (let i = 0; i < responseError.error.Errors.length; i++) {
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
        }  
      }
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}
