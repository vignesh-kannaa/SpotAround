import { AbstractControl } from '@angular/forms';

export function passvalidator(control:AbstractControl){
    if(control && (control.value !==null || control.value!==undefined )){
        const confirmpass=control.value;
        const password=control.root.get('password');
        
        if(password){
            if(password.value!==confirmpass){
                return {isError:true};
            }
        }

    }
    return null;
}