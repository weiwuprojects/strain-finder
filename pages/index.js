import Link from 'next/link';
import 'bulma/css/bulma.css'

// https://blog.logrocket.com/how-to-build-a-server-rendered-react-app-with-next-express-d5a389e7ab2f
// https://nextjs.org/learn/basics/navigate-between-pages/link-with-a-button
class Index extends React.Component {
	render(){
		return (
			<div class="has-background-dark" style={{ height: '100vh' }}>
				<Header />
				<a class="button">cat</a>
			</div>
		);
	}
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