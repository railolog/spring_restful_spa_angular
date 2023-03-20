import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[numberValidation]',
  providers: [{
    provide: NG_VALIDATORS, useExisting: NumberValidatorDirective, multi: true
  }]
})
export class NumberValidatorDirective implements Validator{
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == null) return null;

    let v = control.value.replace(',', '.');
    if (typeof +v === "number" && !isNaN(+v)){
      if (v > 3 || v < -3){
        return {notInRange: "Value must be from -3 to 3"};
      }
      return null;
    }
    return { notANumber: "The value is not a number"};
  };
}
