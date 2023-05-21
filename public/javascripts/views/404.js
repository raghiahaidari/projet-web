import Abstract from './Abstract.js'

export default class extends Abstract {
	constructor() {
		super()
		this.setTitle('Page Not Found')
	}
	async getHtml() {
		return `
                <h1>404 Not Found</h1>
                <p>
                    This page does not exist.
                </p>
            `
	}
}
