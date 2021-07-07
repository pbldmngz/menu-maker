import React, { Component } from 'react'
import { connect } from 'react-redux'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import Navbar from './Navbar';
import CategoryItems from '../display/CategoryItems'
import { getByUser, getIdByName } from '../../store/actions/menuActions'
import Footer from './Footer';


class Menu extends Component {

    state = {
        items: [],
        categories: [],
    }

    fetchData = () => {
        const { match, getByUser, getIdByName } = this.props;

        if (match.params.userID) {
            getIdByName(match.params.userID).then((arr) => {
                if (arr.length > 0) {
                    getByUser("items", arr[0].id).then((res) => {
                        this.setState({
                            items: res
                        })
                    })

                    getByUser("categories", arr[0].id).then((res) => {
                        this.setState({
                            categories: res
                        })
                    })

                    this.setState({
                        menuData: arr[0],
                    })
                } else {
                    this.props.history.push("/404")
                }
            });
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    getCategory = (id) => {
        const res = this.state.categories.find(cat => cat.id === id);
        return res
    }

    separateCategories(data) {
        var allCats = {}
        var formated = []

        for (let a of data) {
            if (a.category_id in allCats) {
                if (a.visible) {
                    allCats[a.category_id].push(a)
                }
            } else {
                if (a.visible) {
                    allCats[a.category_id] = []
                    allCats[a.category_id].push(a)
                }
            }
        }

        for (let b of Object.keys(allCats)) {
            const category = this.getCategory(b)

            if (category) {
                if (category.visible) {
                    formated.push({
                        title: category.name.toUpperCase(),
                        data: allCats[b],
                    })
                }
            }
        }

        return formated
    }

    render() {
        const testItems = this.separateCategories(this.state.items)

        return (
            <div className="animation">
                <Navbar data={this.state.menuData}/>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                >
                    <Masonry>
                        {testItems && testItems.map((items, index) => {
                            return <CategoryItems key={index} items={items} />
                        })}
                    </Masonry>
                </ResponsiveMasonry>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        profile: state.firebase,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getIdByName: (name) => dispatch(getIdByName(name)),
        getByUser: (collection, uid) => dispatch(getByUser(collection, uid)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu)