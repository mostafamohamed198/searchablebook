import React from "react";
import SearchContext from "../ctx/SearchContext";
export default function CustomTag({ classNames, tag, ...tagProps }) {
    const operators = ['AND', 'OR', 'NOT']
    let {changeOperator, onDelete} = React.useContext(SearchContext)
    function menuItems(){
        if (tag.name == 'AND' || tag.name == 'OR' || tag.name == 'NOT'){
            return(
            <div class="dropdown-menu--custom ">
                {operators.map(operator => {
                    return(
                        <div onClick={() => changeOperator(tag.id, operator)} className="dropdown-menu-item--custom" href="#">
                            {operator}
                        </div>
                    )
                })}
            </div>
            )
        }
    }
    return (
    
        <div class="dropdown--custom dropdown">
            <button onClick={() => onDelete(tag.id)} type="button" className={classNames.selectedTag} {...tagProps}>
                <span className={classNames.selectedTagName}>{tag.name}</span>
            </button>
            {menuItems()}
            
        </div>
    );
  }
