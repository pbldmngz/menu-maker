

const CategoryItems = (props) => {
    const {items} = props;

    return (
        <div className="category-container category-padding-full">

            <h4>{items.title}</h4>
            <center>
                <div className="divider-solid-yellow" />
            </center>
            
            {items && items.data.map((obj, index) => {
                return (
                    <div className="item-container item-margin-bottom" key={index}>
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