import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Group, Item } from '../components'

export const ComponentType = ({ item, index }) => {

    const [component, setComponent] = useState(<></>)
    
    useEffect(() => {
        switch (item.itemType) {
            case 1:
                if (item.idItemGroup === "")
                    setComponent(<Item item={item} index={index}/>)
                else
                    setComponent(<></>)
                break;
            case 2:
                setComponent(<Group itemGroup={item} index={index}/>)
                break;

            default:
                break;
        }
    }, [item.idItemGroup, index])

    return (component)
}

ComponentType.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.any.isRequired,
        name: PropTypes.string.isRequired,
        itemType: PropTypes.number.isRequired,
        index: PropTypes.number.isRequired,
        idItemGroup: PropTypes.any.isRequired,
    }),
    index: PropTypes.number.isRequired,
}