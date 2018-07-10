new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [],
		cart: [],
		results: [],
		newSearch: 'cartoon',
		lastSearch: '',
		loadNum: 10
	},
	methods: {
		appendItems(){
			if(this.items.length < this.results.length){
				let append = this.results.slice(this.items.length, this.items.length + this.loadNum);
				this.items = this.items.concat(append);
			}
		},
		addItem(index){
			var item = this.items[index];
			var found = false;

			for(let i = 0; i < this.cart.length; i++){
				if (this.cart[i].id === item.id){
					found = true;
					this.cart[i].qty++;
					break;
				}
			}
			if(!found){
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: 9.99
				});
			}
		},
		inc(item){
			item.qty++;
		},
		dec(item){
			item.qty--;
			if(item.qty <=0){
				for(let i = 0; i < this.cart.length; i++){
					if (this.cart[i].id === item.id){
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit(){
			if(this.newSearch.length){
				this.items = [];
				this.$http.get('/search/'.concat(this.newSearch)).then(
					(res)=>{
						this.lastSearch = this.newSearch;
						this.results = res.data;
						this.appendItems();
					}
				);
			}
		}
	},
	mounted(){
		this.onSubmit();

		var elem = document.getElementById('product-list-bottom')
		var watcher = scrollMonitor.create(elem);
				watcher.enterViewport(()=>this.appendItems());
	},
	computed: {
		getPrice(){
			for(let i = 0; i < this.cart.length; i++){
				 this.totalItem = this.cart[i].price * this.cart[i].qty;
				 console.log(this.cart);
			}
				return this.total = this.totalItem;
		}
	},
	filters: {
		currency(price){
			return '$'.concat(price.toFixed(2));
		},
	}
});

