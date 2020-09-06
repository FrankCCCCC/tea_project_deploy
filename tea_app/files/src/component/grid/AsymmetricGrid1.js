import React from 'react';
import {assertArray, assertInteger, assertString} from '../util/Util'

/**
 * @param {Object[]} items - Array of elements in asymmetric grid
 * @param {Integer} column_count - The number of columns
 * @param {String} column_width - The width of the column
 * @param {String} column_gap - The width of gap between columns
 */

function AsymmetricGrid(props) {
    assertArray(props.items)
    assertInteger(props.column_count)
    assertString(props.column_width)
    assertString(props.column_gap)

    return (
        <div style={{width: "100%", height: "100%"}}>
            <div style={{columnCount: props.column_count, columnWidth: props.column_width, columnGap: props.column_gap}}>
                {props.items}
            </div>
        </div>
    )
}

AsymmetricGrid.defaultProps = {
    column_count: 3, 
    column_width: "10rem", 
    column_gap: "2rem"
}

export default AsymmetricGrid;