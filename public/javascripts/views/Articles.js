import Abstract from './Abstract.js'

export default class extends Abstract {
	constructor() {
		super()
		this.setTitle('Articles')
	}

	async getArticles(page = 1) {
		const take = 10
		const skip = (page - 1) * take
		const articles = await $.ajax({
			url: `http://localhost:3000/articles?skip=${skip}&take=${take}`,
			method: 'GET',
			dataType: 'json',
		})
		return articles
	}

	async getHtml(page = 1) {
		const articlesCount = 100
		const pagesCount = articlesCount / 10
		const articles = await this.getArticles(page)

		const categorySummary = await $.ajax({
			url: 'http://localhost:3000/categories',
			method: 'GET',
			dataType: 'json',
		})

		const cards = articles.map((article) => {
			const contentPreview = article.content.substring(0, 30) + '...'
			const publishedAt = new Date(article.updatedAt)
			const date = `${publishedAt.getDate()}/${
				publishedAt.getMonth() + 1
			}/${publishedAt.getFullYear()}`
			return `<div class="container">
                        <div class="row">
                            <div class="col-md-4 offset-md-4">
                                <div class="blog-card">
                                    <img src="${article.imageUrl}" alt="" class="blog-thumbnail">
                                    <div class="blog-container">
                                        <a href="/category/${article.categoryName}" class="nav__link blog-category text-uppercase dark-link" data-link>${article.categoryName}</a>
                                        <h4 class="mt-2 font-weight-bold"><a href="/articles/${article.id}" class="nav__link dark-link" data-link>${article.title}</a></h4>
                                        <p class="blog-desc">${contentPreview}</p>
                                        <div class="blog-footer">
                                            <div>
                                                <a href="/user/${article.authorName}" class="nav__link" data-link>${article.authorName}</a>
                                            </div>
                                            <small>${date}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
		})

		const categoryCounts = {}
		articles.forEach((article) => {
			categoryCounts[article.categoryName] =
				(categoryCounts[article.categoryName] || 0) + 1
		})

		const categorySummaryText = Object.entries(categoryCounts)
			.map(([category, count]) => `${category} (${count})`)
			.join(', ')

		return `<h1>Articles</h1><p>Categories: ${categorySummaryText}</p> `.concat(cards.join(''))
	}
}
