
import DelayBoubleSort from './DelayBoubleSort.js';
import Columns from './Columns.js';
import lib from './lib.js';

class Sorter{
	constructor({ numbers, containerSorters, callback }){
    this.callSortManager = callback;
    this.numbers = numbers;
    this.containerSorters = containerSorters;

    let massNumbers = this.numbers.split("").map( nextNumber => parseInt(nextNumber) );
    
		this.columns = new Columns( massNumbers );
    this.sortFunction = new DelayBoubleSort( massNumbers );
    
    this.steps = [];

		this.render();
	}

	render(){
    let moduleSort = this.createModule();
    this.module = this.containerSorters.appendChild( moduleSort );

		let columnsData = this.columns.getElem();
		
    if( !this.massColumns ){
      this.massColumns = columnsData;
    }

    moduleSort.lastElementChild.append( ...columnsData );

    let btnNext = moduleSort.querySelector('.next_sort');
    let btnPrevious = moduleSort.querySelector('.previous_sort');
    let btnRemoveSorter = moduleSort.querySelector('.remove_sorter');

    btnNext.onclick = this.nextSortStep.bind(this);
    btnPrevious.onclick = this.previousSortStep.bind(this);
    btnRemoveSorter.onclick = this.onRemove.bind(this);
    
	}
  createModule(){
    var tmpl = _.template(`
      <div class="visual_sort">
        <span class="value_sort"> <%= numbers %> </span>
        <input class="previous_sort" type="button" value="<">
        <input class="next_sort" type="button" value=">">
        <input class="remove_sorter" type="button" value="Удалить">
        <div class="colls"></div>
      </div>
    `);
    let html = tmpl({ 
      numbers: this.numbers
    });

    return lib.createElementFromHtml(html);
  }
  nextSortStep(){
    let nextPosition = this.sortFunction.nextStepSort();
    if ( nextPosition ){
      // nextPosition уже получает объект {from to}
      this.steps.push(nextPosition);
      this.moveColumns(nextPosition);
      this.callSortManager({ 
        sort: {
          sortObject: this, 
          derection: true
        },
        change: null
      });
    }
  }

  previousSortStep(){
    
    if( !this.steps.length ) return; 
    
    let replace = this.steps[this.steps.length - 1];
    this.sortFunction.backStepSort(replace);
    this.moveColumns(replace);
    this.steps.length -= 1;
    this.callSortManager({ 
      sort: {
        sortObject: this, 
        derection: false
      },
      change: null
    });
  }
  onRemove(){
    this.callSortManager({ 
        sort: null,
        change: {
          type: "remove",
          sortObject: this
        }
      });
  }
  remove(){
    if(this.module){
      this.module.parentElement.removeChild(this.module);
      this.columns = null;
      this.sortFunction = null;
    }
  }
  moveColumns(dataReplace){
    const WIDTH = 20;
    const GAP = 3;
    let save = this.massColumns[dataReplace.from];

    this.massColumns[dataReplace.from] = this.massColumns[dataReplace.to];
    this.massColumns[dataReplace.to] = save;

    let positionFrom = dataReplace.from + 1;
    let positionTo = dataReplace.to + 1;

    this.columns.addMotionStyle({
      [dataReplace.to]: ( positionTo * (WIDTH + GAP) ) - (WIDTH + GAP),
      [dataReplace.from]: ( positionFrom * (WIDTH + GAP) ) - (WIDTH + GAP)
    });
  }
}
export default Sorter;
