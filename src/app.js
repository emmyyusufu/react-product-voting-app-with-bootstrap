
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