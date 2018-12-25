import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './css/style.css';

let categoryIcons = {
	'Concentrate': 'fas fa-tint',
	'Wax': 'fas fa-tint',
	'Sativa': 'fas fa-cannabis',
	'Indica': 'fas fa-cannabis',
	'Hybrid': 'fas fa-cannabis',
	'Edible': 'fas fa-cookie-bite',
	'Preroll': 'fas fa-joint',
	'Gear': 'fas fa-cog',
	'Drink': 'fas fa-wine-bottle'
}

class Index extends React.Component {

	state = {
		data: [],
		searchText: '',
		userLocation: null,
		error: null,
		isLoading: false,
	}

	async componentDidMount(){
		document.title = 'Strain Finder';
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.savePosition, (err) => console.log(err));
		} else {
			alert('Geolocation is not enabled in your browser. Please use a browser which supports it.');
		}
	}

	savePosition = (position) => {
		this.setState({ userLocation: position.coords });
	}

	handleChange = (e) => {
		if (e.key === 'Enter'){
			this.handleSearch();
			return;
		}
		this.setState({ searchText: e.target.value });
	}

	handleSearch = async () => {
		this.setState({ isLoading: true, data: [] });
		let { searchText, userLocation } = this.state;

		if (userLocation === null){
			this.setState({ isLoading: false, error: 'Geolocation not enabled!' });
			return;
		}
		else {
			let { latitude, longitude } = userLocation;
			searchText = searchText.replace(/\ /g, '+');
			let url = `${window.location.origin}/api/${searchText}?lat=${latitude}&long=${longitude}`
			let data = await fetch(url).then( res => res.json() );
			this.setState({ data, error: null })
		}
		this.setState({ isLoading: false });
	}

	render(){
		return (
			<React.Fragment>
				<Header />
				<div className="main">
					<SearchForm isLoading={this.state.isLoading} handleChange={this.handleChange} handleSearch={this.handleSearch} error={this.state.error} />
					{ this.state.data.map( store => <StoreContainer store={store} /> ) }
				</div>
			</React.Fragment>
		);
	}
}

/* 
   fadeout searchform after load and place in navbar 
   Getting location... loader
*/
const SearchForm = ({ isLoading, handleChange, handleSearch, error }) =>
	<div class="columns fade-in-bottom" style={{ paddingTop: '20px' }}>
		<div class="column is-offset-4">
			<div class="control">
				<label class="label has-text-white" style={{ fontWeight: '300' }}>Search for strains near you</label>
				<input className="input strain-input" type="text" onChange={handleChange} onKeyPress={ e => e.key === 'Enter' ? handleSearch() : null }/>
				<a class={`button ${isLoading ? 'is-loading' : ''}`} onClick={handleSearch}>
					<i class="fas fa-search" style={{ marginRight: '0' }} />
				</a>
				{ error ? <p class="has-text-danger"><i class="fas fa-exclamation-triangle"/>{error}</p> : null }
			</div>
		</div>
		<div class="column"></div>
	</div>

const StoreContainer = ({ store }) => 
	<React.Fragment>
		<StoreHeader store={store.store_info} />
		<ProductTiles products={store.strains} />
	</React.Fragment>

const StoreHeader = ({ store }) => 
	<div class="container has-text-white fade-in">
		<div class="level">
			<div class="level-left">
				<div class="level-item">
					<figure class="image is-96x96">
						<img class="is-rounded" src={store.avatar_image.small_url} />
					</figure>
				</div>	

				<div class="level-item is-block">
					<a href={store.web_url} target="_blank" style={{ fontSize: '1.25rem', color: 'white' }}>{store.name}</a>
					<p>{store.address}, {store.city}</p>
				</div>

				<div class="level-item is-block">
					<a class="button is-info"> <i class="fas fa-clock" />Open Now</a>
				</div>

			</div>
		</div>
		<hr class="divider" />
	</div>



const ProductTiles = ({ products }) => {
	let firstColumn =  products.slice(0).filter( (value, index) => index % 3 === 0 );
	let secondColumn = products.slice(1).filter( (value, index) => index % 3 === 0 );
	let thirdColumn =  products.slice(2).filter( (value, index) => index % 3 === 0 );
	
	let firstDelay = 0.2;
	let secondDelay = 0.4;
	let thirdDelay = 0.6;

	return (
		<div class="columns">
			<div class="column is-offset-one-fifth">
				{ firstColumn.map( item => { 
						firstDelay += 0.6;
						return <ProductCard item={item} delay={firstDelay} />;
					})
				}
			</div>
			<div class="column">
				{ secondColumn.map( item => { 
						secondDelay += 0.6;
						return <ProductCard item={item} delay={secondDelay} />;
					})
				}
			</div>
			<div class="column">
				{ thirdColumn.map( item => { 
						thirdDelay += 0.6;
						return <ProductCard item={item} delay={thirdDelay} />;
					})
				}
			</div>
			<div class="column is-one-fifth"></div>
		</div>
	);
}

const ProductCard = ({ item, delay }) => {
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
		<div class="box fade-in-bottom" style={{ animationDelay: `${delay}s` }}>
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
							<span class="tag is-success is-medium"><i class={iconClass}/>{item.category.name}</span>
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
			<p class="subtitle has-text-white fade-in"><i class="fas fa-cannabis fa-lg" /></p>
	    </a>
	  </div>
	</nav>


export default Index