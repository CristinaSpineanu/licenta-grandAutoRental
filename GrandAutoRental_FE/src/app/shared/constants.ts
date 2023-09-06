export class Constants{
  //Mesaje
  public static eroareGenerica: string = "Ceva nu a mers bine! Te rog reîncearcă!";
  public static neautorizat: string = "Nu ești autorizat pentru a accesa această pagină!";
  public static masinaExistaEroare: string = "Mașina există deja!";
  public static masinaAdaugata: string = "Mașina a fost adăugată cu success!";

  //Regex
  public static regexNume:string = "^[a-zA-Z]+( [a-zA-Z]+)*$";
  public static regexEmail:string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  public static regexNumarTelefon: string = "^0[0-9]{9}$";

  //variabile
  public static eroare:string ="eroare";

}
