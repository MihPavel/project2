class Columns{
	constructor( numbers ){
		this.massNumbers = numbers;
	}
	getElem(){
		if(!this.elem){
			this.render();
		}
		return this.elem;
	}
	render(){
		let colls = [];

		for(let i = 1; i <= this.massNumbers.length; i++){
			const HEIGHT = 25;
			const WIDTH = 20;
      const GAP = 3;
			let column = document.createElement('span');
			column.classList.add('culumn');

			column.style.height = (this.massNumbers[i - 1] * HEIGHT) + 'px';
			column.textContent = this.massNumbers[i - 1];
			column.dataset.position = i;
			column.style.left = (WIDTH + GAP) * (i - 1) + 'px';
			colls.push(column);
		}

		this.elem = colls;
	}
	addMotionStyle(dataMove){ 
		
		for(let collNumber in dataMove){
			this.elem[collNumber].style.left = dataMove[collNumber] + 'px';
			this.elem[collNumber].classList.add("moveMode");

			setTimeout(() => { this.elem[collNumber].classList.remove("moveMode") }, 500);

		}	
	}
}

export default Columns;