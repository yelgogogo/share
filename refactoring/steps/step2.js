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
      let totalAmount = 0;
      let frequentRenterPoints = 0;
      let result = "Rental Record for " + this.name+ "\n";
      this._rentals.forEach(each => {
        let thisAmount = 0;
        thisAmount = this.amountFor(each);
        // switch (each.movie.priceCode)        
        // {
        //   case Movie.REGULAR:
        //     thisAmount += 2;
        //     if (each.daysRented > 2) {
        //       thisAmount += (each.daysRented - 2) * 1.5;
        //     }
        //     break;
        //   case Movie.NEW_RELEASE:
        //     thisAmount += each.daysRented * 3;
        //     break;
        //   case Movie.CHILDRENS:
        //     thisAmount += 1.5;
        //     if (each.daysRented > 3) {
        //       thisAmount += (each.daysRented - 3) * 1.5;
        //     }
        //     break;
        // };
        frequentRenterPoints ++;
        if (each.movie.priceCode === Movie.NEW_RELEASE && each.daysRented > 1){
          frequentRenterPoints += 1;
        }
        result += '\t' + each.movie.title + '\t' + thisAmount +'\n';
        totalAmount += thisAmount;
      });
      result += 'Amount owed is ' + totalAmount + '\n';
      result += 'You earned ' + frequentRenterPoints + ' frequent renter points';
      return result;
    }

    /* STEP 2 Extract Method */
    amountFor(each) {
        let thisAmount = 0;
        switch (each.movie.priceCode)        
        {
          case Movie.REGULAR:
            thisAmount += 2;
            if (each.daysRented > 2) {
              thisAmount += (each.daysRented - 2) * 1.5;
            }
            break;
          case Movie.NEW_RELEASE:
            thisAmount += each.daysRented * 3;
            break;
          case Movie.CHILDRENS:
            thisAmount += 1.5;
            if (each.daysRented > 3) {
              thisAmount += (each.daysRented - 3) * 1.5;
            }
            break;
        };
        return thisAmount;
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
  
  
  
  
    
  
  
    