import {Component} from 'react';

class App extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mainpage: true,
			results: [],
			search: '',
			selected: null
		}
	  }
  
	state = {
		results: [],
		search: ''
	}

	handleChange = (e) => {
		this.setState({search: e.target.value});
	}
	
	handleSearch = (e) => {
		const encodedValue = encodeURIComponent(this.state.search);
		fetch(`http://localhost:4000/businesses/search?term=${encodedValue}`)
			.then(resp => resp.json())
			.then(data => this.setState({results: data.businesses}))
		console.log(this.state.results)
	}
	
	handleSwitchPages = (id) => {
		this.setState({selected: id, mainpage: false})
	}
	
	handleBack = (e) => {
		this.setState({mainpage: true});
	}

	render(){
		if(this.state.mainpage){
			return(
				<div>
					<label>
						<h2>Plaidypus Code Challenge</h2>
						<h6>Anthony Smith</h6>
						Search Naperville: <input type="text" value={this.state.search} onChange={this.handleChange} />
					</label>
					<button onClick={this.handleSearch}>Search</button>
					<div>{this.state.results.map((business) => {
						return (
						  <li key={business.id} className='list' onClick={() => this.handleSwitchPages(business.id)}>
							<label>{business.name}</label><br></br>
							<label>{business.location.address1}</label>
							<label>{business.location.address2}</label>
							<label>{business.location.address3}</label>
						  </li>
						);
					})}
					</div>
				</div>
			)
		}else{
			let data = this.state.results.find(e => e.id === this.state.selected)
			
			return(
				<div>
					<label><h2>{data.name}</h2></label>
					<img src={data.image_url} width="500" height="400" alt="" />
					<label><h6>{data.location.address1}</h6></label>
					<label><h6>{data.location.address2}</h6></label>
					<label><h6>{data.location.address3}</h6></label>
					<label><h6>{data.display_phone}</h6></label>
					<label><h6>{"Yelp rating: " + data.rating + " from " + data.review_count + " reviews"}</h6></label>
					<button onClick={this.handleBack}>Back</button>
				</div>
			)
		}
	}
}

export default App;
