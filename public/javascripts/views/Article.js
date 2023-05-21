import Abstract from './Abstract.js'

export default class extends Abstract {
	constructor(id) {
		super()
		this.id = id
		this.setTitle('Article')
	}
	async getArticle() {
		const article = await $.ajax({
			url: `http://localhost:3000/articles/${this.id}`,
			method: 'GET',
			dataType: 'json',
		})
		return article
	}
	async getComments() {
		const comments = await $.ajax({
			url: `http://localhost:3000/comments/${this.id}`,
			method: 'GET',
			dataType: 'json',
		})
		const commentsHtml = comments.map(
			(comment) => `
            <span class="full-blog-date">Comment from ${comment.authorEmail}</span>
            <p>${comment.content}</p>
        `
		)
		return commentsHtml.join('')
	}
	async getHtml() {
		const article = await this.getArticle()
		const publishedAt = new Date(article.updatedAt)
		const date = `${publishedAt.getDate()}/${
			publishedAt.getMonth() + 1
		}/${publishedAt.getFullYear()}`
		const comments = await this.getComments()
		return (
			`
        <div class="full-blog-container">
            <h1>${article.title}</h1>
            <span class="full-blog-date">Created at ${date} by
                <a href="../user/${article.authorName}" data-link>${article.authorName}</a>
            </span>
            <br/>
            <section class="full-blog-content">
                <img src="${article.imageUrl}" alt="" class="full-blog-image" align="left">
                <p>${article.content}</p>
            </section>
        </div>
        <br/>
        <input type="text" id="email-box" placeholder="Enter you email" style="width:35%">
        <br/>
        <textarea id="comment-box" placeholder="Enter comment" style="width:70%"></textarea>
        <button id="post">Post</button>
        <br/>
        ` + comments
		)
	}
}
