TaxProgram.ReturnPartnersPartnersListRoute = Ember.Route.extend({

	model:function(){
		return $.getJSON("/partners_list").then(function(data){
			return data.partners
		})
		
	}
})