import 'bulma/css/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


// https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f
// https://nextjs.org/learn/basics/navigate-between-pages/link-with-a-button

let url = 'https://gist.githubusercontent.com/weiwuprojects/1fc01dffcbe6f7be50066c9b4033a0b5/raw/1f0daf773c1f49ee7a07a7857ae144a8c9c1d32e/store_data.json';

let categoryIcons = {
	'Concentrate': 'fas fa-tint',
	'Wax': 'fas fa-tint',
	'Sativa': 'fas fa-cannabis',
	'Indica': 'fas fa-cannabis',
	'Hybrid': 'fas fa-cannabis',
	'Edible': 'fas fa-cookie-bite',
	'Preroll': 'fas fa-joint'
}

class Index extends React.Component {

	state = {
		data: []
	}

	async componentDidMount(){
		let data = await fetch(url).then( res => res.json() );
		this.setState({ data })
		console.log(data);
	}

	render(){
		return (
			<div style={{ height: '100%', backgroundColor: '#242323', padding: '0 10px 0 10px' }}>
				<Header />
				{ this.state.data.map( store => <div>
																					<StoreHeader store={store.store_info} />
																					<ProductTiles products={store.strains} />
																				</div>
															) 
				}
			</div>
		);
	}
}

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
					<a class="button is-primary"> <i class="fas fa-clock" style={{ marginRight: '5px' }} />Open Now</a>
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
			<div class="column is-one-fifth"></div>
			<div class="column">
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
						{/* <p class="subtitle is-6"></p> */}
						<span class="tag is-success is-medium"><i class={iconClass} style={{ marginRight: '5px' }}/>{item.category.name}</span>
					</div>
				</div>

				<div class="content">
					<p>{item.prices.gram ? item.prices.gram[0].price : 'what'}</p>
					<p>1g</p>
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