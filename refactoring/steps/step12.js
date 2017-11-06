class Movie{
    constructor(title,priceCode) { 
      this._title = title;
      this.priceCode = priceCode; 
    }
  
    get priceCode() {
      return this.price.priceCode;
    }

    set priceCode(priceCode) {
        switch (priceCode)        
        {
          case Movie.REGULAR:
            this._price = new RegularPrice();
            break;
          case Movie.NEW_RELEASE:
            this._price = new NewReleasePrice();
            break;
          case Movie.CHILDRENS:
            this._price = new ChildrensPrice();
            break;
          default:
            throw "Incorrect Price Code";
        };
    }
    
    get price() {
      return this._price;
    }
  
    get title(){
      return this._title;
    }
    /* STEP 12 Move Method */
    charge(daysRented){
        // let result = 0;
        // switch (this.priceCode)        
        // {
        //   case Movie.REGULAR:
        //     result += 2;
        //     if (daysRented > 2) {
        //       result += (daysRented - 2) * 1.5;
        //     }
        //   break;
        //   case Movie.NEW_RELEASE:
        //     result += daysRented * 3;
        //   break;
        //   case Movie.CHILDRENS:
        //     result += 1.5;
        //     if (daysRented > 3) {
        //       result += (daysRented - 3) * 1.5;
        //     }
        //   break;
        // };
        // return result;
        return this._price.charge(daysRented);
    }
    frequentRenterPoints(daysRented){
        return (this.priceCode === Movie.NEW_RELEASE && daysRented > 1)?2:1;
    }
} 

Movie.CHILDRENS =2;
Movie.REGULAR = 0;
Movie.NEW_RELEASE = 1;
  
class Price {
    get priceCode(){
    }
    /* STEP 12 Move Method */
    charge(daysRented){
        let result = 0;
        switch (this.priceCode)        
        {
        case Movie.REGULAR:
            result += 2;
            if (daysRented > 2) {
            result += (daysRented - 2) * 1.5;
            }
        break;
        case Movie.NEW_RELEASE:
            result += daysRented * 3;
        break;
        case Movie.CHILDRENS:
            result += 1.5;
            if (daysRented > 3) {
            result += (daysRented - 3) * 1.5;
            }
        break;
        };
        return result;
    }
}

class ChildrensPrice extends Price{
    get priceCode(){
        return Movie.CHILDRENS;
    }
}

class NewReleasePrice extends Price{
    get priceCode(){
        return Movie.NEW_RELEASE;
    }
}

class RegularPrice extends Price{
    get priceCode(){
        return Movie.REGULAR;
    }
}

class Rental {
    constructor(movie,daysRented) {  
      this._movie = movie;
      this._daysRented = daysRented; 
    }
  
    get movie() {
      return this._movie;
    }
  
    get daysRented() {
      return this._daysRented;
    }

    get charge() {
      return this.movie.charge(this._daysRented);
    }

    get frequentRenterPoints(){  
      return this.movie.frequentRenterPoints(this._daysRented);
    }
}
  
class Customer{
    constructor(name) {  
      this._name = name;
    }
  
    addRental(arg){
      if(!this._rentals){
        this._rentals = [];
      }
      this._rentals.push(arg);
  
    }
  
    get name() {
      return this._name;
    }
  
    statement() {
      let result = "Rental Record for " + this.name+ "\n";
      this._rentals.forEach(each => {
        result += '\t' + each.movie.title + '\t' + each.charge +'\n';
      });
      result += 'Amount owed is ' + this.totalCharge + '\n';
      result += 'You earned ' + this.totalFrequentRenterPoints + ' frequent renter points';
      return result;
    }


    get totalFrequentRenterPoints(){
      let result = 0;
      this._rentals.forEach(each => {
        result += each.frequentRenterPoints;
      });
      return result;
    }

    get totalCharge(){
      let result = 0;
      this._rentals.forEach(each => {
        result += each.charge;
      });
      return result;  
    }

}
  
    const movieNew = new Movie('movieNew',1);
    const movieChildren = new Movie('movieChildren',2);
    const movieRegular = new Movie('movieRegular',0);
    const movieChildren2 = new Movie('movieChildren2',2);
    const movieRegular2 = new Movie('movieRegular2',0);
    
    const rentNew = new Rental(movieNew,1);
    const rentChildren = new Rental(movieChildren,1);
    const rentRegular = new Rental(movieRegular,1);
  
    const rentChildren2 = new Rental(movieChildren2,4);
    const rentRegular2 = new Rental(movieRegular2,3);
    const rentNew2 = new Rental(movieNew,2);
  
    let cus1 = new Customer('customer 1');
    cus1.addRental(rentNew);
    cus1.addRental(rentChildren);
    cus1.addRental(rentRegular);
    cus1.addRental(rentRegular2);
    cus1.addRental(rentChildren2);
    cus1.addRental(rentNew2);
  
    // console.log(cus1);
    console.log(cus1.statement());
  
    const test = cus1.statement().split('\n');
    
  
    const answer = [ 'Rental Record for customer 1',
  '\tmovieNew\t3',
  '\tmovieChildren\t1.5',
  '\tmovieRegular\t2',
  '\tmovieRegular2\t3.5',
  '\tmovieChildren2\t3',
  '\tmovieNew\t6',
  'Amount owed is 19',
  'You earned 7 frequent renter points' ]
  console.log(answer);
  console.log(test);
  
  const testResult=answer.map((a,i)=>a===test[i]?'OK':('ERROR in line' + (i+1)));
  console.log(testResult);
  
