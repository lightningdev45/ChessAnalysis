var deleteVariation = function () {

    var deletePosition = generatePosition(chessAnalysis.rclickmove[index][1], chessAnalysis.rclickmove[index][0],chessAnalysis.startpositionfen[index])
    var deleteChess = new Chess();
    var deleteHistory = [];
    for (var move = 0; move < chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]].length; move++) {
        deleteChess.move(chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][move])
        deleteHistory.push(deleteChess.fen())
    }
    chessAnalysis.action_groups += 1
    chessAnalysis.file_actions[chessAnalysis.action_groups] = ["delete"]
    for (var i = 0; i < chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]].length; i++) {
        chessAnalysis.file_actions[chessAnalysis.action_groups][i + 1] = [chessAnalysis.rclickmove[index][1], i + 1, chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]][i], deleteHistory[i], deleteHistory[i - 1] || chessAnalysis.startpositionfen[index]]
    }
    chessAnalysis.action_groups += 1
    chessAnalysis.file_actions[chessAnalysis.action_groups] = ["add"]
    chessAnalysis.savedStatus[index] = false
    $("#rmenu")
        .css("display", "none");
    var deletedParents = chessAnalysis.parents[index][chessAnalysis.rclickmove[index][1]];
    var deletedChildren = chessAnalysis.children[index][chessAnalysis.rclickmove[index][1]];
    var oldChildren = {};
    _.each(chessAnalysis.children[index], function (value, key) {
        oldChildren[key] = value;
    });
    delete chessAnalysis.moves[index][chessAnalysis.rclickmove[index][1]];
    delete chessAnalysis.parents[index][chessAnalysis.rclickmove[index][1]]
    delete chessAnalysis.movescomment[index][chessAnalysis.rclickmove[index][1]];
    chessAnalysis.dropcount[index] += 1;
    chessAnalysis.hm[index] = 0;
    chessAnalysis.hmv[index] = 0;
    chessAnalysis.atStart[index] = true;
    chessAnalysis.numvariations[index] -= 1;
    var newmainvariations = [];
    var newmoves = [];
    var newparents = [];
    var newmovescomment = [];
    var newchildren = {};
    _.each(chessAnalysis.children[index], function (value, key) {
        if (key == chessAnalysis.rclickmove[index][1]) {
            newchildren[key] = [];
        }
        else {
            var tempchildren = [];
            _.each(value, function (element, indicator) {
                if (element[0] == chessAnalysis.rclickmove[index][1]) {}
                else {
                    if (element[0] < chessAnalysis.rclickmove[index][1]) {
                        tempchildren.push(element)
                    }
                    else {
                        tempchildren.push([element[0] - 1, element[1]])
                    }
                }
            })
            if (key < chessAnalysis.rclickmove[index][1]) {
                newchildren[key] = tempchildren
            }
            else if (key > chessAnalysis.rclickmove[index][1]) {
                newchildren[key - 1] = tempchildren
            }
        }
    });
    chessAnalysis.children[index] = newchildren;
    _.each(chessAnalysis.mainvariations[index], function (element, indicator) {
        if (element === chessAnalysis.rclickmove[index][1]) {}
        else {
            if (element < chessAnalysis.rclickmove[index][1]) {
                newmainvariations.push(element);
            }
            else {
                newmainvariations.push(element - 1);
            }
        }
    });
    var newCount = 0;
    _.each(chessAnalysis.moves[index], function (element, indicator) {
        if (element) {
            newmoves.push(element)
        }
    });
    chessAnalysis.moves[index] = newmoves;
    _.each(chessAnalysis.parents[index], function (element, indicator) {
        if (element[0] < chessAnalysis.rclickmove[index][1]) {
            newparents.push(element)
        }
        else if (element[0] > chessAnalysis.rclickmove[index][1]) {
            newparents.push([element[0] - 1, element[1]])
        }
        else if (element[0] == chessAnalysis.rclickmove[index][1]) {
            newparents.push(["a"])
            newCount += 1;
        }
        else {}
    });
    chessAnalysis.parents[index] = newparents;
    _.each(chessAnalysis.movescomment[index], function (element, indicator) {
        if (element) {
            newmovescomment.push(element)
        }
    });
    chessAnalysis.movescomment[index] = newmovescomment;
    chessAnalysis.mainvariations[index] = newmainvariations;
    if (_.some(deletedChildren)) {
        upgradeVariation(chessAnalysis.rclickmove[index][1], deletedParents, deletedChildren, oldChildren);
    }
    chessAnalysis.mainvariations[index].sort();
    chessAnalysis.chess[index].load(chessAnalysis.startpositionfen[index]);
    setup(chessAnalysis.chess[index].fen());
    addpieces();
    movegen();
    drag();
    drop();
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
    //search(dropcount);
    //$("#comment-input").val(movescomment[hmv][hm]);
    chessAnalysis.currentHighlighted.css("background-color", "white");
    $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
        .css("background-color", "yellow");
    chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
    $("#delete-remaining")
        .unbind("click");
    $("#delete-variation")
        .unbind("click");
    $("#replay-variation")
        .unbind("click");
    $("#make-critical")
        .unbind("click");
    if (chessAnalysis.parents[index].length !== chessAnalysis.moves[index].length) {
        
    }
    
    var parentcount = 0;
    _.each(chessAnalysis.parents[index], function (element, indicator) {
        if (element[0] === 0) {
            parentcount += 1
        }
    })
    
}

var upgradeVariation = function (hmv, dparents, dchildren, oldChildren) {
    var deviationMove = 0;
    var latestDeviation = "";
    var newCount = 0;
    _.each(dchildren, function (element, index) {
        if (element[1] > deviationMove) {
            latestDeviation = element[0] - 1;
            deviationMove = element[1];
        }
    });
    chessAnalysis.parents[index][latestDeviation] = dparents;
    if (dparents.compare([-1, -1]) === true) {
        chessAnalysis.mainvariations[index].push(latestDeviation);

    }
    else {
        chessAnalysis.children[index][dparents[0]].push([latestDeviation, dparents[1]])
    }
    _.each(dchildren, function (element, indicator) {
        if ((element[0] - 1) !== latestDeviation) {
            newCount += 1;
            chessAnalysis.parents[index][element[0] - 1] = [latestDeviation, element[1]];
            chessAnalysis.children[index][latestDeviation].push([element[0] - 1, element[1]]);
        }
    });
}