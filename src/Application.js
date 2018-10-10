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
			requestData: this.getData.bind(this)
		});
		link.subscribe('sort', this.panelSortControl);
		link.subscribe('sort', this.sortМanager);
  }

  getData(callback){
  	let iconStatus = document.querySelector('.status');
  	iconStatus.classList.remove('status_none');

	 	let resultRequest = request('http://localhost:1234/array');

	 	resultRequest.then((data) => {
	  		if(data.result){
	  			callback( data.result.slice(0, 5).join("") );
					iconStatus.classList.add('status_none');
	  		} else {
					let agreeModule = this.getModuleReconnectServer();
		  		iconStatus.append( agreeModule );
		  		let btnYes = agreeModule.children[1];
		  		let btnNo = agreeModule.children[2];
		  		btnYes.onclick = () => {
		  			this.getData(callback);
		  			agreeModule.parentElement.removeChild(agreeModule);
		  		}
		  		btnNo.onclick = () => { 
		  			iconStatus.classList.add('status_none');
		  			agreeModule.parentElement.removeChild(agreeModule);
		  		}
	  		}
		});
		
	 }
	 getModuleReconnectServer(){
    var tmpl = _.template(`
      <div class="agree_reconnect">
        <span>Не удалось загрузить данные. <br> Хотите повторить попытку?</span>
        <input type="button" value="да">
        <input type="button" value="нет">
      </div>
    `);
    let html = tmpl();

    return lib.createElementFromHtml(html);
  }
}

export default new Application();



