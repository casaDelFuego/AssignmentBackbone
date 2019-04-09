let LoginModel = Backbone.Model.extend({
  defaults: function() {
    return {
      isLoggedIn: false
    }
  },

  sync: function(){

  },

  toggle: function() {
    this.save({isLoggedIn: !this.get("isLoggedIn")});
  }
})




let LoginView =Backbone.View.extend({
  initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},

  render: function(){
    let state = this.model.get('isLoggedIn');
    let content = ``;
      if (state) {
        content = `You are logged in<br/><button class="loginButton">Logout</button>`
      } else {
        content = `You aren't logged in<br/><button class="loginButton">Login</button>`
      }
    this.$el.html(content);
  },

  events: {
		"click .loginButton": 'clickOnLogin'
	},

  clickOnLogin: function() {
    this.model.toggle();
  }
})



$(document).ready(function() {
  let loginModel = new LoginModel({});
	let view = new LoginView({
		el: '.loginBox',
		model: loginModel
	});
	view.render();
});
