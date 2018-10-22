// @flow
class DelayBoubleSort{
  constructor( numbers ){
    //выбрасывать исключение
    this.massNumbers = numbers;
    this.currentPosition = 0;
  }
  nextStepSort(){
    
    for(let i = 0; i < this.massNumbers.length - 1; i++){
      for(let j = this.currentPosition; j < this.massNumbers.length - 1; j++){

        if( this.massNumbers[j] > this.massNumbers[j + 1] ){
          [ this.massNumbers[j], this.massNumbers[j + 1] ] = [ this.massNumbers[j + 1], this.massNumbers[j] ];
          this.currentPosition = j;
          return {
            from: this.currentPosition,
            to: this.currentPosition + 1
          };
        }

      }
      this.currentPosition = 0;
    }
  }

  getStateSort(){
    if ( !this.massNumbers ) return;

    return this.massNumbers.slice();
  }
  backStepSort(position){
    [ this.massNumbers[position.from], this.massNumbers[position.to] ] = [ this.massNumbers[position.to], this.massNumbers[position.from] ];
    this.currentPosition = position.from;
  }
}

export default DelayBoubleSort;