class Story {
    constructor(title, creator) {
        this.title = title
        this.creator = creator
        this._comments = []
        this._replies = []
        this._likes = []
    }
    get likes() {
        let likesNumber = this._likes.length

        if (likesNumber == 0) {
            return `${this.title} has 0 likes`
        }
        if (likesNumber == 1) {
            return `${this._likes[0]} likes this story!`
        }

        return `${this._likes[0]} and ${likesNumber - 1} others like this story!`
    }
    like(username) {
        let user = this._likes.find(u => u == username)

        if (user) {
            throw new Error("You can't like the same story twice!")
        }
        if (username == this.creator) {
            throw new Error("You can't like your own story!")
        }
        this._likes.push(username)
        return `${username} liked ${this.title}!`
    }

    dislike(username) {
        let user = this._likes.find(u => u == username)

        if (user == undefined) {
            throw new Error("You can't dislike this story!")
        }

        let index = this._likes.indexOf(user)
        this._likes.splice(index, 1)

        return `${username} disliked ${this.title}`
    }

    comment(username, content, id) {
        let comment = this._comments.find(c => c.Id == id)

        if (id == undefined || comment == undefined) {
            let commentLength = this._comments.length
            this._comments.push({
                Id: commentLength + 1,
                Username: username,
                Content: content,
                Replies: this._replies,
            })
            return `${username} commented on ${this.title}`
        }
        if (comment) {
            let findId = this._replies.length
            if (findId == 1) {
                this._replies.push({
                    Id: Number(id) + 0.2,
                    Username: username,
                    Content: content,
                })
                return "You replied successfully"
            }
            this._replies.push({
                Id: Number(id) + 0.1,
                Username: username,
                Content: content,
            })
            return "You replied successfully"
        }
    }
    
    toString(sortingType) {
        if (sortingType == 'desc'){
            this._comments.reverse();
            for (let comment of this._comments) {
                comment.Replies.reverse();
            }
        }
        if (sortingType == 'username') {
            if ( this._comments.length > 1) {
                this._comments.sort((c1, c2) => c1.Username.localeCompare(c2.Username));
            }
            for (let comment of this._comments) {
                if (comment.Replies.length > 1) {
                    comment.Replies.sort((c1, c2) => c1.Username.localeCompare(c2.Username));
                }
            }
        }
        let result = [];
        result.push(`Title: ${this.title}`);
        result.push(`Creator: ${this.creator}`);
        result.push('Likes: ' + this._likes.length);
        result.push(`Comments:`);
        for (let c of this._comments) {
            result.push(`-- ${c.Id}. ${c.Username}: ${c.Content}`);
            for (let r of c.Replies) {
                result.push(`--- ${r.Id}. ${r.Username}: ${r.Content}`);
            }
        }
        return result.join('\n');
    }
}


let art = new Story("My Story", "Anny");
art.like("John");
console.log(art.likes);
art.dislike("John");
console.log(art.likes);
art.comment("Sammy", "Some Content");
console.log(art.comment("Ammy", "New Content"));
art.comment("Zane", "Reply", 1);
art.comment("Jessy", "Nice :)");
console.log(art.comment("SAmmy", "Reply@", 1));
console.log()
console.log(art.toString('username'));
console.log()
art.like("Zane");
console.log(art.toString('desc'));


