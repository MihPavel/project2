// @flow
import PanelSortControl from './PanelSortControl';
import SortМanager from './SortМanager';
import request from './request';
import link from './Link';

class Application {
  constructor() {
    this.render();
  }

  render() {
    this.panelSortControl = new PanelSortControl({
      panel: document.body.querySelector('.panelSortControl'),
      allSteps: document.body.querySelector('.sortReport_allSteps'),
    });
    this.sortМanager = new SortМanager({
      btnAddSorter: document.body.querySelector('.btn_addSorter'),
      containerSorters: document.body.querySelector('.container_sorters'),
      requestData: this.requestData.bind(this),
    });
    link.subscribe('sort', this.panelSortControl.getNotify());
    link.subscribe('sort', this.sortМanager.getNotify());
  }

  requestData() {
    return request('http://localhost:1234/array');
  }
}

export default new Application();
