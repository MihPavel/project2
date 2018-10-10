import lib from './lib.js';

class PanelSortControl{
	constructor({ panel, allSteps }){
		this.allSteps = allSteps;
		this.panel = panel;
	}
	
	notify(options){
		if(options.sender == "panel") return;

		this.updateInterface(options.count.counters);
		this.allSteps.innerHTML = options.count.sumCount;
	}
	onChenge(options){
		link.publish('sort', options);
	}
	updateInterface(sorters){
		 var tmpl = _.template(`
		 	<div class="sorters_info">
				<% for(let sorter of sorters.values()) { %>
			  	<div class="module_report">
					  <label>Сортировщик</label>
					  <span class="sortStep"><%= sorter %></span>
					</div>
				<% } %>
			</div>
    `);

		let html = tmpl({ sorters });

		let oldContainer = document.body.querySelector(".sorters_info");

		if( oldContainer ){
			oldContainer.parentElement.removeChild( oldContainer );
		}

		this.panel.appendChild( lib.createElementFromHtml(html) );

	}
}

export default PanelSortControl;
