var chessAnalysis = {};
var index = 0
var setupChess=function(fen){
    chessAnalysis.engines = [];
    chessAnalysis.engineStatus = false;
    chessAnalysis.engineId = ""
    chessAnalysis.mode = "engine_analysis_mode"
    chessAnalysis.chess = [new Chess(), new Chess()]
    chessAnalysis.chess[0].load(fen)
    chessAnalysis.chess[1].load(fen)
    chessAnalysis.moves = [
        [],
        []
    ];
    chessAnalysis.hm = [0, 0]
    chessAnalysis.hmv = [0, 0];
    chessAnalysis.parents = [
        [],
        []
    ]
    chessAnalysis.children = [{}, {}]
    chessAnalysis.currentHighlighted = $();
    chessAnalysis.rclickmove = ["", ""]
    chessAnalysis.showCustomMenu = "";
    chessAnalysis.boardcolor = "white";
    chessAnalysis.sortedMoves = [];
    chessAnalysis.update_move_tree = function () {};
    chessAnalysis.file_actions = {
        1: ["add"]
    }
    chessAnalysis.action_groups = 1
    chessAnalysis.currentUser = "";
    chessAnalysis.savedStatus = true
    chessAnalysis.numvariations = [0, 0];
    chessAnalysis.mainvariations = [
        [],
        []
    ];
    chessAnalysis.movescomment = [
        [
            [""]
        ],
        [
            [""]
        ]
    ]
    chessAnalysis.sortlist = [
        [],
        []
    ]
    chessAnalysis.atStart = [true, true]
    chessAnalysis.dropcount = [0, 0]
    chessAnalysis.startpositionfen = [fen, fen
    ]
    chessAnalysis.editStatus=[false,false]

}
setupChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
var generatePosition = function (hmv, hm, startpositionfen) {
    if (hm === 0 || hm === -1) {
        return startpositionfen
    }
    else {
        var positionGen = new Chess();
        positionGen.load(startpositionfen)
        for (var move = 0; move < hm; move++) {
            positionGen.move(chessAnalysis.moves[index][hmv][move])
        }
        return positionGen.fen();
    }
}
Array.prototype.compare = function (array) {
    if (!array)
        return false;
    if (this.length != array.length)
        return false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] instanceof Array && array[i] instanceof Array) {
            if (!this[i].compare(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            return false;
        }
    }
    return true;
}
var nextmovechoose = function (count, length, nextmovelist) {
    if (count === chessAnalysis.dropcount[index]) {
        $("#scroll-cancel")
            .click(function () {
                $("#scroll-move-select")
                    .unbind("click");
                $("#scroll-cancel")
                    .unbind("click");
                $("#next-move-select")
                    .css("display", "none");
                $("#scroll-container")
                    .empty();
                $("#modal")
                    .css("display", "none");
                $("html")
                    .css("overflow", "auto");
                popup = false;
            });
        $("#scroll-move-select")
            .click(function () {
                $("#scroll-move-select")
                    .unbind("click");
                $("#scroll-cancel")
                    .unbind("click");
                popup = false;
                chessAnalysis.atStart[index] = false;
                $("#next-move-select")
                    .css("display", "none");
                $("#scroll-container")
                    .empty();
                $("#modal")
                    .css("display", "none");
                $("html")
                    .css("overflow", "auto");
                chessAnalysis.hmv[index] = nextmovelist[highlight - 1][1];
                chessAnalysis.hm[index] = nextmovelist[highlight - 1][2] + 1;
                chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]));
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                drop();
                if (chessAnalysis.mode === "engine_analysis_mode") {
                    
                    changeEnginePosition();
                    

                }
                else if (chessAnalysis.mode === "your_analysis_mode") {
                    $("#fen-container")
                        .val(chessAnalysis.chess[index].fen())
                }
                $("#comment-input")
                    .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                chessAnalysis.currentHighlighted.css("background-color", "white");
                $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                    .css("background-color", "yellow");
                chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                $("#table-container-moves")
                    .scrollLeft($("#table-container-moves")
                        .scrollLeft() + 78);
                $("#table-container-top-labels")
                    .scrollLeft($("#table-container-moves")
                        .scrollLeft() + 78);
            });
        $(".move-row")
            .click(function () {
                $(".move-row")
                    .css("background-color", "white");
                $(this)
                    .css("background-color", "#518C7C");
                highlight = parseInt($(this)
                    .attr("id")
                    .slice(7, $(this)
                        .attr("id")
                        .length)) + 1
                scroll = (highlight - 1) * 25
            });
        var scroll = 0;
        $("html")
            .css("overflow", "hidden");
        var highlight = 1;
        $("#scroll-container div:nth-child(" + highlight + ")")
            .css("background-color", "#518C7C");
        $(document)
            .keydown(function (event) {
                if (event.which === 40) {
                    $(".move-row")
                        .css("background-color", "white");
                    if (highlight === length) {
                        $("#scroll-container div:nth-child(" + highlight + ")")
                            .css("background-color", "#518C7C");
                    }
                    else {
                        highlight += 1;
                        $("#scroll-container div:nth-child(" + highlight + ")")
                            .css("background-color", "#518C7C");
                        scroll = scroll + 25;
                        $("#scroll-container")
                            .scrollTop(scroll);
                    }
                }
                if (event.which === 38) {
                    $(".move-row")
                        .css("background-color", "white");
                    if (highlight === 1) {
                        $("#scroll-container div:nth-child(" + highlight + ")")
                            .css("background-color", "#518C7C");
                    }
                    else {
                        highlight -= 1;
                        $("#scroll-container div:nth-child(" + highlight + ")")
                            .css("background-color", "#518C7C");
                        scroll -= 25
                        $("#scroll-container")
                            .scrollTop(scroll);
                    }
                }
                if (event.which === 13) {
                    $("#scroll-move-select")
                        .unbind("click");
                    $("#scroll-cancel")
                        .unbind("click");
                    popup = false;
                    chessAnalysis.atStart[index] = false;
                    $("#next-move-select")
                        .css("display", "none");
                    $("#scroll-container")
                        .empty();
                    $("#modal")
                        .css("display", "none");
                    $("html")
                        .css("overflow", "auto");
                    chessAnalysis.hmv[index] = nextmovelist[highlight - 1][1];
                    chessAnalysis.hm[index] = nextmovelist[highlight - 1][2] + 1;
                    chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]));
                    setup(chessAnalysis.chess[index].fen());
                    addpieces();
                    movegen();
                    drag();
                    drop();
                    if (chessAnalysis.mode === "engine_analysis_mode") {

                        changeEnginePosition();
                    }
                    else if (chessAnalysis.mode === "your_analysis_mode") {
                        $("#fen-container")
                            .val(chessAnalysis.chess[index].fen())
                    }
                    $("#comment-input")
                        .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                    chessAnalysis.currentHighlighted.css("background-color", "white");
                    $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                        .css("background-color", "yellow");
                    chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                    $("#table-container-moves")
                        .scrollLeft($("#table-container-moves")
                            .scrollLeft() + 78);
                    $("#table-container-top-labels")
                        .scrollLeft($("#table-container-moves")
                            .scrollLeft() + 78);
                }
            });
    };
};
var promotionclick = function (from, to, count) {
    $("#whitepopup img")
        .click(function () {
            if (count === chessAnalysis.dropcount[index]) {
                $("#promotionModal")
                    .modal("hide");
                var whitepromotion = $(this)
                    .attr("id");
                $("#whitepopup")
                    .css("display", "none");
                chessAnalysis.chess[index].move({
                    from: from,
                    to: to,
                    promotion: whitepromotion
                });
                if (chessAnalysis.atStart[index]) {
                    chessAnalysis.atStart[index] = false;
                    var startcondition = true;
                    for (var i = 0; i < chessAnalysis.mainvariations[index].length; i++) {
                        if (chessAnalysis.moves[index][chessAnalysis.mainvariations[index][i]][0] === _.last(chessAnalysis.chess[index].history())) {
                            startcondition = false;
                            var writestatus = "none";
                            chessAnalysis.hmv[index] = chessAnalysis.mainvariations[index][i];
                            chessAnalysis.hm[index] += 1;
                            break;
                        }
                        else {}
                    }
                    if (startcondition === true) {
                        var writestatus = "new";
                        chessAnalysis.numvariations[index] += 1
                        chessAnalysis.mainvariations[index].push(chessAnalysis.numvariations[index] - 1);
                        $("#moves")
                            .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                        chessAnalysis.hm[index] = 0;
                        chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                        if (chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1]) {}
                        else {
                            chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [""];
                        }
                        chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [-1, -1];
                        chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        chessAnalysis.hm[index] += 1;
                    }
                }
                else {
                    if (chessAnalysis.hm[index] === chessAnalysis.moves[index][chessAnalysis.hmv[index]].length) {
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        var writestatus = "newmove"
                        chessAnalysis.hm[index] += 1;
                        chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = "";
                    }
                    else if (newVariationSearch(_.last(chessAnalysis.chess[index].history()), chessAnalysis.hm[index], chessAnalysis.hmv[index]) && _.last(chessAnalysis.chess[index].history()) !== chessAnalysis.moves[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]) {
                        <!-- this sections is for a new variation; first an empty moves array and movesfen aray is created added to the moves array.  The moves from the previous hmv(the variation we are branching off from) are then added to each; finally, we change the hmv variable to the new variation and add the last move from the "chess" variable(this variable was updated when user clicked to the current position)-->)
                        chessAnalysis.numvariations[index] += 1
                        var writestatus = "new";
                        $("#moves")
                            .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                        chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.children[index][chessAnalysis.hmv[index]].push([chessAnalysis.numvariations[index] - 1, chessAnalysis.hm[index]]);
                        chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [];
                        for (var i = 0; i < chessAnalysis.hm[index]; i++) {
                            chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1][i] = chessAnalysis.moves[index][chessAnalysis.hmv[index]][i]
                            chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1][i] = "";
                        }
                        chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [chessAnalysis.hmv[index], chessAnalysis.hm[index]];
                        chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        chessAnalysis.hm[index] += 1;
                        chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = "";
                        var writestatus = "none";
                    }
                    else {
                        chessAnalysis.hm[index] += 1
                        var writestatus = "none";
                    }
                }
                <!-- now we get ready for the next drop-->
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                for (var y = 0; y < 64; y++) {
                    dropstring = ""
                    for (z = 0; z < squaremoves[squares[y]].length; z++) {
                        if (z !== squaremoves[squares[y]].length - 1) {
                            dropstring += (squaremoves[squares[y]][z] + ",")
                        }
                        else {
                            dropstring += squaremoves[squares[y]][z]
                        }
                    };
                    $(squares[y])
                        .droppable("option", "accept", dropstring);
                };
                chessAnalysis.dropcount[index] += 1;
                $("#comment-input")
                    .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                chessAnalysis.currentHighlighted.css("background-color", "white");
                $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                    .css("background-color", "yellow");
                chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                $("#table-container-moves")
                    .scrollLeft((chessAnalysis.hm[index] - 1) * 78);
                $("#table-container-top-labels")
                    .scrollLeft((chessAnalysis.hm[index] - 1) * 78);
                $("#table-container-moves")
                    .scrollTop((chessAnalysis.hmv[index]) * 53);
                $("#table-container-left-labels")
                    .scrollTop((chessAnalysis.hmv[index]) * 53);
                chessAnalysis.update_move_tree();
                 if (chessAnalysis.mode === "engine_analysis_mode") {

                        changeEnginePosition();
                    }
                    else if (chessAnalysis.mode === "your_analysis_mode") {
                        $("#fen-container")
                            .val(chessAnalysis.chess[index].fen())
                        $("#annotation_moves")
                            .html(writeAnnotation(0, chessAnalysis.hm[index - 1], 0))
                        chessAnalysis.editStatus[index]=true;
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
                        $(".ann_comment").unbind("input");
                        $(".ann_comment").on("input",function(){
                            chessAnalysis.editStatus[index]=true;
                            var id=$(this).attr("id")
                            var moves_num=id.split("var")[1].split("comment")
                            var hm=moves_num[1]
                            var hmv=moves_num[0]
                            $(this).width(getWidthOfInput(document.getElementById(id)))
                            //if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
                            //{
                                $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                            //}
                            chessAnalysis.movescomment[index][hmv][hm]=$(this).val()
                        });
                        $(".ann_comment").css("max-width",$("#annotation_moves").width())
                        $(".ann_comment").each(function(){
                            var id=$(this).attr("id")
                            var width=getWidthOfInput(document.getElementById(id))
                            $(this).width(width);
                            $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                        })
                    }
            }
        });
    $("#blackpopup img")
        .click(function () {
            if (count === chessAnalysis.dropcount[index]) {
                $("#promotionModal")
                    .modal("hide");
                var blackpromotion = $(this)
                    .attr("id");
                $("#blackpopup")
                    .css("display", "none");
                chessAnalysis.chess[index].move({
                    from: from,
                    to: to,
                    promotion: blackpromotion
                });
                <!-- this sections determines if the moves is to be added to current hmv or is to create a new variation-->
                if (chessAnalysis.atStart[index]) {
                    chessAnalysis.atStart[index] = false;
                    var startcondition = true;
                    for (var i = 0; i < chessAnalysis.mainvariations[index].length; i++) {
                        if (chessAnalysis.moves[index][chessAnalysis.mainvariations[index][i]][0] === _.last(chessAnalysis.chess[index].history())) {
                            startcondition = false;
                            var writestatus = "none";
                            chessAnalysis.hmv[index] = chessAnalysis.mainvariations[index][i];
                            chessAnalysis.hm[index] += 1;
                            break;
                        }
                        else {}
                    }
                    if (startcondition === true) {
                        var writestatus = "new";
                        chessAnalysis.numvariations[index] += 1
                        chessAnalysis.mainvariations[index].push(chessAnalysis.numvariations[index] - 1);
                        $("#moves")
                            .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                        chessAnalysis.hm[index] = 0;
                        chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                        if (chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1]) {}
                        else {
                            chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [""];
                        }
                        chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [-1, -1];
                        chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        chessAnalysis.hm[index] += 1;
                    }
                }
                else {
                    if (chessAnalysis.hm[index] === chessAnalysis.moves[index][chessAnalysis.hmv[index]].length) {
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        var writestatus = "newmove"
                        chessAnalysis.hm[index] += 1;
                        chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = "";
                    }
                    else if (newVariationSearch(_.last(chessAnalysis.chess[index].history()), chessAnalysis.hm[index], chessAnalysis.hmv[index]) && _.last(chessAnalysis.chess[index].history()) !== chessAnalysis.moves[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]) {
                        <!-- this sections is for a new variation; first an empty moves array and movesfen aray is created added to the moves array.  The moves from the previous hmv(the variation we are branching off from) are then added to each; finally, we change the hmv variable to the new variation and add the last move from the "chess" variable(this variable was updated when user clicked to the current position)-->)
                        chessAnalysis.numvariations[index] += 1
                        var writestatus = "new";
                        $("#moves")
                            .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                        chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.children[index][chessAnalysis.hmv[index]].push([chessAnalysis.numvariations[index] - 1, chessAnalysis.hm[index]]);
                        chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                        chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [];
                        for (var i = 0; i < chessAnalysis.hm[index]; i++) {
                            chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1][i] = chessAnalysis.moves[index][chessAnalysis.hmv[index]][i]
                            chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1][i] = "";
                        }
                        chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [chessAnalysis.hmv[index], chessAnalysis.hm[index]];
                        chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                        chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                        chessAnalysis.hm[index] += 1;
                        chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = "";
                        var writestatus = "none";
                    }
                    else {
                        chessAnalysis.hm[index] += 1
                        var writestatus = "none";
                    }
                }
                <!-- now we get ready for the next drop-->
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                for (var y = 0; y < 64; y++) {
                    dropstring = ""
                    for (z = 0; z < squaremoves[squares[y]].length; z++) {
                        if (z !== squaremoves[squares[y]].length - 1) {
                            dropstring += (squaremoves[squares[y]][z] + ",")
                        }
                        else {
                            dropstring += squaremoves[squares[y]][z]
                        }
                    };
                    $(squares[y])
                        .droppable("option", "accept", dropstring);
                };
                chessAnalysis.dropcount[index] = chessAnalysis.dropcount[index] + 1;
                $("#comment-input")
                    .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                chessAnalysis.currentHighlighted.css("background-color", "white");
                $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                    .css("background-color", "yellow");
                chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                $("#table-container-moves")
                    .scrollLeft((chessAnalysis.hm[index] - 1) * 78);
                $("#table-container-top-labels")
                    .scrollLeft((chessAnalysis.hm[index] - 1) * 78);
                $("#table-container-moves")
                    .scrollTop((chessAnalysis.hmv[index]) * 53);
                $("#table-container-left-labels")
                    .scrollTop((chessAnalysis.hmv[index]) * 53);
                chessAnalysis.update_move_tree();
                 if (chessAnalysis.mode === "engine_analysis_mode") {

                        changeEnginePosition();
                    }
                    else if (chessAnalysis.mode === "your_analysis_mode") {
                        $("#fen-container")
                            .val(chessAnalysis.chess[index].fen())
                        $("#annotation_moves")
                            .html(writeAnnotation(0, chessAnalysis.hm[index - 1], 0))
                        chessAnalysis.editStatus[index]=true;
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
                        $(".ann_comment").unbind("input");
                        $(".ann_comment").on("input",function(){
                            chessAnalysis.editStatus[index]=true;
                            var id=$(this).attr("id")
                            var moves_num=id.split("var")[1].split("comment")
                            var hm=moves_num[1]
                            var hmv=moves_num[0]
                            $(this).width(getWidthOfInput(document.getElementById(id)))
                            //if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
                            //{
                                $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                            //}
                            chessAnalysis.movescomment[index][hmv][hm]=$(this).val()
                        });
                        $(".ann_comment").css("max-width",$("#annotation_moves").width())
                        $(".ann_comment").each(function(){
                            var id=$(this).attr("id")
                            var width=getWidthOfInput(document.getElementById(id))
                            $(this).width(width);
                            $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                        })
                    }
            }
        });
};
var $blackking = $('<img src="/assets/blackking.png" class="piece" id="k">');
var $blackrook1 = $('<img src="/assets/blackrook.png" class="piece" id="r1" >');
var $blackrook2 = $('<img src="/assets/blackrook.png" class="piece" id="r2" >');
var $blackrook3 = $('<img src="/assets/blackrook.png" class="piece" id="r3" >');
var $blackrook4 = $('<img src="/assets/blackrook.png" class="piece" id="r4" >');
var $blackrook5 = $('<img src="/assets/blackrook.png" class="piece" id="r5" >');
var $blackrook6 = $('<img src="/assets/blackrook.png" class="piece" id="r6" >');
var $blackrook7 = $('<img src="/assets/blackrook.png" class="piece" id="r7" >');
var $blackrook8 = $('<img src="/assets/blackrook.png" class="piece" id="r8" >');
var $blackbishop1 = $('<img src="/assets/blackbishop.png" class="piece" id="b1" >');
var $blackbishop2 = $('<img src="/assets/blackbishop.png" class="piece" id="b2" >');
var $blackbishop3 = $('<img src="/assets/blackbishop.png" class="piece" id="b3" >');
var $blackbishop4 = $('<img src="/assets/blackbishop.png" class="piece" id="b4" >');
var $blackbishop5 = $('<img src="/assets/blackbishop.png" class="piece" id="b5" >');
var $blackbishop6 = $('<img src="/assets/blackbishop.png" class="piece" id="b6" >');
var $blackbishop7 = $('<img src="/assets/blackbishop.png" class="piece" id="b7" >');
var $blackbishop8 = $('<img src="/assets/blackbishop.png" class="piece" id="b8" >');
var $blackknight1 = $('<img src="/assets/blackknight.png" class="piece"  id="n1" >');
var $blackknight2 = $('<img src="/assets/blackknight.png" class="piece"  id="n2" >');
var $blackknight3 = $('<img src="/assets/blackknight.png" class="piece"  id="n3" >');
var $blackknight4 = $('<img src="/assets/blackknight.png" class="piece"  id="n4" >');
var $blackknight5 = $('<img src="/assets/blackknight.png" class="piece"  id="n5" >');
var $blackknight6 = $('<img src="/assets/blackknight.png" class="piece"  id="n6" >');
var $blackknight7 = $('<img src="/assets/blackknight.png" class="piece"  id="n7" >');
var $blackknight8 = $('<img src="/assets/blackknight.png" class="piece"  id="n8" >');
var $blackpawn1 = $('<img src="/assets/blackpawn.png" class="piece" id="p1" >');
var $blackpawn2 = $('<img src="/assets/blackpawn.png" class="piece"  id="p2" >');
var $blackpawn3 = $('<img src="/assets/blackpawn.png" class="piece"  id="p3" >');
var $blackpawn4 = $('<img src="/assets/blackpawn.png" class="piece"  id="p4" >');
var $blackpawn5 = $('<img src="/assets/blackpawn.png" class="piece"  id="p5" >');
var $blackpawn6 = $('<img src="/assets/blackpawn.png" class="piece" id="p6" >');
var $blackpawn7 = $('<img src="/assets/blackpawn.png" class="piece"  id="p7" >');
var $blackpawn8 = $('<img src="/assets/blackpawn.png" class="piece" id="p8" >');
var $blackqueen = $('<img src="/assets/blackqueen.png" class="piece"  id="q" >');
var $blackqueen2 = $('<img src="/assets/blackqueen.png" class="piece"  id="q2" >');
var $blackqueen3 = $('<img src="/assets/blackqueen.png" class="piece"  id="q3" >');
var $blackqueen4 = $('<img src="/assets/blackqueen.png" class="piece"  id="q4" >');
var $blackqueen5 = $('<img src="/assets/blackqueen.png" class="piece"  id="q5" >');
var $blackqueen6 = $('<img src="/assets/blackqueen.png" class="piece"  id="q6" >');
var $blackqueen7 = $('<img src="/assets/blackqueen.png" class="piece"  id="q7" >');
var $blackqueen8 = $('<img src="/assets/blackqueen.png" class="piece"  id="q8" >');
var $whiteking = $('<img src="/assets/whiteking.png" class="piece"  id="K" >');
var $whitequeen = $('<img src="/assets/whitequeen.png" class="piece" id="Q" >');
var $whitequeen2 = $('<img src="/assets/whitequeen.png" class="piece" id="Q2" >');
var $whitequeen3 = $('<img src="/assets/whitequeen.png" class="piece" id="Q3" >');
var $whitequeen4 = $('<img src="/assets/whitequeen.png" class="piece" id="Q4" >');
var $whitequeen5 = $('<img src="/assets/whitequeen.png" class="piece" id="Q5" >');
var $whitequeen6 = $('<img src="/assets/whitequeen.png" class="piece" id="Q6" >');
var $whitequeen7 = $('<img src="/assets/whitequeen.png" class="piece" id="Q7" >');
var $whitequeen8 = $('<img src="/assets/whitequeen.png" class="piece" id="Q8" >');
var $whiterook1 = $('<img src="/assets/whiterook.png"  class="piece"  id="R1" >');
var $whiterook2 = $('<img src="/assets/whiterook.png"  class="piece"  id="R2" >');
var $whiterook3 = $('<img src="/assets/whiterook.png"  class="piece"  id="R3" >');
var $whiterook4 = $('<img src="/assets/whiterook.png"  class="piece"  id="R4" >');
var $whiterook5 = $('<img src="/assets/whiterook.png"  class="piece"  id="R5" >');
var $whiterook6 = $('<img src="/assets/whiterook.png"  class="piece"  id="R6" >');
var $whiterook7 = $('<img src="/assets/whiterook.png"  class="piece"  id="R7" >');
var $whiterook8 = $('<img src="/assets/whiterook.png"  class="piece"  id="R8" >');
var $whitebishop1 = $('<img src="/assets/whitebishop.png" class="piece"  id="B1" >');
var $whitebishop2 = $('<img src="/assets/whitebishop.png" class="piece"  id="B2" >');
var $whitebishop3 = $('<img src="/assets/whitebishop.png" class="piece"  id="B3" >');
var $whitebishop4 = $('<img src="/assets/whitebishop.png" class="piece"  id="B4" >');
var $whitebishop5 = $('<img src="/assets/whitebishop.png" class="piece"  id="B5" >');
var $whitebishop6 = $('<img src="/assets/whitebishop.png" class="piece"  id="B6" >');
var $whitebishop7 = $('<img src="/assets/whitebishop.png" class="piece"  id="B7" >');
var $whitebishop8 = $('<img src="/assets/whitebishop.png" class="piece"  id="B8" >');
var $whiteknight1 = $('<img src="/assets/whiteknight.png" class="piece"  id="N1" >');
var $whiteknight2 = $('<img src="/assets/whiteknight.png" class="piece" id="N2" >');
var $whiteknight3 = $('<img src="/assets/whiteknight.png" class="piece" id="N3" >');
var $whiteknight4 = $('<img src="/assets/whiteknight.png" class="piece"  id="N4" >');
var $whiteknight5 = $('<img src="/assets/whiteknight.png" class="piece" id="N5" >');
var $whiteknight6 = $('<img src="/assets/whiteknight.png" class="piece" id="N6" >');
var $whiteknight7 = $('<img src="/assets/whiteknight.png" class="piece"  id="N7" >');
var $whiteknight8 = $('<img src="/assets/whiteknight.png" class="piece" id="N8" >');
var $whitepawn1 = $('<img src="/assets/whitepawn.png" class="piece" id="P1" >');
var $whitepawn2 = $('<img src="/assets/whitepawn.png" class="piece" id="P2" >');
var $whitepawn3 = $('<img src="/assets/whitepawn.png" class="piece" id="P3" >');
var $whitepawn4 = $('<img src="/assets/whitepawn.png" class="piece" id="P4" >');
var $whitepawn5 = $('<img src="/assets/whitepawn.png" class="piece" id="P5" >');
var $whitepawn6 = $('<img src="/assets/whitepawn.png" class="piece" id="P6" >');
var $whitepawn7 = $('<img src="/assets/whitepawn.png" class="piece" id="P7" >');
var $whitepawn8 = $('<img src="/assets/whitepawn.png" class="piece" id="P8" >');
var piecesfunction = function () {
    var assetpieces = [$blackking, $blackqueen, $blackqueen2, $blackqueen3, $blackqueen4, $blackqueen5, $blackqueen6, $blackqueen7, $blackqueen8, $whiteking, $whitequeen, $whitequeen2, $whitequeen3, $whitequeen4, $whitequeen5, $whitequeen6, $whitequeen7, $whitequeen8, $blackrook1, $blackrook2, $blackrook3, $blackrook4, $blackrook5, $blackrook6, $blackrook7, $blackrook8, $whiterook1, $whiterook2, $whiterook3, $whiterook4, $whiterook5, $whiterook6, $whiterook7, $whiterook8, $blackbishop1, $blackbishop2, $blackbishop3, $blackbishop4, $blackbishop5, $blackbishop6, $blackbishop7, $blackbishop8, $whitebishop1, $whitebishop2, $whitebishop3, $whitebishop4, $whitebishop5, $whitebishop6, $whitebishop7, $whitebishop8, $blackknight1, $blackknight2, $blackknight3, $blackknight4, $blackknight5, $blackknight6, $blackknight7, $blackknight8, $whiteknight1, $whiteknight2, $whiteknight3, $whiteknight4, $whiteknight5, $whiteknight6, $whiteknight7, $whiteknight8, $whitepawn8, $whitepawn1, $whitepawn2, $whitepawn3, $whitepawn4, $whitepawn5, $whitepawn6, $whitepawn7, $blackpawn1, $blackpawn2, $blackpawn3, $blackpawn4, $blackpawn5, $blackpawn6, $blackpawn7, $blackpawn8];
    return assetpieces;
}
var pieces = piecesfunction();
var squares = ["#a1s", "#a2s", "#a3s", "#a4s", "#a5s", "#a6s", "#a7s", "#a8s", "#b1s", "#b2s", "#b3s", "#b4s", "#b5s", "#b6s", "#b7s", "#b8s", "#c1s", "#c2s", "#c3s", "#c4s", "#c5s", "#c6s", "#c7s", "#c8s", "#d1s", "#d2s", "#d3s", "#d4s", "#d5s", "#d6s", "#d7s", "#d8s", "#e1s", "#e2s", "#e3s", "#e4s", "#e5s", "#e6s", "#e7s", "#e8s", "#f1s", "#f2s", "#f3s", "#f4s", "#f5s", "#f6s", "#f7s", "#f8s", "#g1s", "#g2s", "#g3s", "#g4s", "#g5s", "#g6s", "#g7s", "#g8s", "#h1s", "#h2s", "#h3s", "#h4s", "#h5s", "#h6s", "#h7s", "#h8s"];
var avail = {
    "k": ["k"],
    "q": ["q", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
    "K": ["K"],
    "Q": ["Q", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
    "r": ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"],
    "R": ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
    "b": ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"],
    "B": ["B1", "B2", "B3"],
    "n": ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8"],
    "N": ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8"],
    "p": ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
    "P": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"]
};
var filelist = ["a", "b", "c", "d", "e", "f", "g", "h"];
var rowlist = ["8", "7", "6", "5", "4", "3", "2", "1"];
var ploc = {};
var getKey = function (value) {
    for (var key in ploc) {
        if (ploc[key] == value) {
            return key;
        }
    }
    return null;
};
var popup = false;
var pieces = piecesfunction();
var squaremoves = [];
var squarelocations = {};
var dropstring = "";
//this function takes a fen and adds the correct square for each piece to the "ploc" hash based on the fen
var setup = function (fen) {
   
    var avail = {
        "k": ["k"],
        "q": ["q", "q2", "q3", "q4", "q5", "q6", "q7", "q8"],
        "K": ["K"],
        "Q": ["Q", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8"],
        "r": ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"],
        "R": ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"],
        "b": ["b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8"],
        "B": ["B1", "B2", "B3"],
        "n": ["n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8"],
        "N": ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8"],
        "p": ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
        "P": ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"]
    };
    $(".piece[style]")
        .removeAttr('style');
    ploc = {};
    fen = fen.split(" ");
    fen[0] = fen[0].split("/");
    fen = [].concat.apply([], fen);
    for (var x = 0; x < 8; x++) {
        var count = 0;
        var upper = 8
        var filespot = 0
        while (count < upper) {
            if (Math.floor(fen[x][count])) {
                upper -= (Math.floor(fen[x][count]) - 1);
                filespot += Math.floor(fen[x][count]);
                count += 1
            }
            else {
                ploc[avail[fen[x][count]][0]] = "#" + filelist[filespot] + rowlist[x] + "s";
                avail[fen[x][count]].splice(0, 1);
                count += 1;
                filespot += 1;
            }
        }
    };
    //avail={"k":["k"],"q":["q"],"K":["K"],"Q":["Q","Q2"],"r":["r1","r2"],"R":["R1","R2"],"b":["b1","b2"],"B":["B1","B2"],"n":["n1","n2"],"N":["N1","N2"],"p":["p1","p2","p3","p4","p5","p6","p7","p8"],"P":["P1","P2","P3","P4","P5","P6","P7","P8"]};
};
//this function calculates the absolute offset of the upper left-hand corner of each square; this will be important later for getting the ui.draggable and droppable to work
//square moves hold an array of moves on the square, for each square;this function resets that hash
var resetsquaremoves = function () {
    for (var i = 0; i < squares.length; i++) {
        squaremoves[squares[i]] = []
    };
};
//this function actually fills up the squaremoves hash
var movegen = function () {
    resetsquaremoves();
    var mgen = chessAnalysis.chess[index].moves({
        verbose: true
    });
    for (var m = 0; m < mgen.length; m++) {
        squaremoves["#" + mgen[m]["to"] + "s"].push("#" + getKey("#" + mgen[m]["from"] + "s"));
    }
};
// this function writes the move just input by the user into the movelist box;  hmv stands for half-move-variation and represents which of the possibly many variations in the movelist to write the move to;
//halfmove is simply the halfmove of the move input(the game starts at half-move of 1)
//this function actually appends the pieces to squares based on the ploc hash
var addpieces = function () {
    $(".piece")
        .remove();
    for (var i = 0; i < pieces.length; i++) {
        $(ploc[((pieces)[i].attr('id'))])
            .append(pieces[i])
    }
};
var drag = function () {
    $('.piece')
        .draggable({
            zIndex: 10,
            revert: "invalid",
            revertDuration:100,
            cursorAt:{top:25,left:25}
        });
};
var drop = function () {
    for (var i = 0; i < 64; i++) {
        <!-- dropstring hold as string of comma separated ids of pieces that can be dropped on each square-->
        dropstring = ""
        for (z = 0; z < squaremoves[squares[i]].length; z++) {
            if (z !== squaremoves[squares[i]].length - 1) {
                dropstring += (squaremoves[squares[i]][z] + ",")
            }
            else {
                dropstring += squaremoves[squares[i]][z]
            }
        };
        $(squares[i])
            .droppable({
                accept: dropstring || false
            })
    }
    $(".square")
        .droppable({
            drop: function (event, ui) {
                var from = ploc[(ui.draggable)
                    .attr('id')].slice(1, 3);
                var to = $(this)
                    .attr('id')
                    .slice(0, 2);
                //this section checks if move is a promotion and if so generates a promotion dialogue box-->
                if (($(this)
                    .attr("id")[1] === String(8)) && ((ui.draggable)
                    .attr("id")[0] === "P")) {
                    $("#whitepopup")
                        .css("display", "inline-block");
                    $("#promotionModal")
                        .modal({
                            keyboard: "false",
                            backdrop: "static"
                        });
                    promotionclick(from, to, chessAnalysis.dropcount[index]);
                }
                else if (($(this)
                    .attr("id")[1] === String(1)) && ((ui.draggable)
                    .attr("id")[0] === "p")) {
                    $("#blackpopup")
                        .css("display", "inline-block");
                    $("#promotionModal")
                        .modal({
                            keyboard: "false",
                            backdrop: "static"
                        });
                    promotionclick(from, to, chessAnalysis.dropcount[index]);
                }
                else {
                    chessAnalysis.chess[index].move({
                        from: ploc[(ui.draggable)
                            .attr('id')].slice(1, 3),
                        to: $(this)
                            .attr('id')
                            .slice(0, 2)
                    });
                    <!-- this sections determines if the moves is to be added to current hmv or is to create a new variation-->
                    if (chessAnalysis.atStart[index]) {
                        chessAnalysis.atStart[index] = false;
                        var startcondition = true;
                        for (var i = 0; i < chessAnalysis.mainvariations[index].length; i++) {
                            if (chessAnalysis.moves[index][chessAnalysis.mainvariations[index][i]][0] === _.last(chessAnalysis.chess[index].history())) {
                                startcondition = false;
                                var writestatus = "none";
                                chessAnalysis.hmv[index] = chessAnalysis.mainvariations[index][i];
                                chessAnalysis.hm[index] += 1;
                                break;
                            }
                            else {}
                        }
                        if (startcondition === true) {
                            var writestatus = "new";
                            chessAnalysis.numvariations[index] += 1
                            chessAnalysis.mainvariations[index].push(chessAnalysis.numvariations[index] - 1);
                            $("#moves")
                                .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                            chessAnalysis.hm[index] = 0;
                            chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                            chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                            if (chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1]) {}
                            else {
                                chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [""];
                            }
                            chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [-1, -1];
                            chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                            chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                            chessAnalysis.hm[index] += 1;
                        }
                    }
                    else {
                        if (chessAnalysis.hm[index] === chessAnalysis.moves[index][chessAnalysis.hmv[index]].length) {
                            chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                            var writestatus = "newmove"
                            chessAnalysis.hm[index] += 1;
                            chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = "";
                        }
                        else if (newVariationSearch(_.last(chessAnalysis.chess[index].history()), chessAnalysis.hm[index], chessAnalysis.hmv[index]) === true && _.last(chessAnalysis.chess[index].history()) !== chessAnalysis.moves[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]) {
                            <!-- this sections is for a new variation; first an empty moves array and movesfen aray is created added to the moves array.  The moves from the previous hmv(the variation we are branching off from) are then added to each; finally, we change the hmv variable to the new variation and add the last move from the "chess" variable(this variable was updated when user clicked to the current position)-->
      
                            chessAnalysis.numvariations[index] += 1
                            var writestatus = "new";
                            $("#moves")
                                .append("<div class=var" + String(chessAnalysis.numvariations[index] - 1) + "></div>")
                            chessAnalysis.children[index][chessAnalysis.numvariations[index] - 1] = [];
                            chessAnalysis.children[index][chessAnalysis.hmv[index]].push([chessAnalysis.numvariations[index] - 1, chessAnalysis.hm[index]]);
                            chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1] = [];
                            chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1] = [];
                            for (var i = 0; i < chessAnalysis.hm[index]; i++) {
                                chessAnalysis.moves[index][chessAnalysis.numvariations[index] - 1][i] = chessAnalysis.moves[index][chessAnalysis.hmv[index]][i]
                                chessAnalysis.movescomment[index][chessAnalysis.numvariations[index] - 1][i] = "";
                            }
                            chessAnalysis.parents[index][chessAnalysis.numvariations[index] - 1] = [chessAnalysis.hmv[index], chessAnalysis.hm[index]];
                            chessAnalysis.hmv[index] = chessAnalysis.numvariations[index] - 1
                            chessAnalysis.moves[index][chessAnalysis.hmv[index]].push(_.last(chessAnalysis.chess[index].history()));
                            chessAnalysis.hm[index] += 1;
                            chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]-1] = "";
                        }
                        else if (newVariationSearch(_.last(chessAnalysis.chess[index].history()), chessAnalysis.hm[index], chessAnalysis.hmv[index]) !== true) {
                            chessAnalysis.hmv[index] = newVariationSearch(_.last(chessAnalysis.chess[index].history()), chessAnalysis.hm[index], chessAnalysis.hmv[index])
                            chessAnalysis.hm[index] += 1
                            var writestatus = "none";
                        }
                        else {
                            chessAnalysis.hm[index] += 1;
                            var writestatus = "none";
                        }
                    }
                    <!-- now we get ready for the next drop-->
                    setup(chessAnalysis.chess[index].fen());
                    addpieces();
                    movegen();
                    drag();
                    for (var y = 0; y < 64; y++) {
                        dropstring = ""
                        for (z = 0; z < squaremoves[squares[y]].length; z++) {
                            if (z !== squaremoves[squares[y]].length - 1) {
                                dropstring += (squaremoves[squares[y]][z] + ",")
                            }
                            else {
                                dropstring += squaremoves[squares[y]][z]
                            }
                        };
                        $(squares[y])
                            .droppable("option", "accept", dropstring);
                    };
                    chessAnalysis.dropcount[index] += 1;
                    $("#comment-input")
                        .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                    chessAnalysis.currentHighlighted.css("background-color", "white");
                    $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                        .css("background-color", "yellow");
                    chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                    chessAnalysis.update_move_tree();
                    if (chessAnalysis.mode === "engine_analysis_mode") {

                        changeEnginePosition();
                    }
                    else if (chessAnalysis.mode === "your_analysis_mode") {
                        $("#fen-container")
                            .val(chessAnalysis.chess[index].fen())
                        $("#annotation_moves")
                            .html(writeAnnotation(0, chessAnalysis.hm[index - 1], 0))
                        chessAnalysis.editStatus[index]=true;
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
                        $(".ann_comment").unbind("input");
                        $(".ann_comment").on("input",function(){
                            chessAnalysis.editStatus[index]=true;
                            var id=$(this).attr("id")
                            var moves_num=id.split("var")[1].split("comment")
                            var hm=moves_num[1]
                            var hmv=moves_num[0]
                            $(this).width(getWidthOfInput(document.getElementById(id)))
                            //if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
                            //{
                                $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                            //}
                            chessAnalysis.movescomment[index][hmv][hm]=$(this).val()
                        });
                        $(".ann_comment").css("max-width",$("#annotation_moves").width())
                        $(".ann_comment").each(function(){
                            var id=$(this).attr("id")
                            var width=getWidthOfInput(document.getElementById(id))
                            $(this).width(width);
                            $(this).attr('rows',Math.floor((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)/$(this).css("max-width").slice(0,$(this).css("max-width").length-2))+1)
                        })
                    }
                }
            }
        });
};
var highlight = function () {
    $('.piece')
        .hover(function () {
            $(this)
                .toggleClass("hover");
        });
}
var newVariationSearch = function (history, hm, hmv) {
    var truth = true
    _.each(chessAnalysis.children[index][chessAnalysis.hmv[index]], function (element, indicator) {
        if (element[1] === chessAnalysis.hm[index] && chessAnalysis.moves[index][element[0]][chessAnalysis.hm[index]] === history) {
            truth = element[0]
        }
    })
    if (truth === true) {
        var parent = chessAnalysis.parents[index][chessAnalysis.hmv[index]];
        if (parent[0] === -1) {
            var found = "true";
        }
        else {
            var found = "false"
        }
        var searchvariation = _.initial(chessAnalysis.moves[index][chessAnalysis.hmv[index]], chessAnalysis.moves[index][chessAnalysis.hmv[index]].length - chessAnalysis.hm[index])
        searchvariation.push(_.last(chessAnalysis.chess[index].history()))
        while (found === "false") {
            _.each(chessAnalysis.children[index][parent[0]], function (element, indicator) {
                if (searchvariation.compare(_.initial(chessAnalysis.moves[index][element[0]], chessAnalysis.moves[index][element[0]].length - chessAnalysis.hm[index] - 1)) && found === "false") {
                    truth = element[0]
                    found = "true"
                }
            })
            if (found === "false") {
                if (searchvariation.compare(_.initial(chessAnalysis.moves[index][parent[0]], chessAnalysis.moves[index][parent[0]].length - chessAnalysis.hm[index] - 1))) {
                    truth = parent[0]
                    found = "true"
                }
            }
            if (parent[1] <= chessAnalysis.hm[index] + 1 || parent[0] === -1) {
                found = "true"
            }
            else {
                parent = chessAnalysis.parents[index][parent[0]]
            }
        }
    }
    return truth
};
var keynavigate = function (location) {
    $(document)
        .keydown(function (event) {
            if (!($("input").is(":focus"))&&!$("textarea").is(":focus")) {
                chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]] = $("#comment-input")
                    .val();
                var scrollar = new Array(33, 34, 35, 36, 37, 38, 39, 40);
                var key = event.which;
                if ($.inArray(key, scrollar) > -1) {
                    event.preventDefault();
                }
                if (event.which === 37) {
                    
                    if (popup === false) {
                        if (chessAnalysis.hm[index] >= 2&&chessAnalysis.chess[index].fen()!==chessAnalysis.startpositionfen[index]) {
                            if (chessAnalysis.parents[index][chessAnalysis.hmv[index]][1] === chessAnalysis.hm[index] - 1) {
                                chessAnalysis.hmv[index] = chessAnalysis.parents[index][chessAnalysis.hmv[index]][0]
                            }
                            chessAnalysis.hm[index] = chessAnalysis.hm[index] - 1;
                            chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]));
                            setup(chessAnalysis.chess[index].fen());
                            addpieces();
                            movegen();
                            drag();
                            drop();
                            if (chessAnalysis.mode === "engine_analysis_mode") {

                                changeEnginePosition();
                            }
                            else if (chessAnalysis.mode === "your_analysis_mode") {
                                $("#fen-container")
                                    .val(chessAnalysis.chess[index].fen())
                            }
                            $("#comment-input")
                                .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                        }
                        else {
                            chessAnalysis.atStart[index] = true;
                            chessAnalysis.hm[index] = 0;
                            chessAnalysis.chess[index].load(chessAnalysis.startpositionfen[index]);
                            setup(chessAnalysis.startpositionfen[index]);
                            addpieces();
                            movegen();
                            drag();
                            drop();
                            if (chessAnalysis.mode === "engine_analysis_mode") {

                                changeEnginePosition();
                            }
                            else if (chessAnalysis.mode === "your_analysis_mode") {
                                $("#fen-container")
                                    .val(chessAnalysis.chess[index].fen())
                            }
                            $("#comment-input")
                                .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][0]);
                        }
                        $("#table-container-moves")
                            .scrollLeft($("#table-container-moves")
                                .scrollLeft() - 78);
                        $("#table-container-top-labels")
                            .scrollLeft($("#table-container-moves")
                                .scrollLeft() - 78);
                    }
                }
                else if (event.which === 39) {
                    if (chessAnalysis.moves[index][chessAnalysis.hmv[index]] && (popup === false)) {
                        var nextmovelist = [
                            [chessAnalysis.moves[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]], chessAnalysis.hmv[index], chessAnalysis.hm[index]]
                        ];
                        for (var i = 0; i < chessAnalysis.moves[index].length; i++) {
                            if (chessAnalysis.parents[index][i][0] === chessAnalysis.hmv[index] && chessAnalysis.parents[index][i][1] === chessAnalysis.hm[index]) {
                                nextmovelist.push([chessAnalysis.moves[index][i][chessAnalysis.hm[index]], i, chessAnalysis.hm[index]]);
                            }
                        }
                        if (chessAnalysis.hm[index] === 0) {
                            for (var i = 0; i < chessAnalysis.mainvariations[index].length; i++) {
                                if (chessAnalysis.mainvariations[index][i] !== chessAnalysis.hmv[index]) {
                                    nextmovelist.push([chessAnalysis.moves[index][chessAnalysis.mainvariations[index][i]][chessAnalysis.hm[index]], chessAnalysis.mainvariations[index][i], chessAnalysis.hm[index]])
                                }
                            }
                        }
                        if (nextmovelist.length === 1 && chessAnalysis.moves[index][chessAnalysis.hmv[index]].length > chessAnalysis.hm[index]) {
                            chessAnalysis.atStart[index] = false;
                            chessAnalysis.hm[index] = chessAnalysis.hm[index] + 1;
                            chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]));
                            setup(chessAnalysis.chess[index].fen());
                            addpieces();
                            movegen();
                            drag();
                            drop();
                            if (chessAnalysis.mode === "engine_analysis_mode") {

                                changeEnginePosition();
                            }
                            else if (chessAnalysis.mode === "your_analysis_mode") {
                                $("#fen-container")
                                    .val(chessAnalysis.chess[index].fen())
                            }
                            $("#comment-input")
                                .val(chessAnalysis.movescomment[index][chessAnalysis.hmv[index]][chessAnalysis.hm[index]]);
                            $("#table-container-moves")
                                .scrollLeft($("#table-container-moves")
                                    .scrollLeft() + 78);
                            $("#table-container-top-labels")
                                .scrollLeft($("#table-container-moves")
                                    .scrollLeft() + 78);
                        }
                        else if (chessAnalysis.moves[index][chessAnalysis.hmv[index]].length > chessAnalysis.hm[index]) {
                            popup = true;
                            $("#next-move-select")
                                .css("display", "inline-block");
                            $("#modal")
                                .css("display", "block");
                            $("#modal")
                                .css("width", $(document)
                                    .width());
                            $("#modal")
                                .css("height", $(document)
                                    .height());
                            $("#next-move-select")
                                .css("position", "absolute");
                            $("#next-move-select")
                                .css("top", ($(window)
                                    .height() / 2) - 75 - 51);
                            $("#next-move-select")
                                .css("left", ($(window)
                                    .width() / 2) - 100);
                            $("#next-move-select")
                                .css("z-index", 1200);
                            for (var i = 0; i < nextmovelist.length; i++) {
                                $("#scroll-container")
                                    .append("<div class=move-row id=moverow" + i + ">" + nextmovelist[i][0] + "</div>")
                            }
                            nextmovechoose(chessAnalysis.dropcount[index], nextmovelist.length, nextmovelist);
                        }
                    }
                }
                chessAnalysis.currentHighlighted.css("background-color", "white");
                $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1))
                    .css("background-color", "yellow");
                chessAnalysis.currentHighlighted = $("#row" + String(_.indexOf(chessAnalysis.sortlist[index], chessAnalysis.hmv[index])) + "col" + (chessAnalysis.hm[index] - 1));
                if (location === "improved_fen") {
                    chessAnalysis.update_move_tree()
                }
            }
        });
}
var add_spinner = function (elementId) {
    var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    var target = $("#spin" + elementId)
    var spinner = new Spinner(opts)
        .spin(target);
}
var changeEnginePosition = function () {
     var controller = EngineEval.__container__.lookup("controller:position").send("newPosition");
    
        
    $("#fen-container")
        .val(chessAnalysis.chess[index].fen())
    if (chessAnalysis.engineStatus === true) {
        chessAnalysis.engines[0].terminate();
        chessAnalysis.engines[0] = new Worker('stockfish.js');
        chessAnalysis.engines[0].postMessage("uci")
        chessAnalysis.engines[0].postMessage("position fen " + chessAnalysis.chess[index].fen())
        chessAnalysis.engines[0].postMessage("go infinite")
        jQuery.ajax({
            type: "POST",
            url: "/api/evaluations",
            data: {
                fen: chessAnalysis.chess[index].fen()
            },
            async: false,
            success: function (data) {
                evaluationId = data.id
            },
            error: function (data) {
                alert("There was an error uploading analysis.  Please refresh the page and try again.")
            }
        })
        chessAnalysis.engines[0].onmessage = function (event) {
            if (event.data.split(" ")[3] == "seldepth") {
                if (event.data.split(" ")[9].match(/[0-9]+/)) {
                    var nodes = event.data.split(" ")[9]
                    var depth = event.data.split(" ")[2]
                    var seldepth = event.data.split(" ")[4]
                    var evaluation = event.data.split(" ")[7] / 100
                    $("#browser_engine_nodes")
                        .text(nodes);
                    $("#browser_engine_depth")
                        .text(depth);
                    $("#browser_engine_seldepth")
                        .text(seldepth);
                    jQuery.ajax({
                        type: "PUT",
                        url: "/api/evaluations/" + evaluationId,
                        data: {
                            nodes: nodes,
                            seldepth: seldepth,
                            depth: depth,
                            evaluation: evaluation,
                            engine: "stockfish_browser"
                        },
                        error: function (data) {
                            alert("There was an error uploading analysis.  Please refresh the page and try again.")
                        }
                    })
                    if (chessAnalysis.chess[index].turn() === 'b') {
                        $("#browser_engine_evaluation")
                            .text(evaluation * -1);
                    }
                    else {
                        $("#browser_engine_evaluation")
                            .text(evaluation);
                    }
                }
                else {
                    var nodes = event.data.split(" ")[10]
                    var depth = event.data.split(" ")[2]
                    var seldepth = event.data.split(" ")[4]
                    var evaluation = event.data.split(" ")[7] / 100
                    $("#browser_engine_nodes")
                        .text(nodes);
                    $("#browser_engine_depth")
                        .text(depth);
                    $("#browser_engine_seldepth")
                        .text(seldepth);
                    jQuery.ajax({
                        type: "PUT",
                        url: "/api/evaluations/" + evaluationId,
                        data: {
                            nodes: nodes,
                            seldepth: seldepth,
                            depth: depth,
                            evaluation: evaluation,
                            engine: "stockfish_browser"
                        },
                        error: function (data) {
                            alert("There was an error uploading analysis.  Please refresh the page and try again.")
                        }
                    })
                    if (chessAnalysis.chess[index].turn() === 'b') {
                        $("#browser_engine_evaluation")
                            .text(evaluation * -1);
                    }
                    else {
                        $("#browser_engine_evaluation")
                            .text(evaluation);
                    }
                }
            }
        }
    }
    //chat.emit("position",{fen:chess.fen(),room:connectionId})
}
var writeAnnotation = function (hmv, hm, spotAdjustment) {

    if(chessAnalysis.moves[index].length===0)
      {$("#annotation_moves").empty()}
    else{var fragment = "";
      var spot = 0 + spotAdjustment;
      var sortedChildren = _.sortBy(chessAnalysis.children[index][hmv], function (array) {
          return array[1]
      })
      if (sortedChildren.length > 0) {
          _.each(sortedChildren, function (element, indicator) {
              if (element[1] > spot) {
                  while (spot <= element[1]) {
                      if ((spot - spotAdjustment + hm) % 2 === 0) {
                        if(chessAnalysis.movescomment[index][hmv][spot]){
                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                        }
                        fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + ((spot - spotAdjustment + hm) / 2 + 1) + ". " + chessAnalysis.moves[index][hmv][spot] + "</span>"
                      }
                      else {
                        if(chessAnalysis.movescomment[index][hmv][spot]){

                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                        }
                          fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + chessAnalysis.moves[index][hmv][spot] + "</span>"
                        
                      }
                      if(spot+1===chessAnalysis.moves[index][hmv].length&&chessAnalysis.movescomment[index][hmv][spot+1]){
                        fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot+1] + "</textarea>"
                      }
                      spot += 1;
                  }
                  fragment += (" (" + writeAnnotation(element[0], element[1] + chessAnalysis.hm[index - 1], element[1]) + " )")
              }
              else {
                  fragment += (" (" + writeAnnotation(element[0], element[1] + chessAnalysis.hm[index - 1], element[1]) + " )")
              }
          })
          while (spot < chessAnalysis.moves[index][hmv].length) {
              if ((spot - spotAdjustment + hm) % 2 === 0) {
                if(chessAnalysis.movescomment[index][hmv][spot]){
                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                }
                  fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + ((spot - spotAdjustment + hm) / 2 + 1) + ". " + chessAnalysis.moves[index][hmv][spot] + "</span>"
              }
              else {
                if(chessAnalysis.movescomment[index][hmv][spot]){
                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                }
                  fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + chessAnalysis.moves[index][hmv][spot] + "</span>"
              }
              if(spot+1===chessAnalysis.moves[index][hmv].length&&chessAnalysis.movescomment[index][hmv][spot+1]){
                        fragment+= "<textarea class='ann_move' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot+1] + "</textarea>"
                }
              spot += 1;
          }
      }
      else {

          _.each(_.rest(chessAnalysis.moves[index][hmv], spot), function (move, indicator) {
              if ((spot - spotAdjustment + hm) % 2 === 0) {
                if(chessAnalysis.movescomment[index][hmv][spot]){

                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                        }
                  fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + ((spot - spotAdjustment + hm) / 2 + 1) + ". " + chessAnalysis.moves[index][hmv][spot] + "</span>"
              }
              else {
                if(chessAnalysis.movescomment[index][hmv][spot]){
                            fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + spot + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot] + "</textarea>"  
                        }
                  fragment += "<span class='ann_move' id='var" + hmv + "move" + spot + "'>" + " " + chessAnalysis.moves[index][hmv][spot] + "</span>"
              }
              if(spot+1===chessAnalysis.moves[index][hmv].length&&chessAnalysis.movescomment[index][hmv][spot+1]){
                        fragment+= "<textarea class='ann_comment' id='var" + hmv + "comment" + (spot+1) + "'>" + " " + chessAnalysis.movescomment[index][hmv][spot+1] + "</textarea>"
                }
              spot += 1;
          })
      }
      return (fragment)
    }
}
var clickNavigate = function (id_string) {
    chessAnalysis.hmv[index] = parseInt(id_string.split("var")[1].split("move")[0])
    chessAnalysis.hm[index] = parseInt(id_string.split("move")[1]) + 1;
    chessAnalysis.chess[index].load(generatePosition(chessAnalysis.hmv[index], chessAnalysis.hm[index], chessAnalysis.startpositionfen[index]))
    setup(chessAnalysis.chess[index].fen());
    addpieces();
    movegen();
    drag();
    drop();
}

var getWidthOfInput=function(input) {
    
        var tmp = document.createElement("span");
        tmp.className = "input-element tmp-element";
        tmp.innerHTML = input.value
        document.body.appendChild(tmp);
        var theWidth = tmp.offsetWidth+8
        document.body.removeChild(tmp);
        return theWidth;
}


