import * as classVal from 'class-validator';

export class AuthDto {
  @classVal.IsString()
  @classVal.MinLength(3, {
    message:
      'First Name is too short. Min required length is $constraint1, but actual is $value',
  })
  firstName: string;

  @classVal.IsString()
  @classVal.MinLength(3, {
    message:
      'Last Name is too short. Min required length is $constraint1, but actual is $value',
  })
  lastName: string;

  @classVal.IsEmail()
  @classVal.IsNotEmpty()
  email: string;

  @classVal.IsString()
  @classVal.MinLength(8, {
    message:
      'Password is too short. Min required length is $constraint1, but actual is $value',
  })
  password: string;
}

export class signInDto {
  @classVal.IsEmail()
  @classVal.IsNotEmpty()
  email: string;

  @classVal.IsString()
  @classVal.MinLength(8, {
    message:
      'Password is too short. Min required length is $constraint1, but actual is $value',
  })
  password: string;
}
