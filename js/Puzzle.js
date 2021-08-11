const canvas = document.getElementById('field')
const ctx = canvas.getContext('2d')

const tilesImage = new Image()
tilesImage.src = "img/15.png"

const W_W = 4;
const W_H = 4;
const C_S = 64;

var grid = [];
var indexes = [];

function randint(min, max) {
    return Math.floor(Math.random()*max + min);
}

function init() {
    var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            indexes.push({x: j, y: i});
        }
    }

//    var n = 0;
    for (var i = 0; i < 4; i++) {
        grid.push([]);
        for (var j = 0; j < 4; j++) {
            var n = randint(0, numbers.length);
            grid[i].push(numbers[n]);

            ctx.drawImage(tilesImage, indexes[numbers[n]-1].x*C_S, indexes[numbers[n]-1].y*C_S, C_S, C_S, j*C_S, i*C_S, C_S, C_S);
            numbers.splice(n, 1);
//            n++;
        }
    }

    check();
}

function check() {
    var count = 0;
    for (var i1 = 0; i1 < 4; i1++) {
        for (var j1 = 0; j1 < 4; j1++) {
            for (var i2 = i1; i2 < 4; i2++) {
                var j2;
                if (i1 == i2) {
                    j2 = j1+1;
                } else {
                    j2 = 0;
                }
                for (; j2 < 4; j2++) {
                    if (grid[i1][j1] > grid[i2][j2]) {
                        count++;
                    }
                }
            }
        }
    }
 
    if (count % 2 != 0) {
        var temp = grid[3][2];
        grid[3][2] = grid[3][3];
        grid[3][3] = temp;
        ctx.drawImage(tilesImage, indexes[grid[3][2]-1].x*C_S, indexes[grid[3][2]-1].y*C_S, C_S, C_S, 2*C_S, 3*C_S, C_S, C_S);
        ctx.drawImage(tilesImage, indexes[grid[3][3]-1].x*C_S, indexes[grid[3][3]-1].y*C_S, C_S, C_S, 3*C_S, 3*C_S, C_S, C_S);
    }
}


function win() {
    var flag = true;
    var n = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (grid[i][j] != n) {
                flag = false;
            }
            n++;
        }
    }
    return flag;
}

function move() {
    var rect = canvas.getBoundingClientRect();
    var y = Math.floor((event.clientX - rect.left) / C_S);
    var x = Math.floor((event.clientY - rect.top) / C_S);

    var dx = 0;
    var dy = 0;

    if ((x != 3)&&(grid[x+1][y] == 16)) {dx = 1; dy = 0;}
    else if ((y != 3)&&(grid[x][y+1] == 16)) {dx = 0; dy = 1;}
    else if ((x != 0)&&(grid[x-1][y] == 16)) {dx = -1; dy = 0;}
    else if ((y != 0)&&(grid[x][y-1] == 16)) {dx = 0; dy = -1;}

    var temp = grid[x][y];
    grid[x][y] = grid[x+dx][y+dy];
    grid[x+dx][y+dy] = temp;

    ctx.drawImage(tilesImage, indexes[grid[x][y]-1].x*C_S, indexes[grid[x][y]-1].y*C_S, C_S, C_S, y*C_S, x*C_S, C_S, C_S);
    ctx.drawImage(tilesImage, indexes[grid[x+dx][y+dy]-1].x*C_S, indexes[grid[x+dx][y+dy]-1].y*C_S, C_S, C_S, (y+dy)*C_S, (x+dx)*C_S, C_S, C_S);

    if (win()) {
        ctx.fillStyle = "green";
        ctx.font = "50px Arial";
        ctx.fillText("WIN", 1.2*C_S, 2.2*C_S);
    }
}

function main() {
    setTimeout(init, 100);
}

canvas.addEventListener("click", function (event) {
    move();
})

main()