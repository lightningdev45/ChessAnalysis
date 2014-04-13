var deleteRemaining = function () {
    var displaced = [];
    var lastdisplaced = [null, 0];
    _.each(chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]], function (element, index) {
        if (element[1] > chessAnalysis.rclickmove[index][0] - 1) {
            displaced.push(element[0])
            return
        }
    });
    if (displaced.length > 0) {

        deleteVariation();
        return
    }
    var deletePosition = generatePosition(chessAnalysis.rclickmove[index][1], chessAnalysis.rclickmove[index][0], chessAnalysis.startpositionfen[index])
    var deleteChess = new Chess();
    var deleteHistory = [];
    for (var move = 0; move < chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]].length; move++) {
        deleteChess.move(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][move])
        deleteHistory.push(deleteChess.fen())
    }
    $("#rmenu")
        .css("display", "none");
    chessAnalysis.dropcount[index] += 1;
    var newmainvariations = [];
    var newmoves = [];
    var newparents = [];
    var newmovescomment = [];
    var newchildren = [];
    chessAnalysis.action_groups += 1
    chessAnalysis.file_actions[chessAnalysis.action_groups] = ["delete"]
    for (var i = chessAnalysis.rclickmove[index][0]; i < chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]].length; i++) {
        chessAnalysis.file_actions[chessAnalysis.action_groups][i - chessAnalysis.rclickmove[index][0] + 1] = [chessAnalysis.rclickmove[index][1], i + 1, chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][i], deleteHistory[i], deleteHistory[i - 1]]
    }
    chessAnalysis.action_groups += 1
    chessAnalysis.file_actions[chessAnalysis.action_groups] = ["add"]
    savedStatus = false
    _.each(chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]], function (element, index) {
        if (element[1] > chessAnalysis.rclickmove[index][0] - 1) {
            delete chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]][index];
            displaced.push(element[0])
            if (element[1] > lastdisplaced[1]) {
                lastdisplaced[1] = element[1];
                lastdisplaced[0] = element[0]
            }
        }
    });
    if (displaced.length > 0) {
        _.each(displaced, function (element, index) {
            if (element !== lastdisplaced[0]) {
                chessAnalysis.parents[index][element] = [lastdisplaced[0], chessAnalysis.parents[index][element][1]]
                chessAnalysis.children[index][lastdisplaced[0]].push([element, chessAnalysis.parents[index][element][1]])
            }
        });
        chessAnalysis.parents[index][lastdisplaced[0]] = [-1, -1]
        chessAnalysis.mainvariations[index].push(lastdisplaced[0]);
    }
    _.each(chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]], function (element, index) {
        if (element) {
            newchildren.push(element)
        }
    });
    chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]] = newchildren;
    _.each(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]], function (element, indicator) {
        if (indicator < chessAnalysis.rclickmove[index][0]) {
            newmoves.push(element)
        }
    });
    chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]] = newmoves;
    chessAnalysis.mainvariations[index].sort();
    _.each(chessAnalysis.movescomment[index][chessAnalysis.rclickmove[index][1]], function (element, indicator) {
        if (indicator < chessAnalysis.rclickmove[index][0]) {
            newmovescomment.push(element)
        }
    });
    chessAnalysis.movescomment[index][chessAnalysis.rclickmove[index][1]] = newmovescomment;
    if (chessAnalysis.moves[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]) {
        $("#fen-container")
            .val(chessAnalysis.chess[index].fen())
        $("#annotation_moves")
            .html(writeAnnotation(0, chessAnalysis.hm[index - 1], 0))
        $(".ann_move")
            .click(function () {
                clickNavigate($(this)
                    .attr("id"))
            })
        $(".ann_move")
            .hover(function () {
                annIn($(this)
                    .attr("id"))
            }, function () {
                annOut()
            });
    }
    else {
        chessAnalysis.hm[index] = chessAnalysis.rclickmove[index][0];
        chessAnalysis.hmv[index] = chessAnalysis.rclickmove[index][1];
        chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]));
        setup(chessAnalysis.chess[index].fen());
        addpieces();
        movegen();
        drag();
        drop();
        $("#comment-input")
            .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
        $("#fen-container")
            .val(chessAnalysis.chess[index].fen())
        $("#annotation_moves")
            .html(writeAnnotation(0, chessAnalysis.hm[index - 1], 0))
        $(".ann_move")
            .click(function () {
                clickNavigate($(this)
                    .attr("id"))
            })
        $(".ann_move")
            .hover(function () {
                annIn($(this)
                    .attr("id"))
            }, function () {
                annOut()
            });
    }
    //currentHighlighted.css("background-color","white");
    // $("#row"+String(_.indexOf(sortlist,chessAnalysis.hmv[index]))+"col"+(chessAnalysis.hm[index]-1)).css("background-color","yellow");
    //currentHighlighted=$("#row"+String(_.indexOf(sortlist,chessAnalysis.hmv[index]))+"col"+(chessAnalysis.hm[index]-1));
    $("#delete-remaining")
        .unbind("click");
    $("#delete-variation")
        .unbind("click");
    $("#replay-variation")
        .unbind("click");
    $("#make-critical")
        .unbind("click");
}