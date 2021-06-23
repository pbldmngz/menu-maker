

const CategoryItems = (props) => {
    const {items} = props;

    return (
        <div className="category-container">

            <h4>{items.title}</h4>
            <center>
                <div class="divider-solid-yellow" />
            </center>
            
            {items && items.data.map((obj) => {
                return (
                    <div className="item-container">
                        <div className="item-name">{obj.name}</div>
                        <div className="item-price">{"$" + obj.price}</div>
                        <div className="item-description">{obj.description}</div>
                    </div>
                )
            })}
        </div>
    )
}

export default CategoryItems;