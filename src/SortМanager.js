import Sorter from './Sorter.js';
import link from './Link.js';

class SortМanager{
	constructor({ btnAddSorter, containerSorters, requestData }){
		this.requestData = requestData;
		btnAddSorter.onclick = this.addSorter.bind(this);
		this.containerSorters = containerSorters;
	}
	addSorter(){
		//let promiseData = this.requestData();
		let sorter = new Sorter({ 
			containerSorters: this.containerSorters, 
			getPromiseData: this.getDate.bind(this),
			callback: this.onChange.bind(this)
		});

		this.onChange({
				sortObject: sorter,
        change: "add",
        status: "pending"
      });
	}
	onChange(options){
		options.sender = "manager";
		link.publish('sort', options);
		
		if(!options.change) return; 

		if( options.change == "remove" ){
			options.sortObject.remove();
		}
	}
	notify(options){
		if(options.sender == "manager") return;

		if( options.change == "remove" ){
			options.sortObject.remove();
		}
	}
	getDate(){
		return this.requestData();
	}
}

export default SortМanager;