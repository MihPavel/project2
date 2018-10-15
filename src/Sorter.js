
import DelayBoubleSort from './DelayBoubleSort.js';
import Columns from './Columns.js';
import lib from './lib.js';

class Sorter{
	constructor({ containerSorters, getPromiseData, callback }){
    this.callSortManager = callback;
    this.getPromiseData = getPromiseData;
    this.containerSorters = containerSorters;
    this.steps = [];

    this.renderModule();
    
	}

	renderModule(){
    this.module = this.createModule();
    this.containerSorters.append( this.module );
    this.getData();
	}
  
  renderSorter(numbers){
    this.numbers = numbers;
    let massNumbers = this.numbers.split("").map( nextNumber => parseInt(nextNumber) );
    this.columns = new Columns( massNumbers );
    this.sortFunction = new DelayBoubleSort( massNumbers );

    let columnsData = this.columns.getElem();
    
    if( !this.massColumns ){
      this.massColumns = columnsData;
    }
    let moduleSorter = this.createSorter();

    moduleSorter.lastElementChild.append( ...columnsData );

    let btnNext = moduleSorter.querySelector('.next_sort');
    let btnPrevious = moduleSorter.querySelector('.previous_sort');
    let btnRemoveSorter = moduleSorter.querySelector('.remove_sorter');

    btnNext.onclick = this.nextSortStep.bind(this);
    btnPrevious.onclick = this.previousSortStep.bind(this);
    btnRemoveSorter.onclick = this.onRemove.bind(this);
    
    this.callSortManager({ 
      sortObject: this,
      status: "success"
    });
    
    this.module.append( moduleSorter );
    this.module.removeChild( this.module.firstElementChild );
  }
  getData(){
    let resultRequest = this.getPromiseData();

    resultRequest.then((data) => {
        if(data.result){
          this.renderSorter( data.result.slice(0, 5).join("") );
        } else {
          let agreeModule = this.module.querySelector(".reconnect_question")
          agreeModule.classList.remove("question_hidden");

          let btnYes = agreeModule.children[1];
          let btnNo = agreeModule.children[2];
          btnYes.onclick = () => {
            agreeModule.classList.add("question_hidden");
            this.getData();

            this.callSortManager({ 
            sortObject: this,
            status: "pending"
          });
          }
          btnNo.onclick = () => { 
            this.onRemove();
          }
          this.callSortManager({ 
            sortObject: this,
            status: "error"
          });
        }
    });
  }

  createModule(){
    var tmpl = _.template(`
      <div class="sort_module"> 
        <div class="status">Загружаю данные.....
          <div class="reconnect_question question_hidden">
            <span>Не удалось загрузить данные. <br> Хотите повторить попытку?</span>
            <input type="button" value="да">
            <input type="button" value="нет">
          </div>
        </div>
      </div>
      `);
    let html = tmpl();

    return lib.createElementFromHtml(html);
  }
  createSorter(){
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
  //////////////////////////////////////////////////////////////
  nextSortStep(){
    let nextPosition = this.sortFunction.nextStepSort();
    if ( nextPosition ){
      this.steps.push(nextPosition);
      this.moveColumns(nextPosition);
      this.callSortManager({ 
        sortObject: this, 
        derection: true
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
      sortObject: this, 
      derection: false
    });
  }

  onRemove(){
    this.callSortManager({ 
      sortObject: this,
      change: "remove"
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
