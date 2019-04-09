const cities = [
  {city: 'Paris'},
  {city: 'Berlin'},
  {city: 'London'}
]

const CitiesModel = Backbone.Model.extend({
	defaults: {
		city: null,
		edit: false, formCity: ''
	},
	editMode: function() {
		console.log('CitiesModel.editMode');
		this.set({
			edit: true,
			formCity: this.get('formCity'),
		});
	},
	saveEdits: function() {
		console.log('CitiesModel.saveEdits');
		this.set({
			edit: false,
			city: this.get('formCity'),
		});
	},
});

const CitiesCollection = Backbone.Collection.extend({
	model: CitiesModel
});

let citiesCollection = new CitiesCollection(cities);

const CitiesView = Backbone.View.extend({
	tag: 'li',
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

	render: function() {
		let formCity = this.model.get('formCity');
		let edit = `<button class="edit">Edit</button>`;
		let remove = `<button class="delete">Delete</button>`;
		let content;
		if( this.model.get('edit') ) {
			let city = `<input class="editCity" value="${formCity}"/>`;
			let saveBox = `<button class="save">Save</button>`;
			content = `${city} ${saveBox} ${remove}`;
		} else {
			let city = this.model.get('city');
			content = `${city} - ${edit} ${remove}`;
		}
		this.$el.html(content);
	},
	events: {
		"click .delete": 'remove',
		"click .edit": 'editMode',
		"click .save": 'saveChanges',
		"change .editCity": 'editCity',
	},
	remove: function(event) {
		citiesCollection.remove(this.model);
	},
	editMode: function(event) {
		this.model.editMode();
	},
	saveChanges: function(event) {
		this.model.saveEdits();
	},
	editCity: function(event) {
		this.model.set({ formCity: event.target.value });
	},
})

const CitiesListView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function() {
		let el = this.$el;
		let ul = $('<ul></ul>')
		this.collection.forEach(function(cities) {
			let citiesView = new CitiesView({ model: cities });
			citiesView.render();
			ul.append(citiesView.$el);
		});
		el.html('');
		el.append(ul);
		let addForm = `<input type="text" id="inputCity" placeholder="city">
		<button type="button" id="addCityButton">Add to list</button>`;
		el.append(addForm);
	},
	events: {
		"click #addCityButton": 'onAddCityButtonClick',
		"change #inputCity": 'onCityChange',

	},

	onAddCityButtonClick: function(event) {
		let model = new CitiesModel({
			city: this.form.city
		});
		this.collection.add(model);
	},
	form: { city: ''},
	onCityChange: function(event) { this.form.city = event.target.value; },

})


$(document).ready(function() {
	let citiesListView = new CitiesListView({
		collection: citiesCollection,
		el: '#destinations'
	});
	citiesListView.render();
	console.log('document ready');
});
