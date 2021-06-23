import React, { Component } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

import CategoryItems from '../display/CategoryItems'

import { data } from '../../dummyData/dummy_data'


export default class Menu extends Component {

    separateCategories(data) {
        var allCats = {}
        var formated = []

        for (let a of data) {
            if (a.category in allCats) {
                allCats[a.category].push(a)
            } else {
                allCats[a.category] = []
                allCats[a.category].push(a)
            }
        }

        for (let b of Object.keys(allCats)) {
            formated.push({
                title: b.toUpperCase(),
                data: allCats[b],
            })
        }

        return formated
    }

    render() {
        const testItems = this.separateCategories(data)

        return (
            <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
            >
                <Masonry>
                    {testItems && testItems.map((items) => {
                        return <CategoryItems items={items} />
                    })}
                </Masonry>
            </ResponsiveMasonry>
        )
    }
}
