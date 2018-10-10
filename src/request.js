export default function(url){
	return fetch(url, { method: "GET" })  
	.then(  
		function(response) {  
		  if (response.status !== 200) {
		    console.log('Looks like there was a problem. Status Code: ' +  response.status);
		    return "error";
		  }
		  return response.json(); 
		}  
	)  
	
}
