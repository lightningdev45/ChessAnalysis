EngineEval.Evaluation = DS.Model.extend({
	evaluation:DS.attr('number'),
	depth:DS.attr('number'),
	seldepth:DS.attr('number'),
	nodes:DS.attr('number'),
	user_id:DS.attr('number'),
	legit:DS.attr('number'),
	engine:DS.attr('string'),
	fen:DS.attr('string'),
	position_id:DS.attr('number'),
	seconds_run:DS.attr('number'),
	index:DS.attr('number')
});