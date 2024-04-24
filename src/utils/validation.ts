export class Validation {

  static isValidCPF(cpf: string): boolean {
      let sum;
      let rest;
      sum = 0;

      if (cpf === "00000000000") return false;

      for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      rest = (sum * 10) % 11;

      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(9, 10))) return false;

      sum = 0;
      for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      rest = (sum * 10) % 11;

      if (rest === 10 || rest === 11) rest = 0;
      if (rest !== parseInt(cpf.substring(10, 11))) return false;
      return true;
  };

  static isValidPhoneNumber(numberPhone: string): boolean{
      const regexPhone = /^\(\d{2}\)9\d{4}-\d{4}$/;

      return regexPhone.test(numberPhone);
  }


  static isValidDate(dateString: string | null): boolean {
       // Se a string for null, considera-se válida (porque o campo é nullable)
       if (dateString === null) {
        return true;
    }

    // Expressão regular para verificar o formato dd/mm/aaaa
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    // Retorna false se a string não corresponder ao formato
    if (!dateRegex.test(dateString)) {
        return false;
    }

    // Extrai o dia, mês e ano da string de data
    const [day, month, year] = dateString.split('/').map(Number);

    // Cria um objeto de data com o ano, mês e dia
    const date = new Date(year, month - 1, day);

    // Verifica se o ano, mês e dia correspondem ao objeto de data
    // (isso garante que a data é válida, por exemplo, não permite 30 de fevereiro)
    return date && date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;
}

}
