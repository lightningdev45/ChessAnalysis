EngineEval.Views.TagsIndex = Backbone.View.extend({

  template: JST['tags/tags'],
  tagName:"ul",
  className:"tags",
  render:function(){

  	$(this.el).html(this.template({tags:this.collection}))
  	return this

  }

});

