export default {
	createElementFromHtml: function (html){
	  let div = document.createElement('div');
	  div.innerHTML = html.trim();
	  return div.firstChild;
	}	
} 

