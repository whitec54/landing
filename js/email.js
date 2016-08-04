
	var display = new Vue({
		el:"#app",

		data:{
			showEmail: false,
			emailSent:false,
			email:"",
			body:"",
			name:"",
			subject:"",
		},

		methods:{
			toggleEmail: function(){
				this.showEmail = !this.showEmail;
				this.emailSent = false;
			},
			sendEmail: function(){
				$.ajax({
			        url: "//formspree.io/cameronscwhite@gmail.com",
			        method: "POST",
			        data: {
			        	name: this.name,
			        	subject: this.subject,
			        	email: this.email,
			        	message: this.body,
			        },
			        dataType: "json"
		        });
						this.emailSent = true;
		        this.$emit("email.sent");
 			},
			resetEmail: function(){
				this.name = "";
				this.subject = "";
				this.email = "";
				this.body = "";
			},
		},


		events:{
			"email.sent": function(){
				this.resetEmail();
			}
		}
	});
