// @flow
import link from './Link';

class PanelSortControl{
	constructor({ panel, allSteps }){
		this.allSteps = allSteps;
		this.panel = panel;
	}
	
	getNotify(){
		return function(options){
			if(options.sender == "panel") return;
			this.updateInterface(options.dataSorters);
			this.allSteps.textContent = options.dataSorters.sumCount;
		}.bind(this)
	}
	onChange(options){
		link.publish('sort', options);
	}
	updateInterface(dataSorters){
		const FULLWIDTH = 200;
		const SUMMCOUNT = dataSorters.sumCount;
		
		if( this.container ){
			this.container.parentNode.removeChild( this.container );
		}

		this.container = document.createElement("div");
		this.panel.append( this.container );
		this.container.style.width = FULLWIDTH + "px";

		for(let elem of dataSorters.counters) {
			let sorter = elem[0];
			let count = elem[1].count;
			let status = elem[1].status

			this.countModule = document.createElement("div");
			let columnCount = document.createElement("div");
			columnCount.classList.add("column_count");

			if( status == "pending" ){
				columnCount.textContent = "Загружаю данные..";
			} else if( status == "error" ){
				columnCount.textContent = "Произошла ошибка!";
			} else {
				columnCount.textContent = count;
				let width = (FULLWIDTH / SUMMCOUNT) * count;
				columnCount.style.width = width + "px";
			}

			let btnRemoveCount = document.createElement("input");
			btnRemoveCount.type = "button";
			btnRemoveCount.value = "Удалить";
			btnRemoveCount.onclick = this.createHandler(sorter);
			btnRemoveCount.classList.add("panel_btn_remove");

			this.countModule.append(columnCount, btnRemoveCount);
			this.container.append(this.countModule);
		}
	}
	getModuleSorters(){
		if( this.countModule ){
			return this.countModule;
		}
	}
	createHandler(sorter){
		return function(){
			this.onChange({
				sortObject: sorter,
        change: "remove"
      });
		}.bind(this)
	}
}

export default PanelSortControl;
