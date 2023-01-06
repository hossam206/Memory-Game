// add all variable
let correct = document.querySelector('.correct small');
let wrongtries =   document.querySelector('.wrong small');
let name =document.querySelector('.name span') ;
let correctt =document.querySelector('.correct small') ;
let wrong =document.querySelector('.wrong small') ;
let tableBody = document.getElementById('player');
let correctMatch = document.getElementById('match'); 
// start click btn start function
document.querySelector('.overlay  span').onclick = function()
{
   let name = prompt('whats Your Name ?')
   if(name === ''|| name == null )
   {

      document.querySelector('.emptyinputs').style.right = "0px"
          setTimeout(()=>{
            document.querySelector('.emptyinputs').style.right = "-27%"
          },1000)
      setTimeout(()=> {
         location.reload()
   
       },900)
   }else
   {
      document.querySelector('.name span').innerHTML = name;
  
   }
   document.querySelector('.overlay').remove();
   let allgameBlocks = document.querySelectorAll('.mamory-game-blocks .game-block');
   allgameBlocks.forEach(gameBlock => {
   gameBlock.classList.add('fliped')

   setTimeout(()=> {  
   gameBlock.classList.remove('fliped')
   },duration)

   });
}
//create indexes of images
let duration = 1000;
let maindiv = document.querySelector('.mamory-game-blocks');
let blocks = Array.from(maindiv.children);
let orderrange = Array.from(Array(blocks.length).keys()) ;
shuffle(orderrange)

blocks.forEach((block,index)=>{
block.style.order = orderrange[index];
block.addEventListener('click',()=> {
   addflip (block)

})
});
//shuffle function 
function shuffle(array)
{
   let current = array.length;
    while(current > 0)
    {
       let random = Math.floor(Math.random()*current)
       current --;
       temp = array[current]
       array[current] = array[random];
       array[random] = temp;
       
    }
  return array;   
}
//function add flip class
function addflip (clickedBlock)
{
   clickedBlock.classList.add('fliped');
   let allflipedBlocks = blocks.filter(blockk => blockk.classList.contains('fliped')); 
   // console.log(allflipedBlocks.length)
   if(allflipedBlocks.length == 2)
   {
      notclicking ();
      checkmatched(allflipedBlocks[0],allflipedBlocks[1])
   }
   addplayersData();
}
// start function not clicking
function notclicking ()
{
   document.querySelector('.mamory-game-blocks').classList.add('notclicking');
   setTimeout(()=>{
      document.querySelector('.mamory-game-blocks').classList.remove('notclicking');
   },duration);
   
}
// function checked matched 
function checkmatched(blockone,blocktwo)
{
   if(blockone.dataset.programming === blocktwo.dataset.programming )
   {
      blockone.classList.remove('fliped');
      blocktwo.classList.remove('fliped'); 
      correctMatch.play();

      correct.innerHTML = parseInt(correct.innerHTML)+1;
      if(correct.innerHTML == 10)
      {
         document.getElementById('success').play();
         // Swal.fire("Good!! ,Lets play again");
         alert("Good!! ,Lets play again")
         setTimeout(()=> {
            location.reload()
          },3000)
      }
      blockone.classList.add('hasmatched');
      blocktwo.classList.add('hasmatched');
   }else
   {
      document.getElementById('fail').play();

    wrongtries.innerHTML = parseInt(wrongtries.innerHTML)+1;
    if(wrongtries.innerHTML == 10)
    {
        alert('You have Finished All Tries Try again')
       setTimeout(()=> {
         location.reload()
       },2000)
    }
      setTimeout(() => {
         blockone.classList.remove('fliped');
         blocktwo.classList.remove('fliped');
      },duration)
   }

}

// hadling local storage function
function addplayersData()
{ 
   tableBody.innerHTML = ''
    let newar;
   let loaclitem = JSON.parse(localStorage.getItem('player'))
   if(loaclitem === null)
   {
      newar = [];
   }else
   {
        newar = loaclitem;
   }
 
   if(wrongtries.innerHTML== 10||correct.innerHTML == 10 )
   {
      let newplayer =
      {
        name :name.innerHTML,
        correct :correctt.innerHTML,
        wrong : wrong.innerHTML
      }

      newar.push(newplayer);
      localStorage.setItem('player',JSON.stringify(newar)); 


   }
   showitem ()
}
// function show localstorage
function showitem ()
{
   tableBody.innerHTML = ''
   table = '';
   let loaclitem = JSON.parse(localStorage.getItem('player'))
   if(loaclitem === null)
   {
      newar = [];
   }else
   {
        newar = loaclitem;
   }
   for(i = 0; i<newar.length;i++)
   {
      table +=
      `
      <tr>
      <td>${newar[i].name}</td>
      <td>${newar[i].correct}</td>
      <td>${newar[i].wrong}</td>
      </tr>
      
      `
   }

  
   tableBody.innerHTML = table;
}
showitem ()
