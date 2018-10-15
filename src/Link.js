let link = (function(){
  let topics = {};
  let sorters = new Map();
  let count = 0;

  return {
    subscribe: function(topic, listener) {
      if(!topics[topic]) topics[topic] = [];
      topics[topic].push(listener);
    },

    publish: function(topic, info) { 
      if(!topics[topic] || !topics[topic].length) return;

      if( info.change ){
        if( info.change == "add"){
          sorters.set(info.sortObject, {
            count: 0,
            status: info.status
          });
        }
        else if ( info.change == "remove" ){
          let sorterData = sorters.get(info.sortObject);
          count = count - sorterData.count;
          sorters.delete(info.sortObject);
        }

      } else if( info.hasOwnProperty('derection') ) {
        if( info.derection ){
          let sorterData = sorters.get(info.sortObject);
          sorterData.count = sorterData.count + 1;
          sorters.set(info.sortObject, sorterData);
          count++;
        } else {
          let sorterData = sorters.get(info.sortObject);
          sorterData.count = sorterData.count - 1;
          sorters.set(info.sortObject, sorterData);
          count--;
        }
      } else if( info.status ){
        let value = sorters.get(info.sortObject);
        value.status = info.status;
        sorters.set(info.sortObject, value);
      }

      let listeners = topics[topic]; 
      
      info.dataSorters = {
        counters: sorters,
        sumCount: count
      };

      listeners.forEach(function(item) {
          item.notify(info);
      });
    }
  };
})();

export default link;