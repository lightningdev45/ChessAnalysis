EngineEval.AnnotationEditsController = Ember.ArrayController.extend({
    needs: ["auth", "alert"],
    isAuthenticated: Em.computed.alias("controllers.auth.isAuthenticated"),
    possibleQualityScores: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    currentHead:1,
    currentVisible:1,
    actions: {
        vote: function (vote, id) {
            var controller = this;
            $.ajax({
                url: "/annotation_quality_votes",
                type: "POST",
                data: {
                    vote: vote,
                    annotation_id: id
                },
                success: function (data) {
                    controller.store.find("annotation", id).then(function (annotation) {
                        annotation.set("quality", data.quality)
                    })
                },
                error: function (error) {
                    controller.get("controllers.alert").send("showAlert", JSON.parse(error.responseText).error, "alert alert-warning alert-dismissable", "devise-alert")
                    controller.transitionToRoute("login")
                }
            })
        },
        view: function (id) {
        	var controller=this;
        	this.get("store").find("annotation",id).then(function(annotation){
	        	index = 1;
	            $("#annotation_moves")
	                .empty();
	            chessAnalysis.hm[index] = 0;
	            chessAnalysis.hmv[index] = 0;
	            chessAnalysis.children[index] = JSON.parse(annotation.children)
	            chessAnalysis.parents[index] = JSON.parse(annotation.parents)
	            chessAnalysis.moves[index] = JSON.parse(annotation.moves)
	            chessAnalysis.mainvariations[index] = JSON.parse(annotation.mainvariations)
	            chessAnalysis.movescomment[index] = JSON.parse(annotation.comments)
	            chessAnalysis.numvariations[index] = annotation.numvariations
	            chessAnalysis.dropcount[index] = annotation.dropcount
	            chessAnalysis.atStart[index] = false
	            chessAnalysis.chess[index].load(chessAnalysis.chess[index - 1].fen())
	            chessAnalysis.startpositionfen[index] = chessAnalysis.chess[index - 1].fen();
	            chessAnalysis.editStatus[index] = false;
	            $("#fen-container")
	                .val(chessAnalysis.chess[index].fen())
	            $("#annotation_moves")
	                .html(writeAnnotation(0, 0, 0))
	            $(".ann_move")
	                .click(function () {
	                    clickNavigate($(this)
	                        .attr("id"))
	                })
	            $(".ann_move")
	                .hover(function () {
	                    annIn($(this)
	                        .attr("id"), false)
	                }, function () {
	                    annOut()
	                });
	            $(".ann_comment").unbind("input");
	            $(".ann_comment").on("input", function () {
	                chessAnalysis.editStatus[index] = true;
	                var id = $(this).attr("id")
	                var moves_num = id.split("var")[1].split("comment")
	                var hm = moves_num[1]
	                var hmv = moves_num[0]
	                $(this).width(getWidthOfInput(document.getElementById(id)))
	                //if((document.getElementById(id).style.width.slice(0,document.getElementById(id).style.width.length-2)-8)>parseInt($(this).css("max-width").slice(0,$(this).css("max-width").length-2)))
	                //{
	                $(this).attr('rows', Math.floor((document.getElementById(id).style.width.slice(0, document.getElementById(id).style.width.length - 2) - 8) / $(this).css("max-width").slice(0, $(this).css("max-width").length - 2)) + 1)
	                //}
	                chessAnalysis.movescomment[index][hmv][hm] = $(this).val()
	            });
	            $(".ann_comment")
	                .css("max-width", $("#annotation_moves")
	                    .width())
	            $(".ann_comment")
	                .each(function () {
	                    var id = $(this)
	                        .attr("id")
	                    var width = getWidthOfInput(document.getElementById(id))
	                    $(this)
	                        .width(width);
	                    $(this).attr('rows', Math.floor((document.getElementById(id).style.width.slice(0, document.getElementById(id).style.width.length - 2) - 8) / $(this).css("max-width").slice(0, $(this).css("max-width").length - 2)) + 1)
	                })	
	            setup(chessAnalysis.chess[index].fen())
				addpieces();
				annotation.set("visible",true)
				controller.get("store").find("annotation",controller.get("currentVisible")).then(function(annotation){
					annotation.set("visible",false)
				})
				controller.set("currentVisible",annotation.get("id"))
				if(controller.get("currentVisible")!=controller.get("currentHead")){
					$("#update-annotation-button-container .btn").addClass("disabled")
				}
				else{
					$("#update-annotation-button-container .btn").removeClass("disabled")
				}
	        	})

	        },
        rollback: function (id) {
            alert("rollback")
        },
        changePage: function (index) {
            this.set("currentPage", index)
            $("#annotation_edit_table").css("opacity", 0)
            $("#annotation_edit_table").fadeTo(500, 1)
        },
        editQualityScore: function (id) {
            this.get("store").find("annotation", id).then(function (annotation) {
                annotation.set("isEditing", true)
            })
        }
    },
    currentPage: 1,
    visibleList: function () {
        return _.first(_.rest(this.get("model"), (this.get("currentPage") - 1) * 6), 6)
    }.property("model", "model.[]", "currentPage"),
    pagination: function () {
        var controller = this;
        var length = this.get("model").length
        if (length % 6 === 0) {
            var ceiling = Math.floor(length / 6)
        } else {
            var ceiling = (Math.floor(length / 6) + 1)
        }
        var pagination = _.map(_.range(1, ceiling + 1), function (page) {
            if (page === controller.get("currentPage")) {
                return [page, true]
            } else {
                return [page, false]
            }
        })
        return pagination
    }.property("model", "model.[]", "currentPage")

})