import { useContext } from 'react'
import './FilterChip.css'
import { UserContext } from '../../App'


const FilterChip = (props) => {

    const { setFilterSelected, setUpdateAvailable } = useContext(UserContext);
    const { name, isSelected } = props;

    const handleClick = () => {
        setFilterSelected(name);
        setUpdateAvailable(true);
    }

    return (
        <div className={`${'main'} ${isSelected && 'selected'}`} onClick={handleClick}>
            {name}
        </div>
    )
}
export default FilterChip
