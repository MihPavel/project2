// @flow
import Sorter from './Sorter';
import link from './Link';

class SortМanager {
  constructor({ btnAddSorter, containerSorters, requestData }) {
    this.requestData = requestData;
    btnAddSorter.onclick = this.addSorter.bind(this);
    this.containerSorters = containerSorters;
  }

  addSorter() {
    const sorter = new Sorter({
      containerSorters: this.containerSorters,
      getPromiseData: this.getDate.bind(this),
      callback: this.onChange.bind(this),
    });
    this.onChange({
      sortObject: sorter,
      change: "add",
      status: "pending"
    });
  }

	onChange(options) {
		options.sender = "manager";
		link.publish('sort', options);
		
		if(!options.change) return; 

		if( options.change == "remove" ){
			options.sortObject.remove();
		}
	}

	getNotify() {
		return function(options){
			if(options.sender == "manager") return;

			if( options.change == "remove" ){
				options.sortObject.remove();
			}
		}.bind(this)
	}

	getDate() {
		return this.requestData();
	}
}

export default SortМanager;
