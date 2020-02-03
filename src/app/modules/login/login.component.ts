import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = [];
  notifyMessage = "";

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.createForm();
    this.route.params.subscribe(params => {
      if (params.registered === "success") {
        this.notifyMessage =
          "You have been successfully registered, you can log in now";
      }
    });
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    console.log(this.loginForm.value);
<<<<<<< HEAD
    // this.auth.login(this.loginForm.value).subscribe(
      // token => {
        console.log("login func in login component");
        this.router.navigate(["/"]);
      // },
      // errorResponse => {
      //   console.log(errorResponse);
      //   // this.errors = errorResponse.error.errors;
      // }
    // );
=======
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        if (token.errors) {
          console.log(token.errors[0].message);
        } else {
          if (token.data.login.isSuperAdmin) {
            console.log(" this is the superAdmin");
            this.router.navigate(["/"]);
          } else if (token.data.login.Admin) {
            console.log(token);
            console.log("this is the Admin");
            this.router.navigate(["/"]);
          } else {
            console.log("this is the user");
            this.router.navigate(["/login"]);
          }
        }
      },
      errorResponse => {
        console.log(errorResponse);
        // this.errors = errorResponse.error.errors;
      }
    );
>>>>>>> 620ff1c5a07cfd6616eaeac1a939a4c5ce4837dd
  }
}
