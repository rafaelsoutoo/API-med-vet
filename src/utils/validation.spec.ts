import { describe, expect, it } from "vitest";
import { Validation } from "./validation";


describe('testing the CPF validation', () => {
  it('when the 00000000000', () => {
    const test = Validation.isValidCPF('00000000000');
    expect(test).toBeFalsy();
  });

  it('when invalid', () => {
    const test = Validation.isValidCPF('12345678901');
    expect(test).toBeFalsy();
  });

  it('twhen the cpf is valid', () => {
    const test = Validation.isValidCPF('00538298081');
    expect(test).toBeTruthy();
  });

  it('with empty string', () => {
    const test = Validation.isValidCPF('');
    expect(test).toBeFalsy();
  });

  it('with invalid format', () => {
    const test = Validation.isValidCPF('abc123');
    expect(test).toBeFalsy();
  });

  it('with less than 11 digits', () => {
    const test = Validation.isValidCPF('1234567890');
    expect(test).toBeFalsy();
  });

  it('with more than 11 digits', () => {
    const test = Validation.isValidCPF('123456789012');
    expect(test).toBeFalsy();
  });

  it('with all digits equal', () => {
    const test = Validation.isValidCPF('2222222222');
    expect(test).toBeFalsy();
  });

  it('with invalid check digits', () => {
    const test = Validation.isValidCPF('00538298080');
    expect(test).toBeFalsy();
  });

  it('with special characters', () => {
    const test = Validation.isValidCPF('005.382.980-81');
    expect(test).toBeFalsy();
  });

  it('with spaces', () => {
    const test = Validation.isValidCPF('005 382 980 81');
    expect(test).toBeFalsy();
  });
});

describe('testing the phone number validation ', () => {
  it('with valid format', () => {
    const test = Validation.isValidPhoneNumber('11912345678');
    expect(test).toBeTruthy();
  });

  it('with invalid format', () => {
    const test = Validation.isValidPhoneNumber('912345678');
    expect(test).toBeFalsy();
  });

  it('with invalid characters', () => {
    const test = Validation.isValidPhoneNumber('1191234abcd');
    expect(test).toBeFalsy();
  });

  it('with less than 11 digits', () => {
    const test = Validation.isValidPhoneNumber('1191235678');
    expect(test).toBeFalsy();
  });

  it('with more than 11 digits', () => {
    const test = Validation.isValidPhoneNumber('1191234567890');
    expect(test).toBeFalsy();
  });

  it('with invalid DDD', () => {
    const test = Validation.isValidPhoneNumber('02912345678');
    expect(test).toBeFalsy();
  });

  it('with empty string', () => {
    const test = Validation.isValidPhoneNumber('');
    expect(test).toBeFalsy();
  });

  it('with spaces', () => {
    const test = Validation.isValidPhoneNumber('11 912345678');
    expect(test).toBeFalsy();
  });
});

describe('testing the date validation ', () => {
  it('with valid format', () => {
    const test = Validation.isValidDate('10/05/2024');
    expect(test).toBeTruthy();
  });

  it('with invalid format', () => {
    const test = Validation.isValidDate('2024/05/10');
    expect(test).toBeFalsy();
  });

  it('with invalid day', () => {
    const test = Validation.isValidDate('32/05/2024');
    expect(test).toBeFalsy();
  });

  it('with invalid month', () => {
    const test = Validation.isValidDate('10/13/2024');
    expect(test).toBeFalsy();
  });

  it('with invalid year', () => {
    const test = Validation.isValidDate('10/05/10000');
    expect(test).toBeFalsy();
  });

  it('with empty string', () => {
    const test = Validation.isValidDate('');
    expect(test).toBeFalsy();
  });

  it('with null', () => {
    const test = Validation.isValidDate(null);
    expect(test).toBeTruthy();
  });

  it('with February day wrong', () => {
    const test = Validation.isValidDate('30/02/2023');
    expect(test).toBeFalsy()
  })

  it('with leap year', () => {
    const test1 = Validation.isValidDate('29/02/1988')//1988 é bissesto então pode ter dia 29 no mes de fevereiro
    const test2 = Validation.isValidDate('29/02/1989')//1989 não é bissesto então não pode ter dia 29 em fevereiro

    expect(test1).toBeTruthy()
    expect(test2).toBeFalsy()
  })
});

describe('testing the CPF validation', () => {
  it('when the 00000000000', () => {
    const test = Validation.isValidCPForNull('00000000000');
    expect(test).toBeFalsy();
  });

  it('when invalid', () => {
    const test = Validation.isValidCPForNull('12345678901');
    expect(test).toBeFalsy();
  });

  it('twhen the cpf is valid', () => {
    const test = Validation.isValidCPForNull('00538298081');
    expect(test).toBeTruthy();
  });

  it('with empty string', () => {
    const test = Validation.isValidCPForNull('');
    expect(test).toBeTruthy();
  });

  it('with invalid format', () => {
    const test = Validation.isValidCPForNull('abc123');
    expect(test).toBeFalsy();
  });

  it('with less than 11 digits', () => {
    const test = Validation.isValidCPForNull('1234567890');
    expect(test).toBeFalsy();
  });

  it('with more than 11 digits', () => {
    const test = Validation.isValidCPForNull('123456789012');
    expect(test).toBeFalsy();
  });

  it('with all digits equal', () => {
    const test = Validation.isValidCPForNull('11111111111');
    expect(test).toBeFalsy();
  });

  it('with invalid check digits', () => {
    const test = Validation.isValidCPForNull('00538298080');
    expect(test).toBeFalsy();
  });

  it('with special characters', () => {
    const test = Validation.isValidCPForNull('005.382.980-81');
    expect(test).toBeFalsy();
  });

  it('with spaces', () => {
    const test = Validation.isValidCPForNull('005 382 980 81');
    expect(test).toBeFalsy();
  });
});