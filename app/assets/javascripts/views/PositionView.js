EngineEval.PositionView = Ember.View.extend({
  templateName: 'position',
  didInsertElement: function() {

    var view=this;
    var list=["a","b","c","d","e","f","g","h"]
   var numlist=[8,7,6,5,4,3,2,1];

    for(var x=0;x<8;x++){
      for(var y=0;y<8;y++){
        if(y%2==0&&x%2==0){
          $("#board").append("<div class='square whitesquare' id='"+list[y]+numlist[x]+"s'></div>")
        }
        else if(x%2!=0&&y%2!=0){
          $("#board").append("<div class='square whitesquare' id='"+list[y]+numlist[x]+"s'></div>")
        }
        else{
        $("#board").append("<div class='square blacksquare' id='"+list[y]+numlist[x]+"s'></div>")

        }
    }
    }
    setup(chessAnalysis.chess[index].fen());
    addpieces();
    movegen();
    drag();
    drop();
    $(".opening-tag-select").on("change",function(){

        $(".opening-untag-button").attr("href","/untag_position?fen="+encodeURIComponent(chessAnalysis.chess[0].fen())+"&tag_type=opening&tag_value="+encodeURIComponent($(".opening-tag-select").val()))
    })
    $(".positional-tag-select").on("change",function(){
        $(".positional-untag-button").attr("href","/untag_position?fen="+encodeURIComponent(chessAnalysis.chess[0].fen())+"&tag_type=positional&tag_value="+encodeURIComponent($(".positional-tag-select").val()))
    })
    $(".tactics-tag-select").on("change",function(){
        $(".tactics-untag-button").attr("href","/untag_position?fen="+encodeURIComponent(chessAnalysis.chess[0].fen())+"&tag_type=tactics&tag_value="+encodeURIComponent($(".tactics-tag-select").val()))
    })
    $("#copy-fen").click(function(){       
        var hello=function(text){
          window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
        }
        hello($("#fen-container").val())
    })

     $("#load-fen").click(function(){ 
         if(chessAnalysis.editStatus[index]){
            var confirmChange=confirm("Your have made changes to the annotation.  Are you sure you want to discard those changes?")
            if(confirmChange){
                chessAnalysis.mode="engine_analysis_mode"
                $('#engine_analysis_mode a[data-toggle="tab"]').tab('show')
                index = 0;
                if($("#fen-container").val().split(" ")[1]==="w")
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2}
                else
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2+1}

                setupChess($("#fen-container").val())
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                drop();
                changeEnginePosition();   
            }
        }
        else{chessAnalysis.mode="engine_analysis_mode"
                $('#engine_analysis_mode a[data-toggle="tab"]').tab('show')
                index = 0;
                if($("#fen-container").val().split(" ")[1]==="w")
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2}
                else
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2+1}

                setupChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                drop();
                $("#fen-container").val(chessAnalysis.chess[index].fen())
                changeEnginePosition();       
        }
        
    })

    $("#load-startposition").click(function(){
        if(chessAnalysis.editStatus[index]){
            var confirmChange=confirm("Your have made changes to the annotation.  Are you sure you want to discard those changes?")
            if(confirmChange){
                chessAnalysis.mode="engine_analysis_mode"
                $('#engine_analysis_mode a[data-toggle="tab"]').tab('show')
                index = 0;
                if($("#fen-container").val().split(" ")[1]==="w")
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2}
                else
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2+1}

                setupChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                drop(); 
                $("#fen-container").val(chessAnalysis.chess[index].fen())
                changeEnginePosition();
            }
        }
        else{chessAnalysis.mode="engine_analysis_mode"
                $('#engine_analysis_mode a[data-toggle="tab"]').tab('show')
                index = 0;
                if($("#fen-container").val().split(" ")[1]==="w")
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2}
                else
                    {chessAnalysis.hm[index]=($("#fen-container").val().split(" ")[5]-1)*2+1}

                setupChess("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
                setup(chessAnalysis.chess[index].fen());
                addpieces();
                movegen();
                drag();
                drop();
                $("#fen-container").val(chessAnalysis.chess[index].fen())
                changeEnginePosition();

        }
    })

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    
        if(chessAnalysis.mode!==$(this).parent().attr("id")){
            $(e.relatedTarget).tab('show')
            
        }
    })
        window.addEventListener("beforeunload", 
  
  function (e) {
  if(chessAnalysis.editStatus[index]){
    return  "You have made changes since the last save."
  }
  else{

  return  null

}
})
        $("#update-annotation-button-container .btn").click(function(){
            if(view.get("controller").get("isAuthenticated"))
                {if(chessAnalysis.editStatus[index]===true)
                 {var continue_update=confirm("Are you sure you would like to save your changes to this annotation?")
                 if(continue_update){
                    jQuery.ajax({
                                    url: "/annotations",
                                    type: "POST",
                                    data: {
                                        moves: JSON.stringify(chessAnalysis.moves[index]),
                                        comments: JSON.stringify(chessAnalysis.movescomment[index]),
                                        mainvariations: JSON.stringify(chessAnalysis.mainvariations[index]),
                                        numvariations: chessAnalysis.numvariations[index],
                                        parents: JSON.stringify(chessAnalysis.parents[index]),
                                        children: JSON.stringify(chessAnalysis.children[index]),
                                        dropcount: chessAnalysis.dropcount[index],
                                        fen: chessAnalysis.chess[0].fen()
                                    }
                                })
                                chessAnalysis.editStatus[index]=false;
                            }
                        }
                    else{
                            alert("Please edit the annotation before updating.")
                            }
                    }
            else{view.get("controller").transitionToRoute("login")
                view.get("controller.controllers.alert").send("showAlert","You must login to complete this action!","alert alert-warning alert-dismissable","devise-alert")
                    }
            })
        $(document).unbind("keydown");
        keynavigate("show");
        $("#boardedge")
            .height($("#boardedge")
                .width())
        
        $("#browser_engine_button")
            .click(function () {
                if (chessAnalysis.engineStatus === true) {
                    chessAnalysis.engineStatus = false
                    chessAnalysis.engines[0].terminate()
                    $("#browser_engine_button")
                        .removeClass("btn-danger")
                    $("#browser_engine_button")
                        .addClass("btn-success")
                    $("#browser_engine_button")
                        .text("Start stockfish")   
                     view.get("controller").store.find("evaluation",chessAnalysis.evaluationId).then(function(stored_evaluation){
                        var id=stored_evaluation.get("id");
                            view.get("controller.controllers.evaluations").pushObject(stored_evaluation)
                             jQuery.ajax({
                                            type: "PUT",
                                            url: "/evaluations/"+id,
                                            data: {
                                                nodes: stored_evaluation.get("nodes"),
                                                seldepth: stored_evaluation.get("seldepth"),
                                                depth: stored_evaluation.get("depth"),
                                                evaluation: stored_evaluation.get("evaluation"),
                                                engine: "stockfish_browser"
                                            },
                                            success:function(data){},
                                            error: function (data) {
                                                alert("There was an error uploading analysis.  Please refresh the page and try again.")
                                            }
                                })                        
                            view.get("controller.controllers.evaluations").set("model",_.sortBy(view.get("controller.controllers.evaluations").get("model"),function(evaluation){
                                return evaluation.get("nodes")
                            }).reverse())
                            _.each(view.get("controller.controllers.evaluations").get("model"),function(evaluation,index){
                                evaluation.set("index",index+1)
                            })
                     })                                                   
                    
                 }
                else {
                    var fen=chessAnalysis.chess[index].fen()
                    chessAnalysis.engineStatus = true
                    chessAnalysis.engines[0] = new Worker('stockfish.js');
                    chessAnalysis.engines[0].postMessage("uci")
                    chessAnalysis.engines[0].postMessage("position fen " + fen)
                    jQuery.ajax({
                        type: "POST",
                        url: "/evaluations",
                        data: {
                            fen: fen
                        },
                        async: false,
                        success: function (data) {
                            chessAnalysis.evaluationId = data.id
                            view.get("controller").store.createRecord("evaluation",data)
                        },
                        error: function (data) {
                            alert("There was an error uploading analysis.  Please refresh the page and try again.")
                        }
                    })
                    $("#browser_engine_button")
                        .removeClass("btn-success")
                    $("#browser_engine_button")
                        .addClass("btn-danger")
                    $("#browser_engine_button")
                        .text("Stop Stockfish")
                    chessAnalysis.engines[0].postMessage("go infinite")
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
                                view.get("controller").store.find("evaluation",chessAnalysis.evaluationId).then(function(stored_evaluation){
                                    stored_evaluation.set("nodes",nodes)
                                    stored_evaluation.set("seldepth",seldepth)
                                    stored_evaluation.set("depth",depth)
                                    stored_evaluation.set("legit",0)
                                    if (chessAnalysis.chess[index].turn() === 'b') {
                                        stored_evaluation.set("evaluation",evaluation*-1)
                                    }
                                    else {
                                         stored_evaluation.set("evaluation",evaluation)
                                    }
                                   
                                    stored_evaluation.set("engine",'stockfish_browser')
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
                                view.get("controller").store.find("evaluation",chessAnalysis.evaluationId).then(function(stored_evaluation){
                                    stored_evaluation.set("nodes",nodes)
                                    stored_evaluation.set("seldepth",seldepth)
                                    stored_evaluation.set("depth",depth)
                                    stored_evaluation.set("legit",0)
                                    if (chessAnalysis.chess[index].turn() === 'b') {
                                        stored_evaluation.set("evaluation",evaluation*-1)
                                    }
                                    else {
                                         stored_evaluation.set("evaluation",evaluation)
                                    }
                                    stored_evaluation.set("engine",'stockfish_browser')   
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
                        };
                    }
                }
            })

        $("#fen-container")
            .val(chessAnalysis.chess[index].fen())
        connectionId = Math.floor(Math.random() * 1000000000)
        $("#connectionId")
            .append(connectionId)
        //chat = io.connect("http://localhost:8080")
        //chat.emit('subscribe',{room:connectionId})
        //chat.on("receive_evaluation",function(data){
        //$("#my_engine_evaluation").html(data.evaluation)
        //})
        $(".change-mode")
            .click(function () {             
                if (chessAnalysis.mode !== $(this)
                    .attr("id")) {
                    if(chessAnalysis.editStatus[index]){
                        var confirmChange=confirm("Your have made changes to the annotation.  Are you sure you want to discard those changes?")
                        if(confirmChange){
                            if (chessAnalysis.mode === "your_analysis_mode") {                              
                                $("#annotation-version-row").hide()
                                $(".engine-row").show()

                            }
                            chessAnalysis.mode = $(this)
                                .attr("id")
                            if (chessAnalysis.mode === "your_analysis_mode") {
                                jQuery.ajax({
                                    url: "/get_annotation_data",
                                    type: "GET",
                                    data: {
                                        fen: chessAnalysis.chess[index].fen(),version:1
                                    },
                                    error:function(data){
                                    alert("error")
                                    },
                                    success: function (data) {
                                       
                                    }
                                })
                                $(".engine-row").hide();
                                $("#annotation-version-row").show()
                            }
                            else if (chessAnalysis.mode === "engine_analysis_mode") {
                                index = 0
                                setup(chessAnalysis.chess[index].fen());
                                addpieces();
                                movegen();
                                drag();
                                drop();
                            }
                        }
                    }
                    else{
                        if (chessAnalysis.mode === "your_analysis_mode") {
                               
                                $("#annotation-version-row").hide()
                                $(".engine-row").show()

                            }
                            chessAnalysis.mode = $(this)
                                .attr("id")
                            if (chessAnalysis.mode === "your_analysis_mode") {
                                jQuery.ajax({
                                    url: "/get_annotation_data",
                                    type: "GET",
                                    data: {
                                        fen: chessAnalysis.chess[index].fen(),version:1
                                    },
                                    error:function(data){
                                    alert("error")
                                    },
                                    success: function (data) {
                                       
                                    }
                                })
                                $(".engine-row").hide();
                                $("#annotation-version-row").show()
                            }
                            else if (chessAnalysis.mode === "engine_analysis_mode") {
                                //$("#your_analysis").empty()
                                index = 0

                                setup(chessAnalysis.chess[index].fen());
                                addpieces();
                                movegen();
                                drag();
                                drop();
                            }
                        }
                    
                    }
                
            })
        $(".rmenu-cancel")
            .click(function () {
                $("#rmenu")
                    .css("display", "none");
                $("#rmenu-blank")
                    .css("display", "none");
                $("#delete-remaining")
                    .unbind("click");
                $("#delete-variation")
                    .unbind("click");
                $("#replay-variation")
                    .unbind("click");
                $("#make-critical")
                    .unbind("click");
                $("#add-comment-blank")
                    .unbind("click");
                $("#add-comment-before")
                    .unbind("click");
                $("#add-comment-after")
                    .unbind("click");
            }); 
  },
        willAnimateIn : function () {
        this.$().css("opacity", 0);
    },

    animateIn : function (done) {
        this.$().fadeTo(250, 1, done);
    },

    animateOut : function (done) {
        this.$().fadeTo(250, 0, done);
    }
});