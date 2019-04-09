const tabTitles = [ 'Flight', 'Hotel', 'Car' ];
const tabContent = [ 'Here you can find the best flight' , 'Book a hotel room here and get the best price', 'Rent a car here'];

let TabModel = Backbone.Model.extend({
   defaults: function(){
     return {
        selectedTab: 0
     }
   },

   select: function(num){
     this.save({selectedTab: num})
   },

   sync: function(){}
});

let TabView = Backbone.View.extend({
  initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

  render: function(){
    let tabIndex = this.model.get('selectedTab');
    let activeContent = tabContent[tabIndex];
    let titlesHtml = tabTitles.map((x,i)=>{
        let selectedClass = '';
        if (i===tabIndex){
          selectedClass = 'selectedClass'
        }
       return `<span data-idx="${i}", class="tabTitle ${selectedClass}">${x}</span>`
    }).join('');
    this.$el.html(`<div class="tabTitles">${titlesHtml}</br><div class="tabContent"></br>${activeContent}</div></div>`);
  },

  events: {
    "click .tabTitle": 'onTitleClick'
	},

  onTitleClick: function(event) {
    let clickedTab = parseInt(event.target.dataset.idx);
    //console.log("button was clicked", arguments);
    this.model.select(clickedTab);
  }

});



$(document).ready(function() {
  let tabModel = new TabModel({});
	let view = new TabView({
		el: '.tabs',
		model: tabModel
	});
	view.render();
});
