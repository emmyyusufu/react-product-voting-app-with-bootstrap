Imagine that as a developer, you have been tasked with creating an MVP for a startup product that needs to be demonstarted to potential investors.

The application is a voting application inspired by Product Hunt and Reddit. In the application, products are displayed in a collection. Users can upvote the best products and the application will be automatically sort them according to the number of votes, placing the highest ones before the lowest.

The features of the app we will be building are very simple:

* Users can view the existing/displayed products.
* Users can upvote products that delight them.
* Products are sorted automatically according to vote count.

### Step 1. First things first
Fist of all, head over to Github and download the starter folder I've already created with the necessary set up for our application [here](https://github.com/emmyyusufu/react-product-voting-app-with-bootstrap/tree/starter). Do that by copying the ***URL*** provided by the green clone/download button and run in your preferred path on your command line. You must have git already installed.

<pre>git clone <i><b>URL</b></i></pre>

Once the folder is downloaded, open it in your code editor and observe the folder files and structure. It look like this:


```
├───src
|    ├───app.js
|    ├───seed.js
|    ├───style.css
└───vendor
    ├───bootstrap-3.3.7-dist
    ├───font-awesome-4.7.0
    ├───react.js
    ├───react-dom.js
    └───babel-standalone.js
```

<b>Note:</b> Your code editor should have a live server so we can serve the files to our browser to view our work. Make sure to install the extension for your preferred server. 

Under the src folder exists the *app.js* and *seed.js* files. The app.js file is where we would write most of the code for our application while the seed.js file already contains the data collection of the products to be displayed.

Our seed.js file contains the following code

```js
window.Seed = (function () {
    function generateVoteCount() {
      return Math.floor((Math.random() * 50) + 15);
    }
  
    const products = [
      {
        id: 1,
        title: 'Yellow Pail',
        description: 'On-demand sand castle construction expertise.',
        url: '#',
        votes: generateVoteCount(),
        submitterAvatarUrl: 'images/avatars/daniel.jpg',
        productImageUrl: 'images/products/image-aqua.png',
      },
                                ...
    ];
  
    return { products: products };

  }());
```

  What the code above does is that it creates a function `generateVoteCount()` which we would explain later & a `products` array that contains data of our products. They are wrapped as a self-invoking function an attached to the `window` object of our browser so they are acessible anyywhere we want them. The `Seed` function eventually returns an object with a property of products and a value of `products`. This means if we execute `Seed.products`, we would have every product object returned to us.
 
The *react.js* file is the code containing react core itself. Also, *react-dom.js* is the code that helps us render out react components we've created in HTML DOM. Finally, *babel-standalone.js* is the Babel code that transpiles the advanced JSX and ES6 code we will be working with into ES5 (the most common JavaScript specification that most old and current browsers support today). 
<br><br>
### Step 2. Create components
We need to create two react components: The parent component which we would call `ProductList` that houses a collection of children components called `Procuct`.

Inside the app.js file, do the following. Create the parent component by doing this:

```html
class ProductList extends React.Component {
    render() {
        const products = Seed.products.map((product) => (
            <Product 
            id={product.id}
            title={product.title}
            description={product.description}
            url={product.url}
            votes={product.votes}
            submitterAvatarUrl={product.submitterAvatarUrl}
            productImageUrl={product.productImageUrl}
            />
        ));
        return (
            <div className="container">
                <h1>Popular products</h1>
                <hr />
                {products}
            </div>
        );
    }
}
ReactDOM.render(<ProductList />, document.getElementById('content'));
```

In the parent component, we intend to create a child component based on each object accessible from `Seed.products` and we set up some props. Now lets actaully declare the child component still in the same file called `Product`

```html
class Product extends React.Component {
    render() {
        return (
          <div className='container'>
            <div className="row">
            <div className='col-md-12'>
                <div className="main">
                <div className="image">  
                    <img src={this.props.productImageUrl} />
                </div> 
                <div className='header'>
                    <a>
                        <i className='fa fa-2x fa-caret-up' />
                    </a>
                    {this.props.votes}
                </div>
                <div className='description'>
                    <a href={this.props.url}>
                        {this.props.title}
                    </a>
                    <p>{this.props.description}
                    </p>
                </div>
              <div className='extra'>
                <span>Submitted by:</span>
                <img
                  className='avatar'
                  src={this.props.submitterAvatarUrl}
                />
              </div>
              </div>
            </div>
            </div>
          </div>
        );
      }
}
```

We are able to reference `React.Component` and `ReactDOM.render` because we have loaded the <i>react.js</i> and <i>react-dom.js</i> files before <i>app.js</i> file where we are now, so they are available for use. Haven created the component, `ReactDOM.render(whatComponent, where)` renders it to the DOM.

Runing your live server, you should have the following screen:



### Step 2. Add Interactivity
so far, we have been able to code the components of our app but they are still static. How can we make them interactive?

In coding React apps, there is kind of a general step or process to follow which is

* Divide the app UI into components
* Build a static version of the app
* Determine what data is a state
* Determine in what components each piece of state should live.
* Hard code initial states.
* Add inverse data flow from child to parent via props.
* Add server communication.

We wont be doing all of the above but lets get going with *state*. The only piece of data in our app that can be considered stateful or ever changing is the number of votes. Remember that is a property in the collection of products in our *seed.js* file. Votes are in each `product` object so it represents our state.

Knowing our state, where do we initalize it?. States in react are self-contained in certain components, unlike props that are passed down. The number votes as a state is owned by `<Product />` but since the collection of products we have are generated from `<ProductList />`, we initialize the state there. In `<ProductList />`, do this before the `render()` method:
```
constructor() {
        super();
        this.state = {
            products: []
        }
    }
```
When initialzing state in a component, we try to define what it should look like but keep it empty. Our products is an array, so we use an empty array. We initilise it inside `constructor() {}` because thats the piece of code that runs when our component is created.

Lets make our component read `products` from its own state instead of from a file. Add:
`
componentDidMount() {
	this.setState({ products: Seed.products })
}
`
to set the state to use. Also update `const products = Seed.products` to `const products = this.state.products`. To make JavaScript sort it according to the highest number of votes, write this instead:

```
const products = this.state.products.sort((a, b) {
	b..votes - a.votes
});
```

The JavaScript `sort();` uses a *compare function* inside. You could find out about this in a documentation.


### Step 3. Handle Upvoting
Lets head over to the hyperlink surronding the font-awesome caret-up icon and create a function using onClick.
```
<a onClick={passTheId}>
    <i className='fa fa-2x fa-caret-up' />
 </a>
```
After we've defined the function, lets actually create it. Inside the Prodcuct component, create `passTheId();` function:
```
constructor() {
        super();
        this.passTheId = this.passTheId.bind(this);
    }

    passTheId() {
        console.log('Id will be passed');
    }
```
We binded the function to the `this` keyword because only in-built functions like render() have access to use that word.

Lets create another function in the ProductList component that will update the state working with the `handleUpVote` function of the Product component.
```
handleProductUpVote = (productId) => {
    const nextProducts = this.state.products.map((product) => {
      if (product.id === productId) {
        return Object.assign({}, product, {
          votes: product.votes + 1,
        });
      } else {
        return product;
      }
    });
    this.setState({
      products: nextProducts,
    });
  }
```
States in React should be treated as Immutable. That is, should not be modified directly. The above function will do that using JavaScript's `Object.assign();`

We want to pass the id of the product from the child `Product` component to the parent `ProductList` component so lets make `handleProductUpVote` available to the child as props.
```
const productComponents = products.map((product) => (
      <Product
        key={'product-' + product.id}
        id={product.id}
        title={product.title}
        description={product.description}
        url={product.url}
        votes={product.votes}
        submitterAvatarUrl={product.submitterAvatarUrl}
        productImageUrl={product.productImageUrl}
        onVote={this.handleProductUpVote}
      />
    ));
```
We added `onVote={this.handleProductUpVote}`. So at the child level we can access it through `this.props`
```
passTheId() {
        console.log('Id will be passed');
		this.props.onVote(this.props.id)
    }
```

Your entire `app.js` file should look like:

```

class ProductList extends React.Component {
    state = {
        products: [],
      };
    
      componentDidMount() {
        this.setState({ products: Seed.products });
      }

      handleProductUpVote = (productId) => {
        const nextProducts = this.state.products.map((product) => {
          if (product.id === productId) {
            return Object.assign({}, product, {
              votes: product.votes + 1,
            });
          } else {
            return product;
          }
        });
        this.setState({
          products: nextProducts,
        });
      }


    render() {

        const products = this.state.products.sort((a, b) => (
            b.votes - a.votes
        ));

        const productComponents = products.map((product) => (
            <Product
              key={'product-' + product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              url={product.url}
              votes={product.votes}
              submitterAvatarUrl={product.submitterAvatarUrl}
              productImageUrl={product.productImageUrl}
              onVote={this.handleProductUpVote}
            />
          ));

        return (
            <div className="container">
                <h1>Popular products</h1>
                <hr />
                {productComponents}
            </div>
        );
    }
}

class Product extends React.Component {

    constructor() {
        super();
        this.passTheId = this.passTheId.bind(this);
    }

    passTheId() {
        console.log('Id will be passed');
        this.props.onVote(this.props.id);
    }


    render() {
        return (
          <div className='container'>
            <div className="row">
            <div className='col-md-12'>


                <div className="main">
                <div className="image">  
                    <img src={this.props.productImageUrl} />
                </div> 

                <div className='header'>
                    <a onClick={this.passTheId}>
                        <i className='fa fa-2x fa-caret-up' />
                    </a>
                    {this.props.votes}
                </div>
                <div className='description'>
                    <a href={this.props.url}>
                        {this.props.title}
                    </a>
                    <p>
                        {this.props.description}
                    </p>
                </div>
              <div className='extra'>
                <span>Submitted by:</span>
                <img
                  className='avatar'
                  src={this.props.submitterAvatarUrl}
                />
              </div>
              </div>


            </div>
            </div>
          </div>
        );
      }
}


ReactDOM.render(<ProductList />, document.getElementById('content'));
```

Refresh your browser and you should see the following:


Feel free to share, comment or ask questions. For the full code, visit this github link and clone to your computer.

