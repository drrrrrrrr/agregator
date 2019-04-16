import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {UserCategoryService} from '../../user/user-category.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, this.isPasswordMatch.bind(this)]),
    confirmPassword: new FormControl('', [Validators.required, this.isPasswordMatch.bind(this)])

  });
  constructor(private authService: AuthService,
              private router: Router,
              private userCategory: UserCategoryService) { }

  ngOnInit() {
  }

  checkInput( {errors}: AbstractControl) {
    if (!errors) {
      return;
    }
    if (errors['equals']) {
      return 'Пароли должны совпадать';
    }
    if (errors['required']) {
      return 'Поле должно быть заполнено';
    }
    if (errors['email']) {
      return 'Не верный формат email';
    }
    return 'Неверное содержание поля';
  }

  isPasswordMatch() {
    if (this.form) {
      if (this.form.controls['confirmPassword'].value.length  <=  0) {
        return null;
      }
      if (this.form.controls['password'].value !== this.form.controls['confirmPassword'].value) {
        return {
          equals: 'Пароли не совпадают'
        };
      }
    }
    return null;

  }
  onSubmit() {
     this.authService.createUser(this.form.controls['email'].value, this.form.controls['password'].value).pipe(switchMap(data => this.userCategory.categoriesInit(this.form.controls['email'].value))).subscribe(
        data => {
          this.router.navigate(['/content']);
        });
  }

}
