import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(data => console.log(data))
    //Проверка на авторизованность
    this.authService.checkAuth().subscribe(data => {
      if (data) {
        this.router.navigate(['/content']);
      }

    });
  }

  checkInput( {errors}: AbstractControl) {
    if (!errors) {
      return;
    }
    if (errors['required']) {
      return 'Поле должно быть заполнено';
    }
    return 'Неверное содержание поля';
  }
  onSubmit() {
    const {email, password } = this.form.value;
    this.authService.login(email, password).subscribe(data => {
      this.router.navigate(['/content']);
    }, error => console.log(error));
  }
}
