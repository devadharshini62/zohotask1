var memory_array = ["images/img1.png","images/img1.png","images/img2.png","images/img2.png","images/img3.png","images/img3.png","images/img4.png","images/img4.png","images/img5.png","images/img5.png","images/img6.png","images/img6.png","images/img7.png","images/img7.png","images/img8.png","images/img8.png","images/img9.png","images/img9.png","images/img10.png","images/img10.png","images/img11.png","images/img11.png","images/img12.png","images/img12.png"];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var score=0;
var count=1;
//shuffle cards
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
//Generating new board
function newBoard()
{
	score=0;
	tiles_flipped = 0;
	var output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML=output;
}
//To flip cards
function memoryFlipTile(tile,val)
{   
	if(tile.innerHTML == "" && memory_values.length < 2)
	{
		tile.style.background = '#FFF';
		tile.innerHTML = `<img src='${val}'>`;

		if(memory_values.length == 0)
		{
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			
		} 
		else if(memory_values.length == 1)
		{
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			//if tile matches
			if(memory_values[0] == memory_values[1])
			{
				score+=1;
				tiles_flipped += 2;
				document.getElementById('score').innerHTML=`Score: ${score}`;
				console.log("Score : "+score);
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				//Success message
				if(tiles_flipped == memory_array.length)
				{
					function success()
					{
						alert("Success! Your Score is " + score);
						showDiv();	
					}	
					setTimeout(success,500);
				}
			} 
			//if tiles doesn't match
			else 
			{	
				if(count<3)
				{
					setTimeout(flip2Back,700);
					document.getElementById('life').innerHTML=`Wrong Matches: ${count}`;
					console.log("WM : ",count);
					count++;
				}
				else
				{
					function close()
					{
						alert(`Wrong Matches: ${count} , You Lost the Game :(`);
						memory_values = [];
						memory_tile_ids = [];	
						count=0;
						showDiv();
					}	
					setTimeout(close,500);
					
				}
			}					
			}					
		}
	}	
		
function showDiv()
 {
    document.getElementById('memory_board').style.display = "block";
	document.getElementById('score').innerHTML="";
	document.getElementById('life').innerHTML="";
	newBoard();
	display(memory_array);
	setTimeout(flip,3000);
 }
function display(memory_array)
{	
	for(var i = 0; i < memory_array.length; i++)
	{
		document.getElementById("tile_"+ i).style.background="#fff";
		document.getElementById("tile_"+ i).innerHTML=`<img src='${memory_array[i]}'>`;
	}
	
}
function flip()
{
	output="";
	for(var i = 0; i < memory_array.length; i++)
	{
		document.getElementById("tile_"+ i).style.background='no-repeat';
		document.getElementById("tile_"+ i).innerHTML="";
	}

}
function flip2Back()
{
					// Flip the 2 tiles back over
					document.getElementById(memory_tile_ids[0]).style.background ='no-repeat';
					document.getElementById(memory_tile_ids[1]).style.background ='no-repeat';
					document.getElementById(memory_tile_ids[0]).innerHTML = "";
					document.getElementById(memory_tile_ids[1]).innerHTML = "";
					// Clear both arrays
					memory_values = [];
					memory_tile_ids = [];	
}
function endGame()
{
	
	function End()
		{
			alert("Game Ended! Start a New Game");
			showDiv();		
		}	
		End();

}