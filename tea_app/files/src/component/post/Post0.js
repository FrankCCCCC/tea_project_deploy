import React from 'react';
import {Remarkable} from 'remarkable';
import '../darkdown_air_style/css/air_md.css';
// import { response } from 'express';

const h = `<h1 id="sample-markdown">Sample Markdown</h1>
<p>This is some basic, sample markdown.</p>
<h2 id="second-heading">Second Heading</h2>
<ul>
<li>Unordered lists, and:<ol>
<li>One</li>
<li>Two</li>
<li>Three</li>
</ol>
</li>
<li>More</li>
</ul>
<blockquote>
<p>Blockquote</p>
</blockquote>
<p>And <strong>bold</strong>, <em>italics</em>, and even <em>italics and later <strong>bold</strong></em>. Even <del>strikethrough</del>. <a href="https://markdowntohtml.com">A link</a> to somewhere.</p>
<p>And code highlighting:</p>
<pre><code class="lang-js"><span class="hljs-keyword">var</span> foo = <span class="hljs-string">'bar'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span><span class="hljs-params">(s)</span> </span>{
   <span class="hljs-keyword">return</span> foo + <span class="hljs-string">':'</span> + s;
}
</code></pre>
<p>Or inline code like <code>var foo = &#39;bar&#39;;</code>.</p>
<p>Or an image of bears</p>
<p><img src="http://placebear.com/200/200" alt="bears"></p>
<p>The end ...</p>
`;

class Post extends React.Component{
  constructor(props){
    super(props);
    var md = new Remarkable();
    this.state = {html: document.createElement('div')};
    this.state = {
      html: {
        __html: md.render("# Loading")
      }
    };
  }

  componentDidMount(){
    
    // console.log(md.render())
    // var html = document.createElement('div');
    
    fetch('http://192.168.43.203:8000/post_action/query_post?id=13').then(
      (response) => {
        console.log(response)
        // console.log(response.json())
        // html = { __html: JSON.parse(resolve).content};
        return response.json()
      }
    ).then(
      (resolve) => {
        console.log(resolve)
        this.setState({
          html: { __html: resolve.content}
        });
      }
    ).catch(
      (reject) => {
        console.log(reject)
        // html = { __html: <h1>Error</h1>};
      }
    )
  }

  render(){
    return (
      <div class="md">
        <div style={{fontFamily: 'inherit',
        textAlign: 'center',
        color: '#444',
        fontWeight: 300,
        margin: '6rem auto 1rem',
        maxWidth: '48rem',
        lineHeight: '1.85'}}>
            <div dangerouslySetInnerHTML={this.state.html}>
            </div>
        </div>
      </div>  
    );
  }
};



export default Post;