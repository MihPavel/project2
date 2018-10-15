import PanelSortControl from './PanelSortControl.js';
import SortМanager from './SortМanager.js';
import request from './request.js';
import link from './Link.js';
import lib from './lib.js';

class Application{
	constructor(){
		this.render();
	}
	render(){
		this.panelSortControl = new PanelSortControl({ 
			panel: document.body.querySelector('.panelSortControl'), 
			allSteps: document.body.querySelector('.sortReport_allSteps')
		});
		this.sortМanager = new SortМanager({
			btnAddSorter: document.body.querySelector('.btn_addSorter'),
			containerSorters: document.body.querySelector('.container_sorters'),
			requestData: this.requestData.bind(this)
		});
		link.subscribe('sort', this.panelSortControl);
		link.subscribe('sort', this.sortМanager);
  }

  requestData(){
	 	return request('http://localhost:1234/array');
	}
}

export default new Application();



