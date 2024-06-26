import { Injectable } from '@angular/core';
import Swal, {SweetAlertIcon, SweetAlertResult} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  alert(title : string, text: string, icon: SweetAlertIcon, showDenyButton: boolean = false) : Promise<SweetAlertResult>   {
    return Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showDenyButton: showDenyButton, 
      denyButtonText: "Não",
      allowOutsideClick: false,
    })
  }
}
