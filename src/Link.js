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
        if( info.change.type == "add"){
          sorters.set(info.change.sortObject, 0);
        }
        else if ( info.change.type == "remove" ){
          count -= sorters.get(info.change.sortObject);
          sorters.delete(info.change.sortObject);
        }

      } else if( info.sort ) {
        if( info.sort.derection ){
          let value = sorters.get(info.sort.sortObject);
          sorters.set(info.sort.sortObject, ++value);
          count++;
        } else {
          let value = sorters.get(info.sort.sortObject);
          sorters.set(info.sort.sortObject, --value);
          count--;
        }
      }

      let listeners = topics[topic]; 
      
      info.count = {
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