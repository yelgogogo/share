class Movie{
    constructor(title,priceCode) { 
      this._title = title;
      this._priceCode = priceCode; 
    }
  
    get priceCode() {
      return this._priceCode;
    }
  
    get price() {
      return this._price;
    }
  
    set priceCode(priceCode) {
      this._priceCode = priceCode;
    }
  
    get title(){
      return this._title;
    }
    /* STEP 9 Move Method */
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
    /* STEP 9 Move Method */
    frequentRenterPoints(daysRented){
        return (this.priceCode === Movie.NEW_RELEASE && daysRented > 1)?2:1;
    }
  } 
  Movie.CHILDRENS =2;
  Movie.REGULAR = 0;
  Movie.NEW_RELEASE = 1;
  
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

    /* STEP 9 Move Method */
    get charge() {
      return this.movie.charge(this._daysRented);
    //   let result = 0;
    //   switch (this.movie.priceCode)        
    //   {
    //     case Movie.REGULAR:
    //       result += 2;
    //       if (this.daysRented > 2) {
    //         result += (this.daysRented - 2) * 1.5;
    //       }
    //     break;
    //     case Movie.NEW_RELEASE:
    //       result += this.daysRented * 3;
    //     break;
    //     case Movie.CHILDRENS:
    //       result += 1.5;
    //       if (this.daysRented > 3) {
    //         result += (this.daysRented - 3) * 1.5;
    //       }
    //     break;
    //   };
    //   return result;
    }

    // get frequentRenterPoints(){
    get frequentRenterPoints(){
    //   return (this.movie.priceCode === Movie.NEW_RELEASE && this.daysRented > 1)?2:1;    
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
  
