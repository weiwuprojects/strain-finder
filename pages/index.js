import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


// https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f
// https://nextjs.org/learn/basics/navigate-between-pages/link-with-a-button

let url = 'https://gist.githubusercontent.com/weiwuprojects/1fc01dffcbe6f7be50066c9b4033a0b5/raw/1f0daf773c1f49ee7a07a7857ae144a8c9c1d32e/store_data.json';


// http://localhost:3000/api/lime+key?lat=34.041855999999996&long=-118.21056

let categoryIcons = {
	'Concentrate': 'fas fa-tint',
	'Wax': 'fas fa-tint',
	'Sativa': 'fas fa-cannabis',
	'Indica': 'fas fa-cannabis',
	'Hybrid': 'fas fa-cannabis',
	'Edible': 'fas fa-cookie-bite',
	'Preroll': 'fas fa-joint',
	'Gear': 'fas fa-cog'
}

class Index extends React.Component {

	state = {
		data: [],
		searchText: '',
		userLocation: null,
		isLoading: false,
	}

	async componentDidMount(){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.savePosition, (err) => console.log(err));
		} else {
			alert('Geolocation is not enabled in your browser. Please use a browser which supports it.');
		}
	}

	savePosition = (position) => {
		this.setState({ userLocation: position.coords });
		console.log(this.state.userLocation)
	}

	handleChange = (e) => this.setState({ searchText: e.target.value });

	handleSearch = async () => {
		this.setState({ isLoading: true });
		let { searchText, userLocation } = this.state;

		if (userLocation === null){
			console.log('user has not enable location')
			return;
		}
		else {
			let { latitude, longitude } = userLocation;
			searchText = searchText.replace(/\ /g, '+');
			url = `${window.location.origin}/api/${searchText}?lat=${latitude}&long=${longitude}`
			let data = await fetch(url).then( res => res.json() );
			this.setState({ data })
		}
		this.setState({ isLoading: false });
	}

	render(){
		return (
			<div style={{ height: '100vh' }}>
				<Header />
				<div style={{ height: '100%', backgroundColor: '#242323', padding: '0 10px 0 11px' }}>
					<SearchForm isLoading={this.state.isLoading} handleChange={this.handleChange} handleSearch={this.handleSearch} />
					{ this.state.data.map( store => <StoreContainer store={store} /> ) }
				</div>
			</div>
		);
	}
}

/* add fade in when text is typed and when component loads */
const SearchForm = ({ isLoading, handleChange, handleSearch }) =>
	<div class="columns" style={{ paddingTop: '20px' }}>
		<div class="column is-offset-4">
			<div class="control">
				<label class="label has-text-white" style={{ fontWeight: '300' }}>Search for strains near you</label>
				<input class="input" type="text"  style={{ backgroundColor: '#242323', borderColor: '#fff', color: '#fff', width: '60%' }} onChange={handleChange} />
				<a class={`button ${isLoading ? 'is-loading' : ''}`} style={{ backgroundColor: '#242323 !important', border: '1px solid white', color: '#fff', marginLeft: '10px' }} onClick={handleSearch}>
					<i class="fas fa-search" />
				</a>
			</div>
		</div>
	</div>

const StoreContainer = ({ store }) => 
	<React.Fragment>
		<StoreHeader store={store.store_info} />
		<ProductTiles products={store.strains} />
	</React.Fragment>

const StoreHeader = ({ store }) => 
	<div class="container has-text-white">
		<div class="level">
			<div class="level-left">
				<div class="level-item">
					<figure class="image is-96x96">
						<img class="is-rounded" src={store.avatar_image.small_url} />
					</figure>
				</div>	

				<div class="level-item is-block">
					<p style={{ fontSize: '1.25rem' }}>{store.name}</p>
					<p>{store.address}, {store.city}</p>
				</div>

				<div class="level-item is-block">
					<a class="button is-info"> <i class="fas fa-clock" style={{ marginRight: '5px' }} />Open Now</a>
				</div>

			</div>
		</div>
		<hr style={{ backgroundColor: 'white', height: '1px' }} />
	</div>



const ProductTiles = ({ products }) => {
	let firstColumnCourses =  products.slice(0).filter( (value, index) => index % 3 === 0 );
	let secondColumnCourses = products.slice(1).filter( (value, index) => index % 3 === 0 );
	let thirdColumnCourses =  products.slice(2).filter( (value, index) => index % 3 === 0 );
	
	return (
		<div class="columns">
			<div class="column is-offset-one-fifth">
				{ firstColumnCourses.map( course => <ProductCard item={course} />)}
			</div>
			<div class="column">
				{ secondColumnCourses.map( course => <ProductCard item={course} />)}
			</div>
			<div class="column">
				{ thirdColumnCourses.map( course => <ProductCard item={course} />)}
			</div>
			<div class="column is-one-fifth"></div>
		</div>
	);
}


const ProductCard = ({ item }) => {
	let iconClass = categoryIcons[item.category.name];

	let priceSuffix, price;
	if ( 'ounce' in item.prices){
		price = item.prices.ounce[0].price;
		priceSuffix = '1/8';
	}
	else if ( 'unit' in item.prices){
		price = item.prices.unit.price;
		priceSuffix = 'each';
	}
	else if ('gram' in item.prices){
		price = item.prices.gram[0].price;
		priceSuffix = item.prices.gram[0].units + 'g';
	} 

	return (
		<div class="box" style={{ margin: '0 0 20px 0'}}>
			<div class="card-image">
				<figure class="image is-4by3">
					<img src={item.avatar_image.large_url} alt="Placeholder image" />
				</figure>
			</div>
			<div class="card-content">
				<div class="media">
					<div class="media-content">
						<p class="subtitle">{item.name}</p>
					</div>
				</div>

				<div class="content" style={{ marginTop: '5px' }}>
					<div class="field is-grouped is-grouped-multiline">
						<div class="control">
							<div class="tags has-addons">
								<span class="tag is-light is-medium">${price}</span>
								<span class="tag is-dark is-medium">{priceSuffix}</span>
							</div>
						</div>
						<div class="control">
							<span class="tag is-success is-medium"><i class={iconClass} style={{ marginRight: '5px' }}/>{item.category.name}</span>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}



const Header = () =>
	<nav className="navbar is-black" role="navigation" aria-label="main navigation">
	  <div class="navbar-brand">
	    <a class="navbar-item">
				<p class="subtitle has-text-white">Strains</p>
	    </a>

	    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	      <span aria-hidden="true"></span>
	    </a>
	  </div>
	</nav>


export default Index