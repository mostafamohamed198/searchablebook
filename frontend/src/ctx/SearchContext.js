import React, { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import esHost from "../constants/esHost";

const SearchContext = createContext()

export default SearchContext;


export const SearchProvider = ({children}) => {
    const [tags, setTags] = useState([])
    const [suggestions, setSuggestions] = useState([])
    const [searchBoxValue, setSearchBoxValue] = React.useState('')
    const [query, setQuery] = React.useState('')

    const navigate = useNavigate();
      function splitStringWithOperators(inputString) {
        var operatorRegex = /\b(OR|NOT|AND)\b/gi
        var result = inputString.split(operatorRegex)
        result = result.map(function (item) {
          setTags(prevTags => [...prevTags, {"name": item}]);
        });
      }
  
    const onDelete = useCallback((tagIndex) => {
      setTags(tags.filter((_, i) => i !== tagIndex))
    }, [tags])

    const onAddition = useCallback((newTag) => {
      
      if (tags[tags.length - 1] != null){
        if(newTag.name != 'AND' && newTag.name != 'OR' && newTag.name != 'NOT'){
          if (newTag.name.includes('AND') || newTag.name.includes('OR') || newTag.name.includes('NOT')){
            splitStringWithOperators(newTag.name)
          }
          else {
            if(tags[tags.length - 1].name != 'AND' && tags[tags.length - 1].name != 'OR' && tags[tags.length - 1].name != 'NOT'){
              setTags([...tags, {id: null , name: 'AND'}, newTag])
            }
            else{
              setTags([...tags, newTag])
            }
          }
            
        }
        else{
          setTags([...tags, newTag])
        }
      }
      else{
        setTags([...tags, newTag])
      }
      navigate(`/results/working`);
    
    }, [tags])

    React.useEffect(function(){
      setSearchBoxValue('')
      tags.map((tag, index) => {
        if (tag.name == 'AND' || tag.name == 'OR' || tag.name == 'NOT'){
          setSearchBoxValue(value => (`${value} ${tag.name}`))
        }
        else{
          setSearchBoxValue(value => (`${value} "${tag.name}"`))
          
        }
      })

    }, [tags])
      

    function onInput (query) {
      setQuery(query)
      axios.post(`${esHost}/entries/_search`, {
        
      query: {
        multi_match: {
            query: query,
            type: "bool_prefix",
            fields: [
                "title",
                "title._2gram",
                "title._3gram"
            ],
            // sort: ['_score', { createdDate: 'desc' }]
        }
      },
          })
          .then(res => {
            setSuggestions([])
            res.data.hits.hits.map(hit => {
              let newHit = {id: hit._source.id, name: hit._source.title }
              setSuggestions(oldArray => [...oldArray, newHit])
            })
        
          })
    
    }

    function searchFormSubmit(event){
      event.preventDefault()
      
      if(query == ''){
        navigate(`/results/working`);
      }
      else{
        onAddition({"name": query})
        setQuery('')
      }
  
    }

    function resetSearch(){
      setQuery('')
      setTags([])
      setSearchBoxValue('')
    }



    let contextData = {
        tags: tags,
        onAddition: onAddition, 
        onDelete: onDelete,
        onInput: onInput,
        suggestions: suggestions,
        searchFormSubmit: searchFormSubmit,
        searchBoxValue: searchBoxValue,
        resetSearch: resetSearch

    }
    return(
        <SearchContext.Provider value={contextData} >
            {children}
        </SearchContext.Provider>
    )
}