document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const resultdisplay = document.getElementById('result')
    const width = 4
    const squares = []
    let score = 0
    
    //Playing Board Creation
    function createBoard(){
        for(let i=0; i<width*width;i++){
            square = document.createElement('div')
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squares.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    //* Gnerarting a random number
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length)
        if(squares[randomNumber].innerHTML == 0){
            squares[randomNumber].innerHTML = 2
        }
        else
            generate()
    }

    //swipe right
    function moveRight(){
        for(let i=0; i<16; i++){
            if(i % 4 == 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]
                console.log(row)

                let filteredRow = row.filter(num => num) // Filter is used to filter array with values that satifies the given condition
                console.log(filteredRow)
                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)
                console.log(zeroes)
                let newRow = zeroes.concat(filteredRow)
                console.log(newRow)

                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]      // This now pushes all the non-zero values to as right as possible.

            }
        }
    }
    // moveRight()


    //swipe left
    function moveLeft(){
        for(let i=0; i<16; i++){
            if(i % 4 == 0){
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i+1].innerHTML
                let totalThree = squares[i+2].innerHTML
                let totalFour = squares[i+3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num) // Filter is used to filter array with values that satifies the given condition

                let missing = 4 - filteredRow.length
                let zeroes = Array(missing).fill(0)

                let newRow = filteredRow.concat(zeroes)


                squares[i].innerHTML = newRow[0]
                squares[i+1].innerHTML = newRow[1]
                squares[i+2].innerHTML = newRow[2]
                squares[i+3].innerHTML = newRow[3]      // This now pushes all the non-zero values to as left as possible.

            }
        }
    }

    // Swipe Down
    function moveDown(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width*2].innerHTML
            let totalFour = squares[i + width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = zeroes.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
            
        }
    }


    // Swipe Up
    function moveUp(){
        for(let i=0; i<4; i++){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + width*2].innerHTML
            let totalFour = squares[i + width*3].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeroes)

            squares[i].innerHTML = newColumn[0]
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }


    function combineRow() {
        for(let i=0; i<15; i++){
            if(squares[i].innerHTML === squares[i+1].innerHTML){
                let combinedVal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
                squares[i].innerHTML = combinedVal
                squares[i+1].innerHTML = 0                  // When swiped Left, left will gets combimedval and right side gets inserted zero.
                score += combinedVal
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }
    function combineColumn() {
        for(let i=0; i<12; i++){        //* we looped till 12, coz there is no square below square[13] or 14/15/16.
            if(squares[i].innerHTML === squares[i+width].innerHTML){
                let combinedVal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
                squares[i].innerHTML = combinedVal
                squares[i+width].innerHTML = 0                  // When swiped Left, left will gets combimedval and right side gets inserted zero.
                score += combinedVal
                scoreDisplay.innerHTML = score
            }
        }
        checkWin()
    }

    // assign keycodes
    function control(e){
        if(e.keyCode === 39){
            keyRight()
        }
        else if(e.keyCode === 37){
            keyLeft()
        }
        else if(e.keyCode === 38){
            keyUp()
        }
        else if(e.keyCode === 40){
            keyDown()
        }
    }

    document.addEventListener('keyup', control)

    function keyRight(){
        moveRight()
        combineRow()
        moveRight()     // MoveRight is repeated because combineRow will give scattered result and to avoid that.
        generate()
    }

    function keyLeft(){
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyDown(){
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    function keyUp(){
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    //* Check for numner 2048 in the game to Win
    function checkWin(){
        for(let i=0; i<squares.length; i++){
            if(squares[i].innerHTML === 2048){
                resultdisplay.innerHTML = 'You Win !!'
                document.removeEventListener('keyup', control) //   Removes event listener
            }
        }
    }






})