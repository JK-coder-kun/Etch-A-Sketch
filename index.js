const body=document.querySelector('body');
        const container=document.createElement("div");
        const sketchPad=document.createElement('div');
        const main=document.createElement('div');
        const title=document.createElement('h3');
        const sideMenu=document.createElement('div');
        const resetBtn=document.createElement("button");
        const gridSlider=document.createElement("input");
        const colorPicker=document.createElement("input");
        const gridLine=document.createElement("button");
        const gridSize=document.createElement("div");
        const gridSizeComfirm=document.createElement("button");
        const btnRainbow=document.createElement("button");
        const modeBtn=document.createElement("button");
        const eraserBtn=document.createElement("button");
        const randomColor=["red","orange","yellow","green","blue","indigo","violet"];
        let gridShow=false;
        let color="aqua";

        colorPicker.padding="5px";
        colorPicker.setAttribute('type',"color");
        colorPicker.setAttribute('value','#00ffff');

        resetBtn.innerText="Reset";


        gridSlider.setAttribute("type","range");
        gridSlider.setAttribute("max",'100');
        gridSlider.setAttribute("min","1");
        gridSlider.setAttribute("value","16");

        title.innerText="Etch A Sketch";
        title.classList.add("title");
        const row=16;
        main.classList.add("main");
        sideMenu.classList.add("sideMenu");
        sketchPad.classList.add("sketchPad");
        container.classList.add("container");
        gridSlider.classList.add("gridSlider");
        gridSize.classList.add("gridSize");
        gridSizeComfirm.classList.add("gridBtnConfirm");
        btnRainbow.classList.add("btnRainbow");
        
        generateGrid(row);

        
        body.appendChild(title);
        body.appendChild(main);
        main.appendChild(sideMenu);
        sideMenu.appendChild(resetBtn);
        sideMenu.appendChild(colorPicker);
        sideMenu.appendChild(btnRainbow);
        sideMenu.appendChild(eraserBtn);
        sideMenu.appendChild(gridLine);
        main.appendChild(container);
        container.appendChild(sketchPad);
        container.appendChild(gridSlider);
        container.appendChild(gridSize);
        container.appendChild(gridSizeComfirm);
 

        btnRainbow.innerText="Rainbow";

        gridLine.innerText="Gridline";
        gridLine.addEventListener("click",()=>{
            let children=document.querySelectorAll(".sketchPad>div>div");
            if(gridShow){
                gridShow=false;
                gridLine.classList.remove("button-toggle");
                children.forEach(child=>{
                    child.className="child";
                    child.classList.add("child");
                });
                console.log("Off")
            }else{
                gridShow=true;
                gridLine.classList.add("button-toggle");
                children.forEach(child=>child.classList.add("child-gridline"));
                console.log("on")
            }
            

        })

        eraserBtn.innerText="Eraser";
        eraserBtn.addEventListener("click",()=>{
            if(color=="white"){
                eraserBtn.classList.remove("button-toggle");
                color=colorPicker.value;
            }else{
                btnRainbow.classList.remove("button-toggle");
                color="white";
                eraserBtn.classList.add("button-toggle");
            }
            
        });



        gridSize.innerText=gridSlider.value;

        gridSizeComfirm.innerText="Change Grid";

        colorPicker.addEventListener("input",()=>{
            btnRainbow.classList.remove("button-toggle");
            eraserBtn.classList.remove("button-toggle");
            color=colorPicker.value;
        });

        resetBtn.addEventListener("click",removeEffect);

        gridSlider.addEventListener("input",()=>{
            gridSize.innerText=gridSlider.value;
        })

        

        btnRainbow.addEventListener("click",()=>{
            if(color=="random"){
                btnRainbow.classList.remove("button-toggle");
                color=colorPicker.value;
            }else{
                eraserBtn.classList.remove("button-toggle");
                color="random";
                btnRainbow.classList.add("button-toggle");
            }
        })

        gridSizeComfirm.addEventListener("click",()=>{
            let grid=gridSlider.value;
            generateGrid(grid);
        })


        function generateGrid(grid){
            sketchPad.innerHTML="";
            gridClass=gridShow?"child-gridline":"child";
            for(let i=0;i<grid;i++){
                let row=document.createElement('div');
                row.classList.add("row");
                for(let j=0;j<grid;j++){
                    let div=document.createElement('div');
                    div.classList.add(gridClass);
                    div.addEventListener("mouseover",hovereffect);
                    row.appendChild(div);
                }
                sketchPad.appendChild(row);
            }
            gridLine.classList.remove("button-toggle");
        }

        function removeEffect(){
            let children=document.querySelectorAll(".child");
            children.forEach(child=>{
                child.style.backgroundColor="white";
            }) ;
        }

        function hovereffect(e){
            let sketch=color;
            if(color=="random")sketch=randomColor[Math.floor(Math.random()*10)%7];
            this.style="background-color:"+sketch+";";
        }