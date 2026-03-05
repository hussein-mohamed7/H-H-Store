import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatched():ValidatorFn{
  return(control:AbstractControl):ValidationErrors|null=>{
    let password = control.get("password")
    let repassword = control.get("repassword")

    if(!password||!repassword||!password.value||!repassword.value){
      return null;
    }

    let errVal = {'unMatchedPassword':{'pass':password.value,'repass':repassword.value}}
    return password.value === repassword.value ? null : errVal
  }
}
