import Abstract from './Abstract.js'

export default class extends Abstract {
	constructor() {
		super()
		this.setTitle('Home')
	}
	async getHtml() {
		return `
                <h1>Hello world ! <br> Welcome to my blog .</h1>
                <a href="/articles" data-link>View articles</a>
            `
	}
}
