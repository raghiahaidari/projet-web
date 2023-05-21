import Home from './views/Home.js'
import Articles from './views/Articles.js'
import Article from './views/Article.js'
import err404 from './views/404.js'


  
const navigateTo = (url) => {
	history.pushState({}, '', url)
	router()
}

const router = async () => {
	let view = null
	let path = location.pathname
	path = path.split('/')
	path = path.filter((item) => item !== '')
	if (path.length === 0) {
		view = new Home()
	} else if (path[0] === 'articles') {
		if (path.length === 1) {
			view = new Articles()
		} else if (path.length === 2) {
			const id = path[1]
			view = new Article(id)
		} else {
			view = new err404()
		}
	} else {
		view = new err404()
	}
	const html = await view.getHtml()
	$('#app').html(html)
}

$(window).on('popstate', () => {
	router()
})
$(document).ready(() => {
	$(document).on('click', '[data-link]', (e) => {
		e.preventDefault()
		navigateTo(e.target.href)
	})
	router()
})
