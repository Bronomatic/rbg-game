//! === | Shortcuts | === //
const Q = q => document.querySelector(q);
const A = q => document.querySelectorAll(q);
const C = console.log;

C("JS");

//! ===== ===== | Variables | ===== ===== //

var currentColorSet, winningColor, winningValue, playing, currentLevel, barGraph;
currentLevel = 'easy', barGraph = true;

//! ===== ===== | Functions | ===== ===== //

var difficulty = (level)=> {

    let out = [];
    if(level == 'easy'){
        out = [0, 255];
    }else if(level == 'medium'){
        let rand = Math.floor(Math.random()*2);
        let start = 0 + (127 * rand);
        let end = start + 127;
        out = [start, end];
    }else if(level = 'hard'){
        let rand = Math.floor(Math.random()*3);
        let start = 0 + (85 * rand);
        let end = start + 85;
        out = [start, end];
    };
    return out;
};

var setSwatches = ()=> {
    Q('#reset').innerHTML = "New Colors";
    playing = true;
    currentColorSet = [];

    let range = difficulty(currentLevel);

    A('.swatch').forEach((el)=> {
        let randArr = [
            (Math.floor(Math.random() * range[1] )) + range[0],
            (Math.floor(Math.random() * range[1] )) + range[0],
            (Math.floor(Math.random() * range[1] )) + range[0]
        ];
        el.style.visibility = 'visible';
        el.style.backgroundColor = `rgb(${randArr[0]},${randArr[1]},${randArr[2]})`;
        currentColorSet.push(randArr);
    });

    winningColor = currentColorSet[Math.floor(Math.random() * currentColorSet.length)];
    winValue = `rgb(${winningColor[0]},${winningColor[1]},${winningColor[2]})`;

    Q('#title').innerHTML = winValue;
    Q('#compare').style.backgroundColor = winValue;

    // Bar graph
    let divider = 6;
    Q('#red').style.height = `${Math.floor(winningColor[0] / divider)}px`;
    Q('#green').style.height = `${Math.floor(winningColor[1] / divider)}px`;
    Q('#blue').style.height = `${Math.floor(winningColor[2] / divider)}px`;
}

var win = ()=> {
    playing = false;
    Q('#reset').innerHTML = "Play Again?";
    A('.swatch').forEach((el)=> {
        el.style.backgroundColor = winValue;
    });
};

var setGraphic = ()=> {
    if(barGraph){
        Q('#graphic').innerHTML = "Bar Graph";
        Q('#colorCase').style.display = 'none';
        Q('#title').style.display = 'inline-block';
        barGraph = false;
    }else{
        Q('#graphic').innerHTML = "rgb Numbers";
        Q('#colorCase').style.display = 'inline-block';
        Q('#title').style.display = 'none';
        barGraph = true;
    }
};

//! ===== ===== | Event Listeners | ===== ===== //

// Swatches
Q('#swatch-container').addEventListener('click', e => {
    if(e.target.matches('.swatch') && playing){
        const thisOne = e.target.closest('.swatch');
        const thisColor = thisOne.style.backgroundColor;
        const winValue = Q('#compare').style.backgroundColor;
        if(thisColor == winValue) {
            win();
        }else{
            thisOne.style.visibility = 'hidden';
        };
    }
});

// New Game
Q('#reset').addEventListener('click', setSwatches);

// Difficulty
Q('#level').addEventListener('click', e => {
    if(e.target.matches('.btn')){
        const btnThis = e.target.closest('.btn');
        A('.btn').forEach(el => {
            el.classList.remove('btn-active');
        });
        btnThis.classList.add('btn-active');
        currentLevel = btnThis.id;
    }
});

// Change Graphic
Q('#graphic').addEventListener('click', setGraphic);

//! ===== ===== | ===== ===== //
setSwatches();
setGraphic();