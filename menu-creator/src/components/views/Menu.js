import React, { Component } from 'react'
import { connect } from 'react-redux'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import Navbar from './Navbar';
import CategoryItems from '../display/CategoryItems'
import { getByUser, getIdByName } from '../../store/actions/menuActions'
import Footer from './Footer';


class Menu extends Component {

    state = {}

    fetchData = () => {
        const { match, getByUser, getIdByName } = this.props;

        if (match.params.userID) {
            getIdByName(match.params.userID).then((arr) => {
                if (arr.length > 0) {

                    getByUser("categories", arr[0].id).then((res) => {
                        this.setState({
                            categories: res
                        })
                    })

                    getByUser("items", arr[0].id).then((res) => {
                        this.setState({
                            items: res
                        })
                    })

                    this.setState({
                        config: arr[0],
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
        if (JSON.stringify(Object.keys(this.state)) === JSON.stringify(["config", "categories", "items"])){
            const testItems = this.separateCategories(this.state.items);
            const { colorPalette } = this.state.config;
        // Config

            const styles = {
                title: {
                    backgroundColor: colorPalette.highlight,
                    color: colorPalette.background,
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
                separator: {
                    color: colorPalette.header,
                    borderColor: colorPalette.header,
                }
            }
            return (
                <div className="overall animation" style={styles.background}>
                    <div className="big-guy-padding">
                        <Navbar data={this.state.config} navbar={styles.title} />
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        >
                            <Masonry>
                                {testItems && testItems.map((items, index) => {
                                    return <CategoryItems
                                        key={index}
                                        items={items}
                                        category={styles.category}
                                        separator={styles.separator}
                                    />
                                })}
                            </Masonry>
                        </ResponsiveMasonry>
                        <Footer />
                    </div>
                </div>
            )

        } else {
            return null
        }
        
        


        
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