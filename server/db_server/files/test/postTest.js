const should = require('should')
const DbPost = require('../db/DbPost');
const config = require('../config/serverConfig')
const fetch = require('node-fetch')

var allPostCount = 0;

describe('DbPost.createPostTable', () => {
    it('should create posts_table', done => {
        DbPost.createPostsTable().then((resolve) => {
            resolve.command.should.equal('CREATE')
            done()
        })
    })
})

describe('DbPost.queryPostsCountAll', () => {
    it('should count all posts in posts_table', done => {
        DbPost.queryPostsCountAll().then((resolve) => {
            allPostCount = parseInt(resolve.rows[0].count);
            console.log(`All Post Count: ${allPostCount}`)
            resolve.command.should.equal('SELECT')
            done()
        })
    })
})



describe('DbPost.queryPostList', () => {
    it(`should list posts in posts_table count=3, offset=2, ${allPostCount}`, done => {
        DbPost.queryPostList(3, 2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allPostCount - 2)
            resolve.rowCount.should.equal(3)
            done()
        })
    })
    it(`should list all posts in posts_table count=-1, offset=0, ${allPostCount}`, done => {
        DbPost.queryPostList(-1, 0).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allPostCount)
            resolve.rowCount.should.equal(allPostCount)
            done()
        })
    })
    it(`should list all posts in posts_table count=-1, offset=-2, ${allPostCount}`, done => {
        DbPost.queryPostList(-1, -1).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rows[0].id.should.equal(allPostCount)
            resolve.rowCount.should.equal(allPostCount)
            done()
        })
    })
})

describe('DbPost.queryPost', () => {
    it(`should query post in posts_table id=2`, done => {
        DbPost.queryPost(2).then((resolve) => {
            resolve.command.should.equal('SELECT')
            resolve.rowCount.should.equal(1)
            resolve.rows[0].id.should.equal(2)
            done()
        })
    })
})

var postCountActions = 0;
describe('PostAction.queryPostsCountAll', () => {
    it(`should send the count of all posts in posts_table`, done => {
        fetch(config.post_action_url + '/query_posts_count_all',{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((response) => {
              console.log(response.result)
            response.status.should.equal(config.success)
            postCountActions = response.result.count
            done()
            return response
        }).catch(
            (reject) => {
              console.log(reject)            
            }
        )
    })
})

describe('PostAction.insertPost', () => {
    it(`should send the id of inserted posts in posts_table`, done => {
        fetch(config.post_action_url + '/insert_post',{
            method: 'POST',
            body: new URLSearchParams({
                title: "凍頂村的故事",
                subtitle: "A Test of query a post",
                author: "SHC",
                cover_img: "hill3.jpg",
                content: `# Remarkable↵↵> Experience real-time editing with Remarkable!↵↵Click the \`clear\` link to start with a clean slate, or get the \`permalink\` to share or save your results.↵↵***↵↵# h1 Heading↵## h2 Heading↵### h3 Heading↵#### h4 Heading↵##### h5 Heading↵###### h6 Heading↵↵↵## Horizontal Rules↵↵___↵↵***↵↵***↵↵↵## Typographic replacements↵↵Enable typographer option to see result.↵↵(c) (C) (r) (R) (tm) (TM) (p) (P) +-↵↵test.. test... test..... test?..... test!....↵↵!!!!!! ???? ,,↵↵Remarkable -- awesome↵↵"Smartypants, double quotes"↵↵'Smartypants, single quotes'↵↵↵## Emphasis↵↵**This is bold text**↵↵__This is bold text__↵↵*This is italic text*↵↵_This is italic text_↵↵~~Deleted text~~↵↵Superscript: 19^th^↵↵Subscript: H~2~O↵↵++Inserted text++↵↵==Marked text==↵↵↵## Blockquotes↵↵> Blockquotes can also be nested...↵>> ...by using additional greater-than signs right next to each other...↵> > > ...or with spaces between arrows.↵↵↵## Lists↵↵Unordered↵↵+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`↵+ Sub-lists are made by indenting 2 spaces:↵  - Marker character change forces new list start:↵    * Ac tristique libero volutpat at↵    + Facilisis in pretium nisl aliquet↵    - Nulla volutpat aliquam velit↵+ Very easy!↵↵Ordered↵↵1. Lorem ipsum dolor sit amet↵2. Consectetur adipiscing elit↵3. Integer molestie lorem at massa↵↵↵1. You can use sequential numbers...↵1. ...or keep all the numbers as \`1.\`↵↵Start numbering with offset:↵↵57. foo↵1. bar↵↵↵## Code↵↵Inline \`code\`↵↵Indented code↵↵    // Some comments↵    line 1 of code↵    line 2 of code↵    line 3 of code↵↵↵Block code "fences"↵↵\`\`\`↵Sample text here...↵\`\`\`↵↵Syntax highlighting↵↵\`\`\` js↵var foo = function (bar) {↵  return bar++;↵};↵↵console.log(foo(5));↵\`\`\`↵↵## Tables↵↵| Option | Description |↵| ------ | ----------- |↵| data   | path to data files to supply the data that will be passed into templates. |↵| engine | engine to be used for processing templates. Handlebars is the default. |↵| ext    | extension to be used for dest files. |↵↵Right aligned columns↵↵| Option | Description |↵| ------:| -----------:|↵| data   | path to data files to supply the data that will be passed into templates. |↵| engine | engine to be used for processing templates. Handlebars is the default. |↵| ext    | extension to be used for dest files. |↵↵↵## Links↵↵[link text](http://dev.nodeca.com)↵↵[link with title](http://nodeca.github.io/pica/demo/ "title text!")↵↵Autoconverted link https://github.com/nodeca/pica (enable linkify to see)↵↵↵## Images↵↵![Minion](https://octodex.github.com/images/minion.png)↵![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")↵↵Like links, Images also have a footnote style syntax↵↵![Alt text][id]↵↵With a reference later in the document defining the URL location:↵↵[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"↵↵↵## Footnotes↵↵Footnote 1 link[^first].↵↵Footnote 2 link[^second].↵↵Inline footnote^[Text of inline footnote] definition.↵↵Duplicated footnote reference[^second].↵↵[^first]: Footnote **can have markup**↵↵    and multiple paragraphs.↵↵[^second]: Footnote text.↵↵↵## Definition lists↵↵Term 1↵↵:   Definition 1↵with lazy continuation.↵↵Term 2 with *inline markup*↵↵:   Definition 2↵↵        { some code, part of Definition 2 }↵↵    Third paragraph of definition 2.↵↵_Compact style:_↵↵Term 1↵  ~ Definition 1↵↵Term 2↵  ~ Definition 2a↵  ~ Definition 2b↵↵↵## Abbreviations↵↵This is HTML abbreviation example.↵↵It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.↵↵*[HTML]: Hyper Text Markup Language↵↵↵***↵↵__Advertisement :)__↵↵- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image↵  resize in browser.↵- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly↵  i18n with plurals support and easy syntax.↵↵You'll like those projects! :)↵`
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response.result.id)
            console.log(postCountActions)
            response.status.should.equal(config.success)
            response.result.id.should.equal(postCountActions+1)
            postCountActions = postCountActions + 1
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

describe('PostAction.queryPostById', () => {
    it(`should send the post of queryed id=2 in posts_table`, done => {
        fetch(config.post_action_url + '/query_post_by_id',{
            method: 'POST',
            body: new URLSearchParams({
                id: 2
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            // console.log(response)
            response.status.should.equal(config.success)
            response.result.id.should.equal(2)
              done()
              return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})

// describe('PostAction.queryPostByName', () => {
//     it(`should send the post of queryed name='Oolong Tea' in posts_table`, done => {
//         fetch(config.post_action_url + '/query_post_by_name',{
//             method: 'POST',
//             body: new URLSearchParams({
//                 name: "Oolong Tea"
//             }),
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then((response) => {
//             return response.json()
//         }).then((response) => {
//             //   console.log(response)
//             response.status.should.equal(config.success)
//             response.result.forEach((post, index, array) => {
//                 post.name.should.equal('Oolong Tea')
//             })
            
//               done()
//               return response
//         }).catch((reject) => {
//               console.log(reject)            
//         })
//     })
// })

describe('PostAction.queryPostList', () => {
    it(`should send posts list count=2, offset=3 in posts_table`, done => {
        fetch(config.post_action_url + '/query_post_list',{
            method: 'POST',
            body: new URLSearchParams({
                count: 2,
                offset: 3
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            response.status.should.equal(config.success)
            response.result.length.should.equal(2)
            done()
            return response
        }).catch((reject) => {
              console.log(reject)            
        })
    })
})