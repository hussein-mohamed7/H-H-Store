import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-product',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  adminUpdateProduct!:FormGroup
  constructor(private builder:FormBuilder){
  }
  ngOnInit(): void {
      this.adminUpdateProduct = this.builder.group(
        {
          name:["",[Validators.required]],
          price:["",[Validators.required,Validators.pattern("[0-9][0-9]*")]],
          quantity:["",[Validators.required,Validators.pattern("[0-9][0-9]*")]],
          imageURL:["",[Validators.required]],
          category:["",[Validators.required]],
          gender:["",[Validators.required]],
          description:["",[Validators.required]]
        }
      );
  }

  update()
  {

  }

}
