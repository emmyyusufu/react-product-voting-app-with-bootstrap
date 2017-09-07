
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