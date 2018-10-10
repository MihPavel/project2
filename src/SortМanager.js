import Sorter from './Sorter.js';
import link from './Link.js';

class SortМanager{
	constructor({ btnAddSorter, containerSorters, requestData }){
		this.requestData = requestData;
		btnAddSorter.onclick = this.addSorter.bind(this);
		this.containerSorters = containerSorters;
	}
	addSorter(){
		this.requestData( this.createSorter.bind(this) );
	}
	onChange(options){
		options.sender = "manager";
		link.publish('sort', options);
		
		if(!options.change) return; 

		if( options.change.type == "remove" ){
			options.change.sortObject.remove();
		}
	}
	createSorter(numbers){
		
		let sorter = new Sorter({ 
			containerSorters: this.containerSorters, 
			numbers: numbers,
			callback: this.onChange.bind(this)
		});

		this.onChange({ 
        sort: null,
        change: {
        	sortObject: sorter,
          type: "add"
        },
        sender: "manager"
      });

	}
	notify(options){
		if(options.sender == "manager") return;
	}
}

export default SortМanager;