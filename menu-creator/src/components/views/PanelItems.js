import React, { Component } from 'react'
import { connect } from 'react-redux'
import Swal from "sweetalert2";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import {
    getByUser,
    getMenuConfig,
    createItem,
    editItem,
    deleteItem,
    createCategory,
    editCategory,
    deleteCategory,
} from '../../store/actions/menuActions'


class PanelItems extends Component {

    fetchData = () => {
        const { auth, getByUser, getMenuConfig } = this.props;

        if (auth.uid) {

            getMenuConfig(auth.uid).then((res) => {
                console.log("state/config", res)
                this.setState({
                    config: res,
                })
            })
            
            getByUser("categories", auth.uid).then((res) => {
                this.setState({
                    categories: res
                })
            })

            getByUser("items", auth.uid).then((res) => {
                this.setState({
                    items: res
                })
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    popup = (title, obj = undefined) => {

        var fullHTML = '';

        if (title !== "items") {
            fullHTML = `<input type="text" id="cat_name" class="popup-input" placeholder="Name" value="${obj ? obj.name : ""}" />`;
        } else {
            fullHTML += `<input type="text" id="p_name" class="popup-input" placeholder="Name" value="${obj ? obj.name : ""}" />`;
            fullHTML += `<input type="text" id="p_price" class="popup-input" placeholder="Price" value="${obj ? obj.price : ""}" />`;

            var options = (
                '<option class="popup-input" value="" disabled selected hidden>Select category</option>'
            )

            for (let cat of this.state.categories) {
                if (obj && obj.category_id === cat.id) {
                    options += "<option selected value=\"" + cat.id + "\">" + cat.name + "</option>"
                } else {
                    options += "<option value=\"" + cat.id + "\">" + cat.name + "</option>"
                }
            }

            fullHTML += `<select class="popup-input" id="p_category">` + options + '</select>';

            fullHTML += `<input type="text" id="p_description" class="popup-input" placeholder="Description" value="${obj ? obj.description : ""}" />`;
        }

        Swal.fire({
            title: `${obj ? "Edit" : "Add"} ${title}`,

            html: fullHTML,
            
            confirmButtonText: obj ? "Save" : "Add",
            focusConfirm: false,
            preConfirm: () => {
                if (title === "items") {
                    const p_name = Swal.getPopup().querySelector('#p_name').value
                    const p_price = Swal.getPopup().querySelector('#p_price').value
                    const p_category = Swal.getPopup().querySelector('#p_category').value
                    const p_description = Swal.getPopup().querySelector('#p_description').value

                    return {
                        name: p_name,
                        price: p_price,
                        category_id: p_category,
                        description: p_description,
                    }
                } else {
                    // title === "category"
                    const cat_name = Swal.getPopup().querySelector('#cat_name').value

                    return {name: cat_name}
                }
                
            }
        }).then((result) => {
            console.log("This is the result", result)
            if (result.value) {
                if (obj) {
                    if (title !== "items") {
                        this.props.editCategory(obj.id, result.value)
                    } else {
                        this.props.editItem(obj.id, result.value)
                    }
                } else {
                    if (title !== "items") {
                        this.props.createCategory(result.value)
                    } else {
                        this.props.createItem(result.value)
                    }
                }

                this.fetchData();

                console.log("Should be before")

                Swal.fire(`"${result.value.name}" ${obj ? "edited" : "added"}!`.trim())
            }
        }).catch((error) => {
            console.log("Error in swal2", error)
        })
    }

    getCategory = (id) => {
        const res = this.state.categories.find(cat => cat.id === id);
        return res ? res.name : "";
    }

    changeVisibility = (title, obj) => {
        var sendObj = {...obj};
        delete sendObj.id;

        if (title === "items") {
            this.props.editItem(
                obj.id,
                {
                    ...sendObj,
                    visible: !obj.visible,
                }
            )
        } else {
            this.props.editCategory(
                obj.id,
                {
                    ...sendObj,
                    visible: !obj.visible,
                }
            )
        }

        this.fetchData()
    }

    delete = (title, id) => {
        if (title === "items") {
            this.props.deleteItem(id)
        } else {
            this.props.deleteCategory(id)
        }

        this.fetchData()
    }

    getCards = (title, data) => {
        return (
            <div className="grid">
                <div className="category-container button button-height" onClick={() => {
                    this.popup(title)
                }}>
                    <div className="category-center">
                        {
                            (title === "items") ?
                                (<div className="material-icons big-icon">post_add</div>) :
                                (<div className="material-icons big-icon">library_add</div>)
                        }
                    </div>
                </div>
                {data && data.map((obj) => {
                    return (
                        <div key={obj.id} className="category-container category-padding">
                            <div className="item-container">
                                {title === "items" ? (
                                    <div className="item-name">
                                        <div className="item-container item-container-height">
                                            <div className="item-name">{obj.name}</div>
                                            <div className="item-price item-margin-right">{"$" + obj.price}</div>
                                            <div className="item-category">{this.getCategory(obj.category_id)}</div>
                                            <div className="item-description">{obj.description}</div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="item-name item-container-height">
                                        <div className="category-center">
                                            {obj.name}
                                        </div>
                                    </div>
                                )}

                                <div className="item-price">
                                    <div className="category-center">
                                        <div className="vertical-grid">
                                            <span className="material-icons button" onClick={() => {
                                                this.changeVisibility(title, obj)
                                            }}>
                                                {obj.visible ? "visibility" : "visibility_off"}
                                            </span>
                                            <span className="material-icons button" onClick={() => {
                                                this.popup(title, obj)
                                            }}>
                                                edit
                                            </span>
                                            <span className="material-icons button" onClick={() => {
                                                Swal.fire({
                                                    title: 'Are you sure?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete it!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        this.delete(title, obj.id)
                                                        Swal.fire(
                                                            'Deleted!',
                                                            'Your item has been deleted.',
                                                            'success'
                                                        )
                                                    }
                                                })
                                            }}>
                                                delete
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    render() {

        const { auth } = this.props;
        // Config
        if (!auth.uid) return <Redirect to="/auth/login" />

        if (!this.state) return null
        const { colorPalette } = this.state.config;
        // Config

        const { items, categories } = this.state
        const { title } = this.props.match.params

        if (!["items", "categories"].includes(title)) return null

        const styles = {
            title: {
                backgroundColor: colorPalette.highlight,
                color: colorPalette.text,
            },
            header: {
                backgroundColor: colorPalette.highlight,
                borderColor: colorPalette.highlight,
                color: colorPalette.text,
            },
            button: {
                borderColor: colorPalette.highlight,
                backgroundColor: colorPalette.container,
                color: colorPalette.text,
            },
            fill: {
                backgroundColor: colorPalette.background,
            },
            category: {
                backgroundColor: colorPalette.container,
            },
            background: {
                backgroundColor: colorPalette.background,
                overflow: "scroll",
            },
        }

        return (
            <div className="overall animation" style={styles.background}>
                <div className="panel-nav" style={styles.title}>
                    <h2>CONTROL PANEL / {title.toUpperCase()}</h2>
                </div>

                <div className="as-footer">
                    <Link 
                        to={"/cpanel"}
                        className="panel-section-border button"
                        style={styles.button}
                    >
                        Go back to Control Panel
                    </Link>
                </div>
                
                {this.getCards(title, (title === "items" ? items : categories))}
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        getByUser: (collection, uid) => dispatch(getByUser(collection, uid)),
        createItem: (item) => dispatch(createItem(item)),
        editItem: (id, item) => dispatch(editItem(id, item)),
        deleteItem: (id) => dispatch(deleteItem(id)),
        createCategory: (category) => dispatch(createCategory(category)),
        editCategory: (id, obj) => dispatch(editCategory(id, obj)),
        deleteCategory: (id) => dispatch(deleteCategory(id)),
        getMenuConfig: (id) => dispatch(getMenuConfig(id)),
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(PanelItems)
